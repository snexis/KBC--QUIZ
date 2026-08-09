// ==========================================
// KBC PREMIUM 2026 - COMPLETE APP LOGIC (PASSWORD FIX)
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
let forgotPassVerified = false;

let failedLoginAttempts = {};

let lifelinesUsed = {
    fiftyFifty: false,
    audiencePoll: false,
    skipQuestion: false,
    timeFreeze: false
};

const i18n = {
    bn: {
        fillAllFields: "সবগুলো ফিল্ড পূরণ করা বাধ্যতামূলক!",
        validCredentials: "সঠিক তথ্য দিয়ে লগইন করুন!",
        loginSuccess: "লগইন সফল হয়েছে!",
        invalidCredentials: "ভুল আইডি বা পাসওয়ার্ড!",
        maxFailedAttempts: "৩ বার ভুল পাসওয়ার্ড দেওয়া হয়েছে! পাসওয়ার্ড রিকভারি পেজে পাঠানো হচ্ছে।",
        trialExpired: "আপনার ট্রায়াল মেয়াদ শেষ! অনুগ্রহ করে প্রোমো কোড দিন।",
        promoSuccess: "প্রোমো কোড সফলভাবে যুক্ত হয়েছে!",
        invalidPromo: "অবৈধ প্রোমো কোড!",
        loginFirst: "আগে লগইন বা সাইন আপ করুন!",
        confirmExit: "আপনি কি নিশ্চিত খেলাটি বন্ধ করতে চান?",
        confirmLogout: "আপনি কি নিশ্চিত লগআউট করতে চান?",
        adminActive: "অ্যাডমিন টেস্ট মোড চালু হয়েছে!",
        wrongPasscode: "ভুল মাস্টার পাসকোড!",
        copiedCode: "আমন্ত্রণ কোড কপি করা হয়েছে!",
        passUpdated: "পাসওয়ার্ড সফলভাবে আপডেট হয়েছে! নতুন পাসওয়ার্ড ব্যবহার করুন।",
        oldPassMismatch: "পুরনো পাসওয়ার্ড মিলেনি!",
        passMinLength: "পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে!",
        explanationNav: "ব্যাখ্যা উপলব্ধ নয়।",
        correctHeader: " সঠিক উত্তর! চমৎকার।",
        wrongHeader: " ভুল উত্তর! সঠিক উত্তর: Option ",
        explanationTitle: "ব্যাখ্যা",
        lifelineUsed: "আপনি ইতিমধ্যে এই লাইফলাইন ব্যবহার করেছেন!",
        freezeActive: "টাইম ফ্রিজ! টাইমার আরও ১৫ সেকেন্ড বাড়ানো হয়েছে।",
        signupSuccess: "একাউন্ট সফলভাবে তৈরি হয়েছে! দয়া করে আপনার ইউজারনেম ও পাসওয়ার্ড দিয়ে লগইন করুন।"
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
        correctHeader: " Correct Answer! Well done.",
        wrongHeader: " Incorrect! Correct Answer: Option ",
        explanationTitle: "Explanation",
        lifelineUsed: "You have already used this lifeline!",
        freezeActive: "Time Frozen! 15 seconds added to timer.",
        signupSuccess: "Account created successfully! Please login with your username and password."
    }
};

function t(key) {
    return (i18n[curLang] && i18n[curLang][key]) ? i18n[curLang][key] : (i18n['en'][key] || key);
}

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

document.addEventListener('DOMContentLoaded', () => {
    startLiveClock();
    loadQuestionBank();
    checkSavedSession();
});

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

function isAdminTestMode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('mode') === 'admin_test';
}

function checkSavedSession() {
    if (isAdminTestMode()) {
        const adminTestUser = {
            id: 'admin_tester',
            name: (curLang === 'bn') ? 'অ্যাডমিন টেস্টার' : 'Admin Tester',
            username: 'admin_tester',
            role: 'admin',
            regTimestamp: Date.now(),
            trialDays: 99999,
            highScore: 0
        };
        updatePlayerProfileUI(adminTestUser);
        show('scr-lang');
        return;
    }

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

    const now = Date.now();
    const registeredOn = userData.regTimestamp || now;
    const allowedDays = userData.trialDays || 5;
    const elapsedDays = (now - registeredOn) / (1000 * 60 * 60 * 24);
    const remainingDays = Math.max(0, Math.ceil(allowedDays - elapsedDays));

    const headerTrialElem = document.getElementById('header-trial-days');
    const langTrialElem = document.getElementById('lang-trial-days');
    
    const dayText = curLang === 'bn' ? `মেয়াদ: ${remainingDays} দিন` : `Trial: ${remainingDays} Days`;
    if (headerTrialElem) headerTrialElem.innerText = dayText;
    if (langTrialElem) langTrialElem.innerText = dayText;
}

