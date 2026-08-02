// ==========================================
// KBC PREMIUM 2026 - COMPLETE APP LOGIC
// ==========================================

let curLang = 'bn';
let curSubject = 'all';
let curLevel = 'junior';
let curIdx = 0;
let score = 0, cor = 0, wr = 0;
let timerVal = 30;
let timerInt;
let activeQuestions = [];
let canAnswer = false;
let voiceEnabled = false;
let isMuted = false;
let recognition;
let currentSlabCount = 0;
let fullQuestionPool = [];

// Automatic Syntax Recovery & Robust JSON Parser
function autoFixAndParseObj(rawText) {
    let cleanText = rawText.trim();
    if (cleanText.endsWith(',')) {
        cleanText = cleanText.slice(0, -1);
    }
    
    try {
        return JSON.parse(cleanText);
    } catch (e) {
        try {
            // Fix missing quotes around keys or trailing syntax issues
            cleanText = cleanText.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
            return JSON.parse(cleanText);
        } catch (innerErr) {
            return null;
        }
    }
}

// External JSON Question Bank Loader (With Chunking & Error Bypass)
async function loadQuestionBank() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error("Question bank not found");
        
        const textData = await response.text();
        let cleanData = textData.trim();

        // 1. Try standard JSON parse
        try {
            fullQuestionPool = JSON.parse(cleanData);
            console.log("Successfully loaded " + fullQuestionPool.length + " questions instantly.");
            return;
        } catch (e) {
            console.warn("Direct JSON parsing failed at broken position. Activating Safe Chunking Processor...");
        }

        // 2. Fail-safe Chunking & Robust Regex Splitter
        fullQuestionPool = [];
        let items = [];

        if (cleanData.startsWith('[')) cleanData = cleanData.substring(1);
        if (cleanData.endsWith(']')) cleanData = cleanData.substring(0, cleanData.length - 1);

        // Split data safely by JSON object boundaries
        const rawObjects = cleanData.split(/\},\s*\{/);
        const BATCH_SIZE = 300;
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < rawObjects.length; i++) {
            let str = rawObjects[i].trim();
            if (!str.startsWith('{')) str = '{' + str;
            if (!str.endsWith('}')) str = str + '}';

            const parsedObj = autoFixAndParseObj(str);
            if (parsedObj) {
                items.push(parsedObj);
                successCount++;
            } else {
                errorCount++;
            }

            if (items.length >= BATCH_SIZE) {
                fullQuestionPool.push(...items);
                items = [];
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }

        if (items.length > 0) {
            fullQuestionPool.push(...items);
        }

        console.log(`Loaded ${fullQuestionPool.length} valid questions successfully. Skipped/Fixed corrupted entries: ${errorCount}`);

    } catch (error) {
        console.error("Error loading JSON, falling back to default pool:", error);
    }
}

// Initialize Speech Recognition
function initVoice() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = curLang === 'bn' ? 'bn-IN' : 'en-IN';
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            processVoiceCommand(transcript);
        };
        
        recognition.onerror = (event) => {
            console.log('Voice error:', event.error);
        };
    }
}

function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    const btn = document.getElementById('voice-btn');
    if (voiceEnabled) {
        if (btn) {
            btn.classList.add('active');
            btn.innerHTML = '🔴';
        }
        if (!recognition) initVoice();
        startListening();
    } else {
        if (btn) {
            btn.classList.remove('active');
            btn.innerHTML = '🎤';
        }
        if (recognition) recognition.stop();
    }
}

function startListening() {
    if (voiceEnabled && recognition && canAnswer) {
        try {
            recognition.start();
        } catch(e) {
            console.log('Recognition already running');
        }
    }
}

function processVoiceCommand(cmd) {
    if (!canAnswer) return;
    
    const mappings = {
        'a': 0, 'এ': 0, 'one': 0, 'প্রথম': 0, 'option a': 0,
        'b': 1, 'বি': 1, 'two': 1, 'দ্বিতীয়': 1, 'option b': 1,
        'c': 2, 'সি': 2, 'three': 2, 'তৃতীয়': 2, 'option c': 2,
        'd': 3, 'ডি': 3, 'four': 3, 'চতুর্থ': 3, 'option d': 3
    };
    
    for (let key in mappings) {
        if (cmd.includes(key)) {
            check(mappings[key]);
            break;
        }
    }
}

