/**
 * Project: KBC Admin Dashboard Logic
 * Role: Senior Software Architect & Security Expert
 * Description: Fully updated administrative logic supporting cross-storage fallback,
 * live player tracking, custom question insertion, audit logging, and dynamic status updates.
 */

// Helper Function: Retrieve registered players safely across all possible LocalStorage keys
function getAllStoredPlayers() {
    const keysToTry = ['kbc_players', 'players', 'users', 'registered_users', 'kbc_users', 'kbc_real_players'];
    
    for (let key of keysToTry) {
        let data = localStorage.getItem(key);
        if (data) {
            try {
                let parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                console.error("Error parsing stored players data from key: " + key, e);
            }
        }
    }
    return [];
}

// Admin Feature: Add New Question directly to the game repository
function addNewQuestionFromAdmin() {
    const authorElem = document.getElementById('admin-q-author');
    const authorName = authorElem ? authorElem.value.trim() : "";

    const subjElem = document.getElementById('admin-q-subj');
    const levelElem = document.getElementById('admin-q-level');
    const qTextElem = document.getElementById('admin-q-text');

    const subj = subjElem ? subjElem.value : "General";
    const level = levelElem ? levelElem.value : "1";
    const qText = qTextElem ? qTextElem.value.trim() : "";
    
    const optA = document.getElementById('admin-opt-a') ? document.getElementById('admin-opt-a').value.trim() : "";
    const optB = document.getElementById('admin-opt-b') ? document.getElementById('admin-opt-b').value.trim() : "";
    const optC = document.getElementById('admin-opt-c') ? document.getElementById('admin-opt-c').value.trim() : "";
    const optD = document.getElementById('admin-opt-d') ? document.getElementById('admin-opt-d').value.trim() : "";
    const correct = document.getElementById('admin-correct-opt') ? document.getElementById('admin-correct-opt').value : "a";
    
    const expElement = document.getElementById('admin-q-exp');
    const qExp = expElement ? expElement.value.trim() : "";

    // Validation
    if (!authorName) {
        alert("দয়া করে এডমিনের নাম (Created By) ইনপুট দিন!");
        if (authorElem) authorElem.focus();
        return;
    }

    if (!qText || !optA || !optB || !optC || !optD) {
        alert("দয়া করে প্রশ্ন এবং ৪টি অপশন সঠিকভাবে পূরণ করুন!");
        return;
    }

    // Construct Question Payload
    const newQ = {
        id: "custom_" + Date.now(),
        author: authorName,
        subject: subj,
        level: level,
        correct: correct,
        bn: { q: qText, a: optA, b: optB, c: optC, d: optD, exp: qExp },
        en: { q: qText, a: optA, b: optB, c: optC, d: optD, exp: qExp }
    };

    // Save to Custom Questions list
    let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
    if (!Array.isArray(customQuestions)) customQuestions = [];
    customQuestions.push(newQ);
    localStorage.setItem('kbc_custom_questions', JSON.stringify(customQuestions));

    // Append to Primary Questions repository
    let mainQuestions = JSON.parse(localStorage.getItem('kbc_questions') || '[]');
    if (!Array.isArray(mainQuestions)) mainQuestions = [];
    mainQuestions.push(newQ);
    localStorage.setItem('kbc_questions', JSON.stringify(mainQuestions));

    // Audit Log Generation
    const now = new Date();
    const timeFormatted = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    
    const logEntry = {
        author: authorName,
        timestamp: timeFormatted,
        status: "✔️ Success",
        questionSnippet: qText.length > 45 ? qText.substring(0, 45) + "..." : qText
    };

    let auditLogs = JSON.parse(localStorage.getItem('kbc_admin_audit_log') || '[]');
    if (!Array.isArray(auditLogs)) auditLogs = [];
    auditLogs.unshift(logEntry);
    localStorage.setItem('kbc_admin_audit_log', JSON.stringify(auditLogs));

    alert("প্রশ্ন ও ব্যাখ্যা সফলভাবে সেভ হয়েছে! গেমে নতুন প্রশ্ন যুক্ত হয়ে গেছে।");

    // UI Reset
    if (qTextElem) qTextElem.value = '';
    if (document.getElementById('admin-opt-a')) document.getElementById('admin-opt-a').value = '';
    if (document.getElementById('admin-opt-b')) document.getElementById('admin-opt-b').value = '';
    if (document.getElementById('admin-opt-c')) document.getElementById('admin-opt-c').value = '';
    if (document.getElementById('admin-opt-d')) document.getElementById('admin-opt-d').value = '';
    if (expElement) expElement.value = '';
}

