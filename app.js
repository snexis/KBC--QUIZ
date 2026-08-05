// ==========================================
// KBC PREMIUM 2026 - COMPLETE APP LOGIC (FIXED NAVIGATION, PROMO & SOUND LOGIC)
// ==========================================

let curLang = 'bn';
let curSubject = 'all';
let curLevel = 'junior';
let curIdx = 0;
let score = 0, cor = 0, wr = 0;
let timerVal = 30;
let timerInt = null;
let liveClockInt = null;
let activeQuestions = [];
let canAnswer = false;
let voiceEnabled = false;
let isMuted = false;
let recognition = null;
let currentSlabCount = 0;
let fullQuestionPool = [];
let explanationTimer = null;

// Track failed login attempts per user ID
let failedLoginAttempts = {};

// Active Lifelines State
let lifelinesUsed = {
    fiftyFifty: false,
    audiencePoll: false,
    skipQuestion: false,
    timeFreeze: false
};

// Central i18n Translations Dictionary
const i18n = {
    bn: {
        fillAllFields: "দয়া করে সমস্ত ফিল্ড পূরণ করুন!",
        validCredentials: "ইউজার আইডি এবং পাসওয়ার্ড সঠিকভাবে দিন!",
        loginSuccess: "লগইন সফল হয়েছে!",
        invalidCredentials: "ভুল আইডি বা পাসওয়ার্ড!",
        maxFailedAttempts: "পরপর ৩ বার ভুল পাসওয়ার্ড দেওয়া হয়েছে! অ্যাকাউন্ট সুরক্ষায় পাসওয়ার্ড রিকভারি পেজে পাঠানো হচ্ছে।",
        trialExpired: "আপনার ট্রায়ালের মেয়াদ শেষ হয়ে গেছে! অনুগ্রহ করে প্রমো কোড ব্যবহার করুন।",
        promoSuccess: "প্রোমো কোড সফল হয়েছে!",
        invalidPromo: "অবৈধ প্রোমো কোড!",
        loginFirst: "প্রথমে লগইন অথবা সাইন-আপ করুন!",
        confirmExit: "আপনি কি খেলা ছেড়ে বাইরে যেতে চান?",
        confirmLogout: "আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?",
        adminActive: "অ্যাডমিন টেস্ট মোড সক্রিয় হয়েছে!",
        wrongPasscode: "ভুল মাস্টার পাসকোড!",
        copiedCode: "ইনভাইট কোড কপি করা হয়েছে!",
        passUpdated: "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে! এখন নতুন পাসওয়ার্ড দিয়ে ব্যবহার করুন।",
        oldPassMismatch: "পুরাতন পাসওয়ার্ড সঠিক নয়!",
        passMinLength: "পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে!",
        explanationNav: "ব্যাখ্যা উপলব্ধ নেই।",
        correctHeader: "✓ চমৎকার! আপনার উত্তর সঠিক হয়েছে।",
        wrongHeader: "✗ ভুল উত্তর! সঠিক উত্তর: Option ",
        explanationTitle: "ব্যাখ্যা",
        lifelineUsed: "এই লাইফলাইনটি আপনি ইতিপূর্বে ব্যবহার করেছেন!",
        freezeActive: "সময় থমকে গেছে! অতিরিক্ত ১৫ সেকেন্ড যোগ করা হলো।"
    },
    en: {
        fillAllFields: "Please fill in all required fields!",
        validCredentials: "Please enter valid credentials!",
        loginSuccess: "Login successful!",
        invalidCredentials: "Invalid ID or Password!",
        maxFailedAttempts: "3 consecutive incorrect password attempts! Redirecting to password recovery.",
        trialExpired: "Your trial period has expired! Please enter a valid promo code.",
        promoSuccess: "Promo code applied successfully!",
        invalidPromo: "Invalid Promo Code!",
        loginFirst: "Please login or sign up first!",
        confirmExit: "Are you sure you want to exit the game?",
        confirmLogout: "Are you sure you want to logout?",
        adminActive: "Admin Test Mode Activated!",
        wrongPasscode: "Incorrect Master Passcode!",
        copiedCode: "Invite Code Copied!",
        passUpdated: "Password successfully updated! Please use your new password.",
        oldPassMismatch: "Old password does not match!",
        passMinLength: "Password must be at least 4 characters long!",
        explanationNav: "Explanation not available.",
        correctHeader: "✓ Correct Answer! Well done.",
        wrongHeader: "✗ Incorrect! Correct Answer: Option ",
        explanationTitle: "Explanation",
        lifelineUsed: "You have already used this lifeline!",
        freezeActive: "Time Frozen! 15 seconds added to timer."
    }
};