// Global Audio & Navigation Controls
function toggleMute() {
    isMuted = !isMuted;
    const muteBtn = document.getElementById('mute-btn');
    const bg = document.getElementById('bg-music');
    
    if (isMuted) {
        if (bg) bg.pause();
        if (muteBtn) muteBtn.innerText = '🔇';
        if (window.speechSynthesis) window.speechSynthesis.cancel();
    } else {
        if (bg && document.getElementById('scr-game').classList.contains('active')) {
            bg.play().catch(e => console.log("Audio play blocked"));
        }
        if (muteBtn) muteBtn.innerText = '🔊';
    }
}

function exitGame() {
    if (confirm(curLang === 'bn' ? "আপনি কি খেলা ছেড়ে বাইরে যেতে চান?" : "Are you sure you want to exit the game?")) {
        clearInterval(timerInt);
        const bg = document.getElementById('bg-music');
        if (bg) bg.pause();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        if (recognition) recognition.stop();
        show('scr-lang');
    }
}

function toggleAdminModal(showModal) {
    const modal = document.getElementById('admin-modal');
    if (modal) {
        modal.style.display = showModal ? 'flex' : 'none';
    }
}

function verifyAdminPasscode() {
    const input = document.getElementById('admin-passcode-input');
    if (input && input.value === '1234') {
        alert(curLang === 'bn' ? "অ্যাডমিন অ্যাক্সেস সফল হয়েছে!" : "Admin Access Granted!");
        toggleAdminModal(false);
        input.value = '';
    } else {
        alert(curLang === 'bn' ? "ভুল পাসকোড!" : "Invalid Passcode!");
    }
}

// Authentication Handlers
function switchAuthTab(type) {
    const loginTab = document.getElementById('tab-login');
    const regTab = document.getElementById('tab-register');
    const loginForm = document.getElementById('form-login');
    const regForm = document.getElementById('form-register');

    if (type === 'login') {
        if (loginTab) loginTab.classList.add('active');
        if (regTab) regTab.classList.remove('active');
        if (loginForm) loginForm.style.display = 'flex';
        if (regForm) regForm.style.display = 'none';
    } else {
        if (regTab) regTab.classList.add('active');
        if (loginTab) loginTab.classList.remove('active');
        if (regForm) regForm.style.display = 'flex';
        if (loginForm) loginForm.style.display = 'none';
    }
}

function login() {
    const p = document.getElementById('phone') ? document.getElementById('phone').value : '';
    if (/^\d{10}$/.test(p)) {
        localStorage.setItem('kbc_login_session', 'active');
        show('scr-lang');
        playSound('alert');
    } else {
        alert("PLEASE ENTER A VALID 10 DIGIT MOBILE NUMBER");
    }
}

function registerUser() {
    const name = document.getElementById('reg-name') ? document.getElementById('reg-name').value : '';
    const phone = document.getElementById('reg-phone') ? document.getElementById('reg-phone').value : '';
    
    if (name.trim() === '') {
        alert("PLEASE ENTER YOUR NAME");
        return;
    }
    if (!/^\d{10}$/.test(phone)) {
        alert("PLEASE ENTER A VALID 10 DIGIT MOBILE NUMBER");
        return;
    }

    localStorage.setItem('kbc_login_session', 'active');
    localStorage.setItem('kbc_user_name', name);
    show('scr-lang');
    playSound('alert');
}

function applyPromoCode() {
    const codeInput = document.getElementById('promo-code-input');
    if (!codeInput) return;
    const code = codeInput.value.trim().toUpperCase();

    if (code === 'KBC2026' || code === 'FREE') {
        alert(curLang === 'bn' ? "প্রোমো কোড সফলভাবে প্রয়োগ করা হয়েছে!" : "Promo code applied successfully!");
    } else {
        alert(curLang === 'bn' ? "অবৈধ প্রোমো কোড!" : "Invalid Promo Code!");
    }
}

