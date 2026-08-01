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
        btn.classList.add('active');
        btn.innerHTML = '🔴';
        if (!recognition) initVoice();
        startListening();
    } else {
        btn.classList.remove('active');
        btn.innerHTML = '🎤';
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

function login() {
    const p = document.getElementById('phone').value;
    if(/^\d{10}$/.test(p)) {
        localStorage.setItem('kbc_login_session', 'active');
        show('scr-lang');
        playSound('alert');
    } else {
        alert("PLEASE ENTER A VALID 10 DIGIT MOBILE NUMBER");
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
    if (bg) {
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
        document.getElementById('slab-score').innerText = score;
        document.getElementById('slab-msg').innerText = curLang === 'bn' 
            ? `আপনি সফলভাবে ${curIdx}টি প্রশ্ন সম্পন্ন করেছেন!` 
            : `You have successfully completed ${curIdx} questions!`;
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

    document.getElementById('st-count').innerText = `Q: ${curIdx + 1}/${activeQuestions.length}`;
    document.getElementById('st-score').innerText = `SCORE: ${score}`;

    const txt = (curLang === 'bn') ? q.qb : q.qe;
    const opts = (curLang === 'bn') ? q.ab : q.ae;

    document.getElementById('q-text').innerText = txt;
    const container = document.getElementById('opt-container');
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

    document.getElementById('timer').innerText = timerVal;
    document.getElementById('timer').classList.remove('critical');

    timerInt = setInterval(() => {
        timerVal--;
        document.getElementById('timer').innerText = timerVal;

        if (timerVal <= 5) {
            document.getElementById('timer').classList.add('critical');
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
    const box = document.getElementById("exp-box");
    if (box) {
        box.style.display = "block";
        box.innerHTML = "<b>" + (curLang == "bn" ? "ব্যাখ্যা" : "Explanation") + ":</b><br>" + explanation;
    }

    setTimeout(() => {
        if (box) box.style.display = "none";
        curIdx++;
        loadQ();
    }, 3500);
}

function playSound(type) {
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
    if (!window.speechSynthesis || !t) return;
    window.speechSynthesis.cancel();
    const m = new SpeechSynthesisUtterance(t);
    m.lang = (curLang === 'bn') ? 'bn-IN' : 'en-IN';
    m.pitch = 1.0;
    m.rate = 0.9;
    window.speechSynthesis.speak(m);
}

function end() {
    show('scr-res');
    document.getElementById('res-score').innerText = score;
    document.getElementById('res-cor').innerText = cor;
    document.getElementById('res-wr').innerText = wr;
    
    const bg = document.getElementById('bg-music');
    if(bg) bg.pause();
    
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (recognition) recognition.stop();
}

function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
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