function togglePasswordVisibility(fieldId, iconElem) {
    const passInput = document.getElementById(fieldId);
    if (!passInput) return;
    
    if (passInput.type === 'password') {
        passInput.type = 'text';
        if (iconElem) iconElem.innerText = 'লুকান';
    } else {
        passInput.type = 'password';
        if (iconElem) iconElem.innerText = 'দেখুন';
    }
}

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

function applyAdminOverridesAndDeletions() {
    try {
        const overrides = JSON.parse(localStorage.getItem('kbc_question_overrides') || '{}');
        const deletedIds = JSON.parse(localStorage.getItem('kbc_deleted_question_ids') || '[]').map(String);

        fullQuestionPool = fullQuestionPool
            .filter(q => !deletedIds.includes(String(q.id)))
            .map(q => overrides[q.id] ? { ...q, ...overrides[q.id] } : q);
    } catch (e) {
        console.warn("Could not apply question overrides:", e);
    }
}

async function loadQuestionBank() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            loadCustomAdminQuestions();
            return;
        }
        
        const textData = await response.text();
        let cleanData = textData.trim();

        try {
            fullQuestionPool = JSON.parse(cleanData);
            applyAdminOverridesAndDeletions();
            loadCustomAdminQuestions();
            return;
        } catch (e) {}

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

        applyAdminOverridesAndDeletions();
        loadCustomAdminQuestions();

    } catch (error) {
        loadCustomAdminQuestions();
    }
}

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
        
        recognition.onerror = (event) => {};
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
        } catch(e) {}
    }
}

function processVoiceCommand(cmd) {
    if (!canAnswer) return;
    
    const mappings = {
        'a': 0, 'এ': 0, '১': 0, 'one': 0, 'অপশন এ': 0, 'ক': 0, '1': 0,
        'b': 1, 'বি': 1, '২': 1, 'two': 1, 'অপশন বি': 1, 'খ': 1, '2': 1,
        'c': 2, 'সি': 2, '৩': 2, 'three': 2, 'অপশন সি': 2, 'গ': 2, '3': 2,
        'd': 3, 'ডি': 3, '৪': 3, 'four': 3, 'অপশন ডি': 3, 'ঘ': 3, '4': 3
    };
    
    for (let key in mappings) {
        if (cmd.includes(key)) {
            check(mappings[key]);
            break;
        }
    }
}

function toggleMute() {
    isMuted = !isMuted;
    const label = document.getElementById('mute-label');
    const bg = document.getElementById('bg-music');
    
    if (isMuted) {
        if (bg) bg.pause();
        if (label) label.innerText = curLang === 'bn' ? 'সাউন্ড' : 'Unmute';
        if (window.speechSynthesis) window.speechSynthesis.cancel();
    } else {
        if (bg && document.getElementById('scr-game') && document.getElementById('scr-game').classList.contains('active')) {
            bg.play().catch(e => {});
        }
        if (label) label.innerText = curLang === 'bn' ? 'মিউট' : 'Mute';
    }
}

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
        alert(t('trialExpired'));
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
        alert(t('fillAllFields'));
        return;
    }

    if (localStorage.getItem('kbc_user_account_' + username)) {
        alert(curLang === 'bn'
            ? 'এই ইউজারনেমের অ্যাকাউন্ট ইতিমধ্যে তৈরি রয়েছে! দয়া করে অন্য একটি নাম দিয়ে চেষ্টা করুন।'
            : 'This username is already taken! Please try another one.');
        return;
    }

    const userData = {
        id: username,
        name: name,
        phone: phone,
        username: username,
        pass: pass,
        role: 'player',
        regTimestamp: Date.now(),
        trialDays: 5,
        highScore: 0,
        status: 'Active'
    };

    localStorage.setItem('kbc_user_account_' + username, JSON.stringify(userData));

    let realPlayers = JSON.parse(localStorage.getItem('kbc_real_players') || '[]');
    const existingIndex = realPlayers.findIndex(p => p.id === username || p.username === username);
    if (existingIndex >= 0) {
        realPlayers[existingIndex] = userData;
    } else {
        realPlayers.push(userData);
    }
    localStorage.setItem('kbc_real_players', JSON.stringify(realPlayers));

    if (window.KBCNetworkAdapter && typeof window.KBCNetworkAdapter.registerPlayer === 'function') {
        window.KBCNetworkAdapter.registerPlayer(username, name, phone, 0, function(res) {}, pass);
    }

    if (nameElem) nameElem.value = '';
    if (phoneElem) phoneElem.value = '';
    if (passElem) passElem.value = '';
    if (userElem) userElem.value = '';

    alert(t('signupSuccess'));

    switchAuthTab('login');

    const loginPhoneElem = document.getElementById('login-phone');
    if (loginPhoneElem) loginPhoneElem.value = username;
    const loginPassElem = document.getElementById('login-pass');
    if (loginPassElem) loginPassElem.value = '';
    if (loginPassElem) loginPassElem.focus();
}

