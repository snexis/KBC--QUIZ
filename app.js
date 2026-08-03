// ==========================================
// KBC PREMIUM 2026 - COMPLETE APP LOGIC (UPDATED & BUG-FIXED)
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
let explanationTimer = null;

// Helper Function: Merge Custom Admin Questions into Main Question Pool
function loadCustomAdminQuestions() {
    try {
        const savedCustom = localStorage.getItem('kbc_custom_questions');
        if (savedCustom) {
            const customList = JSON.parse(savedCustom);
            if (Array.isArray(customList) && customList.length > 0) {
                // Remove existing custom questions to prevent duplicate entries
                fullQuestionPool = fullQuestionPool.filter(q => !q.id || !q.id.toString().startsWith('custom_'));
                
                // Format subject naming inconsistencies (e.g. math/mathematics)
                const formattedCustoms = customList.map(cQ => {
                    let sub = cQ.subject ? cQ.subject.toLowerCase() : '';
                    if (sub === 'mathematics' || sub === 'math') {
                        cQ.subject = 'math';
                    }
                    return cQ;
                });

                // Unshift to place custom questions at the top of the pool
                fullQuestionPool.unshift(...formattedCustoms);
                console.log(`Successfully merged ${formattedCustoms.length} custom admin questions into pool.`);
            }
        }
    } catch (e) {
        console.error("Error loading custom admin questions:", e);
    }
}

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
            cleanText = cleanText.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
            return JSON.parse(cleanText);
        } catch (innerErr) {
            return null;
        }
    }
}

// External JSON Question Bank Loader
async function loadQuestionBank() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error("Question bank not found");
        
        const textData = await response.text();
        let cleanData = textData.trim();

        try {
            fullQuestionPool = JSON.parse(cleanData);
            console.log("Successfully loaded " + fullQuestionPool.length + " questions instantly.");
            loadCustomAdminQuestions();
            return;
        } catch (e) {
            console.warn("Direct JSON parsing failed. Activating Safe Chunking Processor...");
        }

        fullQuestionPool = [];
        let items = [];

        if (cleanData.startsWith('[')) cleanData = cleanData.substring(1);
        if (cleanData.endsWith(']')) cleanData = cleanData.substring(0, cleanData.length - 1);

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

        console.log(`Loaded ${fullQuestionPool.length} valid questions successfully. Skipped corrupted entries: ${errorCount}`);
        loadCustomAdminQuestions();

    } catch (error) {
        console.error("Error loading JSON, falling back to default pool:", error);
        loadCustomAdminQuestions();
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
        if (btn) btn.classList.add('active', 'listening');
        if (!recognition) initVoice();
        startListening();
    } else {
        if (btn) btn.classList.remove('active', 'listening');
        if (recognition) {
            try { recognition.stop(); } catch(e) {}
        }
    }
}

function startListening() {
    if (voiceEnabled && recognition && canAnswer) {
        try {
            recognition.start();
        } catch(e) {
            console.log('Recognition already running or busy');
        }
    }
}

function processVoiceCommand(cmd) {
    if (!canAnswer) return;
    
    const mappings = {
        'a': 0, 'এ': 0, 'এক': 0, 'one': 0, 'প্রথম': 0, 'option a': 0, '১': 0, '1': 0, 'ক': 0,
        'b': 1, 'বি': 1, 'দুই': 1, 'two': 1, 'দ্বিতীয়': 1, 'option b': 1, '২': 1, '2': 1, 'খ': 1,
        'c': 2, 'সি': 2, 'তিন': 2, 'three': 2, 'তৃতীয়': 2, 'option c': 2, '৩': 2, '3': 2, 'গ': 2,
        'd': 3, 'ডি': 3, 'চার': 3, 'four': 3, 'চতুর্থ': 3, 'option d': 3, '৪': 3, '4': 3, 'ঘ': 3
    };
    
    for (let key in mappings) {
        if (cmd.includes(key)) {
            check(mappings[key]);
            break;
        }
    }
}

// Audio Controls
function toggleMute() {
    isMuted = !isMuted;
    const label = document.getElementById('mute-label');
    const bg = document.getElementById('bg-music');
    
    if (isMuted) {
        if (bg) bg.pause();
        if (label) label.innerText = curLang === 'bn' ? 'আনমিউট' : 'Unmute';
        if (window.speechSynthesis) window.speechSynthesis.cancel();
    } else {
        if (bg && document.getElementById('scr-game') && document.getElementById('scr-game').classList.contains('active')) {
            bg.play().catch(e => console.log("Audio play blocked"));
        }
        if (label) label.innerText = curLang === 'bn' ? 'সাউন্ড' : 'Mute';
    }
}