// Helper Translation Resolver
function t(key) {
    return (i18n[curLang] && i18n[curLang][key]) ? i18n[curLang][key] : (i18n['en'][key] || key);
}

// Sound Effects Helper
function playSound(type) {
    if (isMuted) return;
    try {
        let audioId = 'sound-alert';
        if (type === 'cor') audioId = 'sound-correct';
        else if (type === 'wr') audioId = 'sound-wrong';
        else if (type === 'tick') audioId = 'sound-tick';
        
        const audioElem = document.getElementById(audioId);
        if (audioElem) {
            audioElem.currentTime = 0;
            audioElem.play().catch(e => console.log("Audio play prevented:", e));
        }
    } catch (err) {
        console.log("Sound error:", err);
    }
}

// Text to Speech
function speak(text) {
    if (isMuted || !('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = (curLang === 'bn') ? 'bn-IN' : 'en-US';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.log("Speech synthesis error:", e);
    }
}

// Initialize Live English Clock, Question Bank and User Session on Load
document.addEventListener('DOMContentLoaded', () => {
    startLiveClock();
    loadQuestionBank();
    checkSavedSession();
});

// Helper Function: Show specific screen by ID (With Top Navigation Bar Visibility Control)
function show(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }

    // Top Navigation Bar Protection & Visibility Logic
    const topNavBar = document.getElementById('top-nav-bar') || document.querySelector('.top-nav-bar');
    const mainHeader = document.getElementById('main-header') || document.querySelector('header');

    if (screenId === 'scr-login' || screenId === 'scr-signup') {
        if (topNavBar) topNavBar.style.display = 'none';
        if (mainHeader) mainHeader.style.display = 'none';
    } else {
        if (topNavBar) topNavBar.style.display = 'flex';
        if (mainHeader) mainHeader.style.display = 'block';
    }
}

// Live Digital Clock (English Format)
function startLiveClock() {
    if (liveClockInt) clearInterval(liveClockInt);
    
    function updateClock() {
        const clockElem = document.getElementById('live-clock');
        if (clockElem) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: true, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
            clockElem.innerText = timeString;
        }
    }
    
    updateClock();
    liveClockInt = setInterval(updateClock, 1000);
}

// Session Checker & Player Dashboard Avatar Sync
function checkSavedSession() {
    const activeUser = localStorage.getItem('kbc_current_user');
    const sessionFlag = localStorage.getItem('kbc_login_session');
    
    if (activeUser && sessionFlag === 'active') {
        const savedUserRaw = localStorage.getItem('kbc_user_account_' + activeUser);
        if (savedUserRaw) {
            const userData = JSON.parse(savedUserRaw);
            updatePlayerProfileUI(userData);
            checkUserTrialAndProceed(userData);
            return;
        }
    }
    show('scr-login');
    loadSavedCredentials();
}