function selectLanguage(l) {
    curLang = l;
    show('scr-subject');
}

function selectSubject(subj) {
    curSubject = subj;
    show('scr-level');
}

function startGameWithLevel(lvl) {
    curLevel = lvl;
    curIdx = 0; 
    score = 0; 
    cor = 0; 
    wr = 0;
    currentSlabCount = 0;

    // Filter questions based on selection
    let filtered = fullQuestionPool.filter(q => {
        let matchSubj = (curSubject === 'all') || (q.subject === curSubject);
        let matchLvl = (q.level === curLevel);
        return matchSubj && matchLvl;
    });

    if (filtered.length === 0) {
        filtered = fullQuestionPool; // Fallback if no questions match strict filter
    }

    const charMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };

    activeQuestions = filtered.map(item => ({
        qb: item.bn ? item.bn.q : '',
        qe: item.en ? item.en.q : '',
        ab: item.bn ? [item.bn.a, item.bn.b, item.bn.c, item.bn.d] : [],
        ae: item.en ? [item.en.a, item.en.b, item.en.c, item.en.d] : [],
        ans: charMap[item.correct],
        expb: item.bn ? item.bn.exp : '',
        expe: item.en ? item.en.exp : ''
    })).sort(() => Math.random() - 0.5);

    show('scr-game');

    const bg = document.getElementById('bg-music');
    if (bg && !isMuted) {
        bg.volume = 0.3;
        bg.play().catch(e => console.log("Audio play blocked until interaction"));
    }

    if (voiceEnabled) initVoice();
    loadQ();
}

function loadQ() {
    clearInterval(timerInt);

    if (curIdx >= activeQuestions.length) {
        return end();
    }

    // Check for 5-Round Slab Intermission
    if (curIdx > 0 && curIdx % 5 === 0 && currentSlabCount !== curIdx) {
        currentSlabCount = curIdx;
        const slabScore = document.getElementById('slab-score');
        const slabMsg = document.getElementById('slab-msg');
        if (slabScore) slabScore.innerText = score;
        if (slabMsg) {
            slabMsg.innerText = curLang === 'bn' 
                ? `আপনি সফলভাবে ${curIdx}টি প্রশ্ন সম্পন্ন করেছেন!` 
                : `You have successfully completed ${curIdx} questions!`;
        }
        show('scr-slab-cleared');
        return;
    }

    canAnswer = true;
    const q = activeQuestions[curIdx];

    const diffBadge = document.getElementById('diff-badge');
    const subjBadge = document.getElementById('subj-badge');

    if (subjBadge) subjBadge.innerText = curSubject.toUpperCase();

    if (curIdx < 10) {
        if(diffBadge) diffBadge.innerText = 'ROUND 1: EASY';
        timerVal = 30;
    } else if (curIdx < 25) {
        if(diffBadge) diffBadge.innerText = 'ROUND 2: INTERMEDIATE';
        timerVal = 20;
    } else {
        if(diffBadge) diffBadge.innerText = 'ROUND 3: EXPERT';
        timerVal = 15;
    }

    const stCount = document.getElementById('st-count');
    const stScore = document.getElementById('st-score');
    if (stCount) stCount.innerText = `Q: ${curIdx + 1}/${activeQuestions.length}`;
    if (stScore) stScore.innerText = `SCORE: ${score}`;

    const txt = (curLang === 'bn') ? q.qb : q.qe;
    const opts = (curLang === 'bn') ? q.ab : q.ae;

    const qText = document.getElementById('q-text');
    if (qText) qText.innerText = txt;

    const container = document.getElementById('opt-container');
    if (container) {
        container.innerHTML = '';
        if (opts && opts.length > 0) {
            opts.forEach((o, i) => {
                const div = document.createElement('div');
                div.className = 'option';
                div.innerHTML = `<strong>${String.fromCharCode(65 + i)}:</strong> ${o}`;
                div.onclick = () => check(i);
                container.appendChild(div);
            });
        }
    }

    const timerElem = document.getElementById('timer');
    if (timerElem) {
        timerElem.innerText = timerVal;
        timerElem.classList.remove('critical');
    }

    timerInt = setInterval(() => {
        timerVal--;
        if (timerElem) timerElem.innerText = timerVal;

        if (timerVal <= 5) {
            if (timerElem) timerElem.classList.add('critical');
            playSound('tick');
        }

        if (timerVal <= 0) {
            clearInterval(timerInt);
            check(-1);
        }
    }, 1000);

    speak(txt);
    if (voiceEnabled) setTimeout(startListening, 1500);
}