// Display Audit Logs in Modal Table
function loadAuditLogs() {
    const logTbody = document.getElementById('audit-log-tbody');
    if (!logTbody) return;

    const auditLogs = JSON.parse(localStorage.getItem('kbc_admin_audit_log') || '[]');

    if (!Array.isArray(auditLogs) || auditLogs.length === 0) {
        logTbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: #aaa;">কোনো হিস্ট্রি বা লগ পাওয়া যায়নি</td>
            </tr>
        `;
        return;
    }

    let html = '';
    auditLogs.forEach(log => {
        html += `
            <tr>
                <td style="color: #66fcf1; font-weight: bold;">${log.author || 'Unknown Admin'}</td>
                <td>${log.timestamp || 'N/A'}</td>
                <td><span style="color: #2ecc71;">${log.status || 'Success'}</span></td>
                <td>${log.questionSnippet || ''}</td>
            </tr>
        `;
    });
    logTbody.innerHTML = html;
}

// Render Real Players Table with Online/Offline Badges
function loadRealPlayersList() {
    const tableBody = document.getElementById('player-table-body');
    if (!tableBody) return;

    let savedPlayers = getAllStoredPlayers();

    if (savedPlayers.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #aaa;">কোনো প্লেয়ার পাওয়া যায়নি</td>
            </tr>
        `;
        return;
    }

    let html = '';
    const currentTime = Date.now();

    savedPlayers.forEach(player => {
        const playerId = player.id || player.phone || player.userId || 'N/A';
        const playerStatus = player.status || (player.isBlocked ? 'Blocked' : 'Active');
        
        let isLive = false;
        if (player.lastActive && (currentTime - player.lastActive < 30000)) {
            isLive = true;
        } else if (player.isOnline === true && (currentTime - (player.lastActive || 0) < 30000)) {
            isLive = true;
        }

        const liveBadge = isLive 
            ? `<span class="badge badge-active" style="display: inline-flex; align-items: center; gap: 4px; background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 2px 8px; border-radius: 12px; font-size: 11px;"><span style="width: 6px; height: 6px; background: #10b981; border-radius: 50%; display: inline-block;"></span> LIVE</span>`
            : `<span class="badge" style="display: inline-flex; align-items: center; gap: 4px; background: rgba(149, 165, 166, 0.2); color: #95a5a6; padding: 2px 8px; border-radius: 12px; font-size: 11px;"><span style="width: 6px; height: 6px; background: #95a5a6; border-radius: 50%; display: inline-block;"></span> Offline</span>`;

        const playerName = player.name || player.username || player.fullName || 'Unknown';
        const playerPhone = player.phone || player.id || player.userId || 'N/A';
        const playerScore = player.highScore || player.score || 0;
        const formattedScore = typeof playerScore === 'number' ? '৳ ' + playerScore.toLocaleString() : playerScore;

        const isBlocked = playerStatus === 'Blocked';

        html += `
            <tr>
                <td>${playerPhone}</td>
                <td>
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                        <span>${playerName}</span>
                        ${liveBadge}
                    </div>
                </td>
                <td>${formattedScore}</td>
                <td><span class="badge ${isBlocked ? 'badge-blocked' : 'badge-active'}">${playerStatus}</span></td>
                <td>
                    <button class="btn-sm btn-block" onclick="toggleBlockPlayer('${playerId}')" style="background: ${isBlocked ? '#10b981' : '#ef4444'}; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 6px; font-weight: bold;">
                        ${isBlocked ? 'Unblock 🔓' : 'Block 🚫'}
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

// Toggle Player Block Status
function toggleBlockPlayer(playerId) {
    const keysToTry = ['kbc_players', 'players', 'users', 'registered_users', 'kbc_users', 'kbc_real_players'];
    let targetKey = 'kbc_players';
    let savedPlayers = [];

    for (let key of keysToTry) {
        let data = localStorage.getItem(key);
        if (data) {
            try {
                let parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    savedPlayers = parsed;
                    targetKey = key;
                    break;
                }
            } catch (e) {}
        }
    }

    savedPlayers = savedPlayers.map(player => {
        if (player.id === playerId || player.phone === playerId || player.userId === playerId) {
            player.isBlocked = !player.isBlocked;
            player.status = player.isBlocked ? 'Blocked' : 'Active';
        }
        return player;
    });

    localStorage.setItem(targetKey, JSON.stringify(savedPlayers));
    localStorage.setItem('kbc_real_players', JSON.stringify(savedPlayers));
    loadRealPlayersList();
    updateAdminDashboardStats();
}

// Dashboard Dynamic Metrics Updater
function updateAdminDashboardStats() {
    let savedPlayers = getAllStoredPlayers();
    const currentTime = Date.now();

    const totalPlayersElem = document.getElementById('total-players');
    if (totalPlayersElem) {
        totalPlayersElem.innerText = savedPlayers.length;
    }

    const activeSessionsElem = document.getElementById('active-sessions');
    if (activeSessionsElem) {
        const activeCount = savedPlayers.filter(p => 
            !p.isBlocked && p.status !== 'Blocked' && (p.lastActive && (currentTime - p.lastActive < 30000))
        ).length;
        activeSessionsElem.innerText = activeCount;
    }

    const totalQuestionsElem = document.getElementById('total-questions');
    if (totalQuestionsElem) {
        let totalQCount = 0; 
        try {
            let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
            let allQuestions = JSON.parse(localStorage.getItem('kbc_questions') || 'null');
            
            let baseCount = 0;
            if (allQuestions && Array.isArray(allQuestions)) {
                baseCount = allQuestions.length;
            }
            totalQCount = baseCount > customQuestions.length ? baseCount : (baseCount + customQuestions.length);
            if (totalQCount === 0) totalQCount = 150;
        } catch (e) {
            totalQCount = 150;
        }
        totalQuestionsElem.innerText = totalQCount;
    }
}

// Global Tab Switcher Handler
const originalSwitchTab = window.switchTab;
window.switchTab = function(tabName, element) {
    if (typeof originalSwitchTab === 'function') {
        originalSwitchTab(tabName, element);
    }
    if (tabName === 'dashboard') {
        updateAdminDashboardStats();
    } else if (tabName === 'players') {
        loadRealPlayersList();
    }
};

// Event Listener: Initialize data on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    loadRealPlayersList();
    updateAdminDashboardStats();
});