function openForgotPassModal() {
    forgotPassVerified = false;
    const modal = document.getElementById('modal-forgot');
    if (modal) modal.style.display = 'flex';
    const newPassGroup = document.getElementById('new-pass-group');
    if (newPassGroup) newPassGroup.style.display = 'none';
    const btn = document.getElementById('btn-verify-forgot');
    if (btn) btn.innerText = 'যাচাই করুন';
}

function closeForgotPassModal() {
    const modal = document.getElementById('modal-forgot');
    if (modal) modal.style.display = 'none';
    forgotPassVerified = false;
}

function verifyAndResetPassword() {
    const username = document.getElementById('forgot-username').value.trim();
    const phone = document.getElementById('forgot-phone').value.trim();

    if (!forgotPassVerified) {
        if (!username || !phone) {
            alert(t('fillAllFields'));
            return;
        }
        const savedUserRaw = localStorage.getItem('kbc_user_account_' + username);
        if (!savedUserRaw) {
            alert(t('invalidCredentials'));
            return;
        }
        const userData = JSON.parse(savedUserRaw);
        if (userData.phone !== phone) {
            alert(t('invalidCredentials'));
            return;
        }
        forgotPassVerified = true;
        const newPassGroup = document.getElementById('new-pass-group');
        if (newPassGroup) newPassGroup.style.display = 'block';
        const btn = document.getElementById('btn-verify-forgot');
        if (btn) btn.innerText = 'নতুন পাসওয়ার্ড সেট করুন';
        return;
    }

    const newPass = document.getElementById('forgot-new-pass').value.trim();
    if (!newPass || newPass.length < 4) {
        alert(t('passMinLength'));
        return;
    }

    const savedUserRaw = localStorage.getItem('kbc_user_account_' + username);
    let userData = JSON.parse(savedUserRaw);
    userData.pass = newPass;
    localStorage.setItem('kbc_user_account_' + username, JSON.stringify(userData));

    alert(t('passUpdated'));
    forgotPassVerified = false;
    closeForgotPassModal();
}

function handlePromoSubmit() {
    const codeInput = document.getElementById('promoInput');
    if (!codeInput) return;
    const code = codeInput.value.trim().toUpperCase();
    const currentUser = localStorage.getItem('kbc_current_user');

    if (!currentUser) {
        alert(t('loginFirst'));
        return;
    }

    const validCodes = ['KBC2026', 'KBC15DAYS', 'FREE10'];

    if (validCodes.includes(code)) {
        const savedUserRaw = localStorage.getItem('kbc_user_account_' + currentUser);
        if (savedUserRaw) {
            let userData = JSON.parse(savedUserRaw);
            const addedDays = (code === 'KBC2026') ? 30 : 15;
            userData.trialDays = (userData.trialDays || 5) + addedDays;
            localStorage.setItem('kbc_user_account_' + currentUser, JSON.stringify(userData));
            
            alert(`${t('promoSuccess')} +${addedDays}`);
            
            const promoSec = document.getElementById('promo-section');
            if (promoSec) promoSec.style.display = 'none';
            updatePlayerProfileUI(userData);
            show('scr-lang');
        }
    } else {
        alert(t('invalidPromo'));
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

    lifelinesUsed = { fiftyFifty: false, audiencePoll: false, skipQuestion: false, timeFreeze: false };
    resetLifelineUI();

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
        bg.play().catch(e => {});
    }

    if (voiceEnabled) initVoice();
    loadQ();
}