// Game Exit
function confirmExitGame() {
    if (confirm(curLang === 'bn' ? "আপনি কি খেলা ছেড়ে বাইরে যেতে চান?" : "Are you sure you want to exit the game?")) {
        clearInterval(timerInt);
        if (explanationTimer) clearTimeout(explanationTimer);
        const bg = document.getElementById('bg-music');
        if (bg) bg.pause();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        if (recognition) { try { recognition.stop(); } catch(e) {} }
        show('scr-lang');
    }
}

// User Logout Logic
function logoutUser() {
    if (confirm(curLang === 'bn' ? "আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?" : "Are you sure you want to logout?")) {
        clearInterval(timerInt);
        if (explanationTimer) clearTimeout(explanationTimer);
        const bg = document.getElementById('bg-music');
        if (bg) bg.pause();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        if (recognition) { try { recognition.stop(); } catch(e) {} }

        // Clear Session
        localStorage.removeItem('kbc_login_session');
        localStorage.removeItem('kbc_current_user');

        // Clear URL Params if in test mode
        if (window.location.search.includes('mode=admin_test')) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        show('scr-login');
        loadSavedCredentials();
    }
}

// Authentication Handlers
function switchAuthTab(type) {
    const loginTab = document.getElementById('tab-login-btn');
    const regTab = document.getElementById('tab-signup-btn');
    const loginForm = document.getElementById('form-login');
    const regForm = document.getElementById('form-signup');

    if (type === 'login') {
        if (loginTab) loginTab.classList.add('active');
        if (regTab) regTab.classList.remove('active');
        if (loginForm) {
            loginForm.classList.add('active');
            loginForm.style.display = 'block';
        }
        if (regForm) {
            regForm.classList.remove('active');
            regForm.style.display = 'none';
        }
    } else {
        if (regTab) regTab.classList.add('active');
        if (loginTab) loginTab.classList.remove('active');
        if (regForm) {
            regForm.classList.add('active');
            regForm.style.display = 'block';
        }
        if (loginForm) {
            loginForm.classList.remove('active');
            loginForm.style.display = 'none';
        }
    }
}

function loginUser() {
    const userOrPhone = document.getElementById('login-phone') ? document.getElementById('login-phone').value.trim() : '';
    const pass = document.getElementById('login-pass') ? document.getElementById('login-pass').value.trim() : '';
    const rememberMe = document.getElementById('remember-me') ? document.getElementById('remember-me').checked : false;

    if (!userOrPhone || !pass) {
        alert(curLang === 'bn' ? "ইউজার আইডি এবং পাসওয়ার্ড সঠিকভাবে দিন!" : "Please enter valid credentials!");
        return;
    }

    const savedUserRaw = localStorage.getItem('kbc_user_account_' + userOrPhone);
    if (savedUserRaw) {
        const userData = JSON.parse(savedUserRaw);
        if (userData.pass === pass) {
            localStorage.setItem('kbc_current_user', userOrPhone);
            localStorage.setItem('kbc_login_session', 'active');

            if (rememberMe) {
                localStorage.setItem('kbc_saved_username', userOrPhone);
                localStorage.setItem('kbc_saved_password', pass);
                localStorage.setItem('kbc_remember_flag', 'true');
            } else {
                localStorage.removeItem('kbc_saved_username');
                localStorage.removeItem('kbc_saved_password');
                localStorage.removeItem('kbc_remember_flag');
            }

            playSound('alert');
            checkUserTrialAndProceed(userData);
            return;
        }
    }

    alert(curLang === 'bn' ? "ভুল আইডি বা পাসওয়ার্ড!" : "Invalid ID or Password!");
}

function loadSavedCredentials() {
    const savedUser = localStorage.getItem('kbc_saved_username');
    const savedPass = localStorage.getItem('kbc_saved_password');
    const rememberFlag = localStorage.getItem('kbc_remember_flag');

    const phoneInput = document.getElementById('login-phone');
    const passInput = document.getElementById('login-pass');
    const rememberCheckbox = document.getElementById('remember-me');

    if (savedUser && savedPass && rememberFlag === 'true') {
        if (phoneInput) phoneInput.value = savedUser;
        if (passInput) passInput.value = savedPass;
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }
}

function checkUserTrialAndProceed(userData) {
    if (userData.role === 'admin') {
        show('scr-lang');
        return;
    }

    const now = Date.now();
    const registeredOn = userData.regTimestamp || now;
    const allowedDays = userData.trialDays || 5;
    const elapsedDays = (now - registeredOn) / (1000 * 60 * 60 * 24);

    const promoSec = document.getElementById('promo-section');

    if (elapsedDays > allowedDays) {
        if (promoSec) promoSec.style.display = 'block';
        alert(curLang === 'bn' 
            ? "আপনার " + allowedDays + " দিনের মেয়াদের ট্রায়াল শেষ হয়ে গেছে! অনুগ্রহ করে প্রমো কোড ব্যবহার করুন।" 
            : "Your " + allowedDays + "-day trial has expired! Please enter a promo code.");
        show('scr-login');
    } else {
        if (promoSec) promoSec.style.display = 'none';
        show('scr-lang');
    }
}