// Update Player Avatar, Name, Unique ID, and Trial Counter UI
function updatePlayerProfileUI(userData) {
    if (!userData) return;
    
    const elemName = document.getElementById('user-profile-name');
    const elemId = document.getElementById('user-profile-id');
    const elemAvatar = document.getElementById('user-profile-avatar');
    
    if (elemName) elemName.innerText = userData.name || userData.username;
    if (elemId) elemId.innerText = `ID: ${userData.id || userData.username}`;
    
    if (elemAvatar) {
        const avatarSeed = userData.id || userData.username || 'Player';
        elemAvatar.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(avatarSeed)}`;
    }

    // Trial Days Calculations for Header Bar
    const now = Date.now();
    const registeredOn = userData.regTimestamp || now;
    const allowedDays = userData.trialDays || 5;
    const elapsedDays = (now - registeredOn) / (1000 * 60 * 60 * 24);
    const remainingDays = Math.max(0, Math.ceil(allowedDays - elapsedDays));

    const headerTrialElem = document.getElementById('header-trial-days');
    const langTrialElem = document.getElementById('lang-trial-days');
    
    const dayText = curLang === 'bn' ? `মেয়াদ: ${remainingDays} দিন` : `Trial: ${remainingDays} Days`;
    if (headerTrialElem) headerTrialElem.innerText = dayText;
    if (langTrialElem) langTrialElem.innerText = dayText;
}

// Password Visibility Toggle Function
function togglePasswordVisibility(fieldId, iconElem) {
    const passInput = document.getElementById(fieldId);
    if (!passInput) return;
    
    if (passInput.type === 'password') {
        passInput.type = 'text';
        if (iconElem) iconElem.innerText = '👁️‍🗨️';
    } else {
        passInput.type = 'password';
        if (iconElem) iconElem.innerText = '👁️';
    }
}

// Merge Custom Admin Questions into Main Question Pool
function loadCustomAdminQuestions() {
    try {
        const savedCustom = localStorage.getItem('kbc_custom_questions');
        if (savedCustom) {
            const customList = JSON.parse(savedCustom);
            if (Array.isArray(customList) && customList.length > 0) {
                fullQuestionPool = fullQuestionPool.filter(q => !q.id || !q.id.toString().startsWith('custom_'));
                
                const formattedCustoms = customList.map(cQ => {
                    let sub = cQ.subject ? cQ.subject.toLowerCase() : '';
                    if (sub === 'mathematics' || sub === 'math') {
                        cQ.subject = 'math';
                    }
                    return cQ;
                });

                fullQuestionPool.unshift(...formattedCustoms);
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
        if (!response.ok) {
            console.warn(`questions.json HTTP response status: ${response.status}`);
            loadCustomAdminQuestions();
            return;
        }
        
        const textData = await response.text();
        let cleanData = textData.trim();

        try {
            fullQuestionPool = JSON.parse(cleanData);
            loadCustomAdminQuestions();
            return;
        } catch (e) {
            // Direct JSON parsing failed, fallback to chunk parsing
        }

        fullQuestionPool = [];
        let items = [];

        if (cleanData.startsWith('[')) cleanData = cleanData.substring(1);
        if (cleanData.endsWith(']')) cleanData = cleanData.substring(0, cleanData.length - 1);

        const rawObjects = cleanData.split(/\},\s*\{/);
        const BATCH_SIZE = 300;

        for (let i = 0; i < rawObjects.length; i++) {
            let str = rawObjects[i].trim();
            if (!str.startsWith('{')) str = '{' + str;
            if (!str.endsWith('}')) str = str + '}';

            const parsedObj = autoFixAndParseObj(str);
            if (parsedObj) {
                items.push(parsedObj);
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

        loadCustomAdminQuestions();

    } catch (error) {
        console.warn("Could not load external questions.json file:", error);
        loadCustomAdminQuestions();
    }
}

// Speech Recognition Engine
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
    if (confirm(t('confirmExit'))) {
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
    if (confirm(t('confirmLogout'))) {
        clearInterval(timerInt);
        if (explanationTimer) clearTimeout(explanationTimer);
        const bg = document.getElementById('bg-music');
        if (bg) bg.pause();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        if (recognition) { try { recognition.stop(); } catch(e) {} }

        localStorage.removeItem('kbc_login_session');
        localStorage.removeItem('kbc_current_user');

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
        alert(t('validCredentials'));
        return;
    }

    const savedUserRaw = localStorage.getItem('kbc_user_account_' + userOrPhone);
    if (savedUserRaw) {
        const userData = JSON.parse(savedUserRaw);
        if (userData.pass === pass) {
            failedLoginAttempts[userOrPhone] = 0;

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

            updatePlayerProfileUI(userData);
            playSound('alert');
            checkUserTrialAndProceed(userData);
            return;
        }
    }

    failedLoginAttempts[userOrPhone] = (failedLoginAttempts[userOrPhone] || 0) + 1;

    if (failedLoginAttempts[userOrPhone] >= 3) {
        alert(t('maxFailedAttempts'));
        failedLoginAttempts[userOrPhone] = 0;
        openForgotPassModal();
        const forgotUserElem = document.getElementById('forgot-username');
        if (forgotUserElem) forgotUserElem.value = userOrPhone;
        return;
    }

    alert(`${t('invalidCredentials')} (${failedLoginAttempts[userOrPhone]}/3)`);
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

// Updated check function incorporating KBC timing gap and correct flow without losing any code structure
function check(idx) {
    if (!canAnswer) return;
    canAnswer = false;
    clearInterval(timerInt);

    const q = activeQuestions[curIdx];
    const opts = document.querySelectorAll('.option');
    let isCorrect = (idx === q.ans);

    // Step 1: Immediate lock & selection indication
    if (idx !== -1 && opts[idx]) {
        opts[idx].style.background = '#f39c12';
        opts[idx].style.color = '#fff';
    }
    playSound('tick');

    // Step 2: KBC Timing Gap before revealing correct/wrong colors
    setTimeout(() => {
        if (isCorrect) {
            let points = 10;
            if (curIdx >= 10) points = 20;
            if (curIdx >= 25) points = 50;

            score += points;
            cor++;
            playSound('cor');
            if (idx !== -1 && opts[idx]) {
                opts[idx].classList.remove('wrong');
                opts[idx].style.background = '';
                opts[idx].style.color = '';
                opts[idx].classList.add('correct');
            }
        } else {
            wr++;
            playSound('wr');
            if (idx !== -1 && opts[idx]) {
                opts[idx].style.background = '';
                opts[idx].style.color = '';
                opts[idx].classList.add('wrong');
            }
            if (opts[q.ans]) {
                opts[q.ans].classList.add('correct');
            }
        }

        // Step 3: Explanation Popup Timing Gap after showing colors
        setTimeout(() => {
            const explanationText = curLang === "bn" ? (q.expb || q.expe || t('explanationNav')) : (q.expe || q.expb || t('explanationNav'));
            const correctLetter = String.fromCharCode(65 + q.ans);

            let statusHeader = "";
            if (isCorrect) {
                statusHeader = `<div style="color: #2e7d32; font-size: 1.2rem; font-weight: bold; margin-bottom: 8px;">${t('correctHeader')}</div>`;
            } else {
                statusHeader = `<div style="color: #c62828; font-size: 1.2rem; font-weight: bold; margin-bottom: 8px;">${t('wrongHeader')}${correctLetter}</div>`;
            }

            const modal = document.getElementById("modal-explanation");
            const modalText = document.getElementById("modal-exp-text");

            const fullHTML = statusHeader + "<hr style='margin: 8px 0; border: 0; border-top: 1px solid #ccc;'>" + "<b>" + t('explanationTitle') + ":</b><br>" + explanationText;

            if (modal && modalText) {
                modalText.innerHTML = fullHTML;
                modal.style.display = "flex";
            }

            speak(explanationText);

            if (explanationTimer) clearTimeout(explanationTimer);
            explanationTimer = setTimeout(() => {
                closeExplanationModal();
                curIdx++;
                loadQ();
            }, 4500);
        }, 1200);

    }, 800);
}