function loadQ() {
    clearInterval(timerInt);
    if (explanationTimer) clearTimeout(explanationTimer);

    const modal = document.getElementById("modal-explanation");
    if (modal) modal.style.display = "none";

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
                ? `অভিনন্দন! আপনি ${curIdx}টি প্রশ্নের সঠিক উত্তর সফলভাবে দিয়েছেন!` 
                : `You have successfully completed ${curIdx} questions!`;
        }
        triggerConfettiFX();
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
        timerVal = 19;
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
                div.id = `opt-${i}`;
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

    setTimeout(() => {
        showExplanationModal(q, isCorrect);
    }, 1000);
}

function showExplanationModal(q, isCorrect) {
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
        proceedToNextQuestion();
    }, 6000);
}

function proceedToNextQuestion() {
    const modal = document.getElementById("modal-explanation");
    if (modal) modal.style.display = "none";
    if (explanationTimer) {
        clearTimeout(explanationTimer);
        explanationTimer = null;
    }
    curIdx++;
    loadQ();
}

function closeExplanationModal() {
    proceedToNextQuestion();
}

function resetLifelineUI() {
    const keys = ['fiftyFifty', 'audiencePoll', 'skipQuestion', 'timeFreeze'];
    keys.forEach(k => {
        const btn = document.getElementById(`life-${k}`);
        if (btn) {
            btn.classList.remove('disabled');
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        }
    });
}

function useLifeline(type) {
    if (!canAnswer) return;
    if (lifelinesUsed[type]) {
        alert(t('lifelineUsed'));
        return;
    }

    lifelinesUsed[type] = true;
    const btn = document.getElementById(`life-${type}`);
    if (btn) {
        btn.classList.add('disabled');
        btn.style.opacity = '0.4';
        btn.style.pointerEvents = 'none';
    }

    const q = activeQuestions[curIdx];

    if (type === 'fiftyFifty') {
        let removed = 0;
        for (let i = 0; i < 4; i++) {
            if (i !== q.ans && removed < 2) {
                const optElem = document.getElementById(`opt-${i}`);
                if (optElem) optElem.style.visibility = 'hidden';
                removed++;
            }
        }
    } else if (type === 'audiencePoll') {
        alert(`Audience Poll Results:\nOption A: ${q.ans === 0 ? '65%' : '10%'}\nOption B: ${q.ans === 1 ? '65%' : '15%'}\nOption C: ${q.ans === 2 ? '65%' : '10%'}\nOption D: ${q.ans === 3 ? '65%' : '10%'}`);
    } else if (type === 'skipQuestion') {
        clearInterval(timerInt);
        curIdx++;
        loadQ();
    } else if (type === 'timeFreeze') {
        timerVal += 15;
        alert(t('freezeActive'));
    }
}

function end() {
    clearInterval(timerInt);
    const bg = document.getElementById('bg-music');
    if (bg) bg.pause();

    const currentUser = localStorage.getItem('kbc_current_user');
    if (currentUser) {
        const savedUserRaw = localStorage.getItem('kbc_user_account_' + currentUser);
        if (savedUserRaw) {
            let userData = JSON.parse(savedUserRaw);
            if (score > (userData.highScore || 0)) {
                userData.highScore = score;
                localStorage.setItem('kbc_user_account_' + currentUser, JSON.stringify(userData));

                let realPlayers = JSON.parse(localStorage.getItem('kbc_real_players') || '[]');
                const idx = realPlayers.findIndex(p => p.id === currentUser || p.username === currentUser);
                if (idx >= 0) {
                    realPlayers[idx] = userData;
                    localStorage.setItem('kbc_real_players', JSON.stringify(realPlayers));
                }
            }
        }
    }

    const resScore = document.getElementById('res-score');
    const resCor = document.getElementById('res-cor');
    const resWr = document.getElementById('res-wr');

    if (resScore) resScore.innerText = score;
    if (resCor) resCor.innerText = cor;
    if (resWr) resWr.innerText = wr;

    triggerConfettiFX();
    show('scr-res');
}

function triggerConfettiFX() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];
    for (let i = 0; i < 100; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 3 + 2
        });
    }

    let animId;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.y += p.speed;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        
        if (pieces.some(p => p.y < canvas.height)) {
            animId = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animId);
        }
    }
    render();
}