function registerUser() {
    const nameElem = document.getElementById('signup-name');
    const phoneElem = document.getElementById('signup-phone');
    const userElem = document.getElementById('signup-username');
    const passElem = document.getElementById('signup-pass');

    const name = nameElem ? nameElem.value.trim() : '';
    const phone = phoneElem ? phoneElem.value.trim() : '';
    const username = userElem ? userElem.value.trim() : '';
    const pass = passElem ? passElem.value.trim() : '';

    if (!name || !username || !pass) {
        alert(curLang === 'bn' ? "দয়া করে সমস্ত ফিল্ড পূরণ করুন!" : "Please fill in all fields!");
        return;
    }

    const userData = {
        name: name,
        phone: phone,
        username: username,
        pass: pass,
        role: 'player',
        regTimestamp: Date.now(),
        trialDays: 5
    };

    localStorage.setItem('kbc_user_account_' + username, JSON.stringify(userData));
    localStorage.setItem('kbc_current_user', username);
    localStorage.setItem('kbc_login_session', 'active');

    playSound('alert');
    checkUserTrialAndProceed(userData);
}

function handlePromoSubmit() {
    const codeInput = document.getElementById('promoInput');
    if (!codeInput) return;
    const code = codeInput.value.trim().toUpperCase();
    const currentUser = localStorage.getItem('kbc_current_user');

    if (!currentUser) {
        alert(curLang === 'bn' ? "প্রথমে লগইন করুন!" : "Please login first!");
        return;
    }

    if (code === 'KBC2026' || code === 'KBC15DAYS' || code === 'FREE10') {
        const savedUserRaw = localStorage.getItem('kbc_user_account_' + currentUser);
        if (savedUserRaw) {
            let userData = JSON.parse(savedUserRaw);
            userData.trialDays = (userData.trialDays || 5) + 15;
            localStorage.setItem('kbc_user_account_' + currentUser, JSON.stringify(userData));
            
            alert(curLang === 'bn' ? "প্রোমো কোড সফল হয়েছে! আপনার মেয়াদ আরও ১৫ দিন বাড়ানো হলো।" : "Promo code applied! Trial extended by 15 days.");
            
            const promoSec = document.getElementById('promo-section');
            if (promoSec) promoSec.style.display = 'none';
            show('scr-lang');
        }
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

    // Refresh custom questions from LocalStorage before filtering
    loadCustomAdminQuestions();

    let filtered = fullQuestionPool.filter(q => {
        let qSub = q.subject ? q.subject.toLowerCase() : '';
        let cSub = curSubject.toLowerCase();
        
        let matchSubj = (cSub === 'all') || (qSub === cSub) || (cSub === 'math' && qSub === 'mathematics') || (cSub === 'mathematics' && qSub === 'math');
        let matchLvl = (q.level === curLevel);
        return matchSubj && matchLvl;
    });

    if (filtered.length === 0) {
        filtered = fullQuestionPool;
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
    if (explanationTimer) clearTimeout(explanationTimer);
    closeExplanationModal();

    if (!activeQuestions || activeQuestions.length === 0 || curIdx >= activeQuestions.length) {
        return end();
    }

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

    const txt = (curLang === 'bn') ? (q.qb || q.qe) : (q.qe || q.qb);
    const opts = (curLang === 'bn') ? (q.ab && q.ab[0] ? q.ab : q.ae) : (q.ae && q.ae[0] ? q.ae : q.ab);

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

// Read Question and Options sequentially
    let speechText = txt;
    if (opts && opts.length > 0) {
        opts.forEach((o, i) => {
            const letter = String.fromCharCode(65 + i);
            speechText += (curLang === 'bn') ? `. অপশন ${letter}: ${o}` : `. Option ${letter}: ${o}`;
        });
    }

    speak(speechText);
    if (voiceEnabled) setTimeout(startListening, 2000);
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
    let isCorrect = (idx === q.ans);

    if (isCorrect) {
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

    const explanationText = curLang === "bn" ? (q.expb || q.expe || "ব্যাখ্যা উপলব্ধ নেই।") : (q.expe || q.expb || "Explanation not available.");
    const correctLetter = String.fromCharCode(65 + q.ans);

    let statusHeader = "";
    if (isCorrect) {
        statusHeader = curLang === "bn" 
            ? `<div style="color: #2e7d32; font-size: 1.2rem; font-weight: bold; margin-bottom: 8px;">✓ চমৎকার! আপনার উত্তর সঠিক হয়েছে।</div>`
            : `<div style="color: #2e7d32; font-size: 1.2rem; font-weight: bold; margin-bottom: 8px;">✓ Correct Answer! Well done.</div>`;
    } else {
        statusHeader = curLang === "bn" 
            ? `<div style="color: #c62828; font-size: 1.2rem; font-weight: bold; margin-bottom: 8px;">✗ ভুল উত্তর! সঠিক উত্তর: Option ${correctLetter}</div>`
            : `<div style="color: #c62828; font-size: 1.2rem; font-weight: bold; margin-bottom: 8px;">✗ Incorrect! Correct Answer: Option ${correctLetter}</div>`;
    }

    // Fixed Modal Elements matching index.html
    const modal = document.getElementById("modal-explanation");
    const modalText = document.getElementById("modal-exp-text");

    const fullHTML = statusHeader + "<hr style='margin: 8px 0; border: 0; border-top: 1px solid #ccc;'>" + "<b>" + (curLang === "bn" ? "ব্যাখ্যা" : "Explanation") + ":</b><br>" + explanationText;

    if (modal && modalText) {
        modalText.innerHTML = fullHTML;
        modal.style.display = "flex";
    }

    speak(explanationText);

    // Automatically proceed to the next question after 4.5 seconds
    if (explanationTimer) clearTimeout(explanationTimer);
    explanationTimer = setTimeout(() => {
        closeExplanationModal();
        curIdx++;
        loadQ();
    }, 4500);
}

function closeExplanationModal() {
    const modal = document.getElementById("modal-explanation");
    if (modal) modal.style.display = "none";
    if (explanationTimer) {
        clearTimeout(explanationTimer);
        explanationTimer = null;
    }
}

// Modal Admin Control Functions
function openAdminModal() {
    const modal = document.getElementById('modal-admin');
    if (modal) modal.style.display = 'flex';
}

function closeAdminModal() {
    const modal = document.getElementById('modal-admin');
    if (modal) modal.style.display = 'none';
}

function verifyAdminAccess() {
    const passInput = document.getElementById('admin-passcode-input');
    const val = passInput ? passInput.value.trim() : '';
    if (val === 'ADMIN2026' || val === '1234') {
        closeAdminModal();
        alert(curLang === 'bn' ? "অ্যাডমিন টেস্ট মোড সক্রিয় হয়েছে!" : "Admin Test Mode Activated!");
        show('scr-lang');
    } else {
        alert(curLang === 'bn' ? "ভুল মাস্টার পাসকোড!" : "Incorrect Master Passcode!");
    }
}

// Player Invite Control Functions
function invitePlayer() {
    const modal = document.getElementById('modal-invite');
    if (modal) modal.style.display = 'flex';
}

function closeInviteModal() {
    const modal = document.getElementById('modal-invite');
    if (modal) modal.style.display = 'none';
}

function copyInviteCode() {
    const codeElem = document.getElementById('invite-code-input');
    if (codeElem) {
        codeElem.select();
        document.execCommand('copy');
        alert(curLang === 'bn' ? "ইনভাইট কোড কপি করা হয়েছে!" : "Invite Code Copied!");
        closeInviteModal();
    }
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
        try {
            sounds[type].currentTime = 0;
            sounds[type].volume = 1.0; 
            sounds[type].play().catch(e => console.warn("Audio play prevented:", e));
        } catch(e) {
            console.warn("Audio exception:", e);
        }
    }
}

function speak(t) {
    if (isMuted || !window.speechSynthesis || !t) return;
    try {
        window.speechSynthesis.cancel();
        const m = new SpeechSynthesisUtterance(t);
        m.lang = (curLang === 'bn') ? 'bn-IN' : 'en-IN';
        m.pitch = 1.0;
        m.rate = 0.9;
        window.speechSynthesis.speak(m);
    } catch(e) {
        console.warn("TTS Error:", e);
    }
}

function end() {
    clearInterval(timerInt);
    if (explanationTimer) clearTimeout(explanationTimer);
    closeExplanationModal();
    
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
    if (recognition) { try { recognition.stop(); } catch(e) {} }
}

function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    const topNav = document.getElementById('top-nav-bar');
    if (topNav) {
        if (id === 'scr-login') {
            topNav.style.display = 'none';
        } else {
            topNav.style.display = 'flex';
        }
    }
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
    loadSavedCredentials();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'admin_test') {
        console.log("Admin Test Bypass Activated.");
        show('scr-lang');
        return;
    }

    const currentSession = localStorage.getItem('kbc_login_session');
    const currentUser = localStorage.getItem('kbc_current_user');

    if (currentSession === 'active' && currentUser) {
        const savedUserRaw = localStorage.getItem('kbc_user_account_' + currentUser);
        if (savedUserRaw) {
            checkUserTrialAndProceed(JSON.parse(savedUserRaw));
        } else {
            show('scr-login');
        }
    } else {
        show('scr-login');
    }
};