function proceedToNextSlab() {
    show('scr-game');
    loadQ();
}

function check(idx) {
    if (!canAnswer) return;
    canAnswer = false;
    clearInterval(timerInt);

    const q = activeQuestions[curIdx];
    const opts = document.querySelectorAll('.option');

    if (idx === q.ans) {
        let points = 10;
        if (curIdx >= 10) points = 20;
        if (curIdx >= 25) points = 50;

        score += points;
        cor++;
        playSound('cor');
        if (idx !== -1 && opts[idx]) opts[idx].classList.add('correct');
    } else {
        wr++;
        playSound('wr');
        if (idx !== -1 && opts[idx]) opts[idx].classList.add('wrong');
        if (opts[q.ans]) opts[q.ans].classList.add('correct');
    }

    const explanation = curLang === "bn" ? (q.expb || "ব্যাখ্যা উপলব্ধ নেই।") : (q.expe || "Explanation not available.");
    const modal = document.getElementById("exp-modal");
    const modalBody = document.getElementById("exp-modal-body");
    const box = document.getElementById("exp-box");

    if (modal && modalBody) {
        modalBody.innerHTML = "<b>" + (curLang === "bn" ? "ব্যাখ্যা" : "Explanation") + ":</b><br>" + explanation;
        modal.style.display = "flex";
    } else if (box) {
        box.style.display = "block";
        box.innerHTML = "<b>" + (curLang === "bn" ? "ব্যাখ্যা" : "Explanation") + ":</b><br>" + explanation;
    }

    setTimeout(() => {
        if (modal) modal.style.display = "none";
        if (box) box.style.display = "none";
        curIdx++;
        loadQ();
    }, 3500);
}

function closeExpModal() {
    const modal = document.getElementById("exp-modal");
    if (modal) modal.style.display = "none";
}

function playSound(type) {
    if (isMuted) return;
    const sounds = {
        'cor': document.getElementById('snd-cor'),
        'wr': document.getElementById('snd-wr'),
        'tick': document.getElementById('snd-tick'),
        'alert': document.getElementById('snd-alert')
    };
    if (sounds[type] && typeof sounds[type].play === 'function') {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(e => {
            console.warn("Audio play prevented or file missing for: " + type);
        });
    }
}

function speak(t) {
    if (isMuted || !window.speechSynthesis || !t) return;
    window.speechSynthesis.cancel();
    const m = new SpeechSynthesisUtterance(t);
    m.lang = (curLang === 'bn') ? 'bn-IN' : 'en-IN';
    m.pitch = 1.0;
    m.rate = 0.9;
    window.speechSynthesis.speak(m);
}

function end() {
    show('scr-res');
    const resScore = document.getElementById('res-score');
    const resCor = document.getElementById('res-cor');
    const resWr = document.getElementById('res-wr');

    if (resScore) resScore.innerText = score;
    if (resCor) resCor.innerText = cor;
    if (resWr) resWr.innerText = wr;
    
    const bg = document.getElementById('bg-music');
    if (bg) bg.pause();
    
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (recognition) recognition.stop();
}

function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
}

// Anti-Cheat: Resets game if user switches tabs
document.addEventListener('visibilitychange', () => {
    if (document.hidden && curIdx > 0 && curIdx < activeQuestions.length) {
        document.body.classList.add('blur');
        alert("GAME ABORTED DUE TO TAB SWITCHING (CHEATING PREVENTION).");
        location.reload();
    }
});

// Auto load JSON and initialize on window load
window.onload = async () => {
    await loadQuestionBank();
    initVoice();
    if (localStorage.getItem('kbc_login_session') === 'active') {
        show('scr-lang');
    }
};
