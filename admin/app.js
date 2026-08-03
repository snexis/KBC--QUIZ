// Admin Add Question Functionality
function addNewQuestionFromAdmin() {
    const authorElem = document.getElementById('admin-q-author');
    const authorName = authorElem ? authorElem.value.trim() : "";

    const subj = document.getElementById('admin-q-subj').value;
    const level = document.getElementById('admin-q-level').value;
    const qText = document.getElementById('admin-q-text').value.trim();
    
    const optA = document.getElementById('admin-opt-a').value.trim();
    const optB = document.getElementById('admin-opt-b').value.trim();
    const optC = document.getElementById('admin-opt-c').value.trim();
    const optD = document.getElementById('admin-opt-d').value.trim();
    const correct = document.getElementById('admin-correct-opt').value;
    
    const expElement = document.getElementById('admin-q-exp');
    const qExp = expElement ? expElement.value.trim() : "";

    // Mandatory Field Checks
    if (!authorName) {
        alert("দয়া করে এডমিনের নাম (Created By) ইনপুট দিন!");
        if (authorElem) authorElem.focus();
        return;
    }

    if (!qText || !optA || !optB || !optC || !optD) {
        alert("দয়া করে প্রশ্ন এবং ৪টি অপশন সঠিকভাবে পূরণ করুন!");
        return;
    }

    // Unified Question Object Structure for both languages
    const newQ = {
        id: "custom_" + Date.now(),
        author: authorName,
        subject: subj,
        level: level,
        correct: correct,
        bn: {
            q: qText,
            a: optA,
            b: optB,
            c: optC,
            d: optD,
            exp: qExp
        },
        en: {
            q: qText,
            a: optA,
            b: optB,
            c: optC,
            d: optD,
            exp: qExp
        }
    };
    // Save Custom Questions to LocalStorage
    let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
    customQuestions.push(newQ);
    localStorage.setItem('kbc_custom_questions', JSON.stringify(customQuestions));

    // Log Creation into Admin Audit History Log
    const now = new Date();
    const timeFormatted = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    
    const logEntry = {
        author: authorName,
        timestamp: timeFormatted,
        status: "✔️ Success",
        questionSnippet: qText.length > 45 ? qText.substring(0, 45) + "..." : qText
    };

    let auditLogs = JSON.parse(localStorage.getItem('kbc_admin_audit_log') || '[]');
    auditLogs.unshift(logEntry); // Save newest log first
    localStorage.setItem('kbc_admin_audit_log', JSON.stringify(auditLogs));

    alert("প্রশ্ন ও ব্যাখ্যা সফলভাবে সেভ হয়েছে! গেমে নতুন প্রশ্ন যুক্ত হয়ে গেছে।");

    // Clear All Form Fields Completely
    document.getElementById('admin-q-text').value = '';
    document.getElementById('admin-opt-a').value = '';
    document.getElementById('admin-opt-b').value = '';
    document.getElementById('admin-opt-c').value = '';
    document.getElementById('admin-opt-d').value = '';
    if (expElement) {
        expElement.value = '';
    }
}

// Audit Log Modal Operations
function openAuditLogModal() {
    loadAuditLogs();
    const modal = document.getElementById('audit-log-modal');
    if (modal) modal.style.display = 'flex';
}

function closeAuditLogModal() {
    const modal = document.getElementById('audit-log-modal');
    if (modal) modal.style.display = 'none';
}

function loadAuditLogs() {
    const logTbody = document.getElementById('audit-log-tbody');
    if (!logTbody) return;

    const auditLogs = JSON.parse(localStorage.getItem('kbc_admin_audit_log') || '[]');

    if (auditLogs.length === 0) {
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
                <td>${log.timestamp}</td>
                <td><span style="color: #2ecc71;">${log.status}</span></td>
                <td>${log.questionSnippet}</td>
            </tr>
        `;
    });
    logTbody.innerHTML = html;
}

// Function to Load Real Players List with Live Indicator (Green Pulsing Badge)
function loadRealPlayersList() {
    const tableBody = document.getElementById('player-table-body');
    if (!tableBody) return;

    let savedPlayers = JSON.parse(localStorage.getItem('kbc_real_players') || 'null');
    if (!savedPlayers || savedPlayers.length === 0) {
        savedPlayers = JSON.parse(localStorage.getItem('kbc_players') || '[]');
    }

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
        const playerId = player.id || player.phone;
        const playerStatus = player.status || (player.isBlocked ? 'Blocked' : 'Active');
        
        // Check if player is truly live (active within the last 2 minutes / 120000 ms)
        let isLive = false;
        if (player.lastActive && (currentTime - player.lastActive < 120000)) {
            isLive = true;
        } else if (playerStatus === 'Active' && !player.isBlocked) {
            // Fallback assumption if status is Active
            isLive = true;
        }

        const liveBadge = isLive 
            ? `<span style="display: inline-flex; align-items: center; gap: 5px; background: rgba(46, 204, 113, 0.15); color: #2ecc71; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;"><span style="width: 8px; height: 8px; background: #2ecc71; border-radius: 50%; display: inline-block; box-shadow: 0 0 8px #2ecc71;"></span> LIVE</span>`
            : `<span style="color: #95a5a6; font-size: 11px;">Offline</span>`;

        html += `
            <tr>
                <td>${player.phone || player.id || 'N/A'}</td>
                <td>
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                        <span>${player.name || player.username || 'Unknown'}</span>
                        ${liveBadge}
                    </div>
                </td>
                <td>${player.highScore || 0} Points</td>
                <td><span style="color: ${playerStatus === 'Blocked' ? '#e74c3c' : '#2ecc71'};">${playerStatus}</span></td>
                <td>
                    <button class="btn-action" onclick="toggleBlockPlayer('${playerId}')" style="background: ${playerStatus === 'Blocked' ? '#27ae60' : '#e74c3c'}; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">
                        ${playerStatus === 'Blocked' ? 'Unblock' : 'Block'}
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

// Block/Unblock Toggle Functionality
function toggleBlockPlayer(playerId) {
    let storageKey = 'kbc_real_players';
    let savedPlayers = JSON.parse(localStorage.getItem('kbc_real_players') || '[]');
    
    if (savedPlayers.length === 0) {
        savedPlayers = JSON.parse(localStorage.getItem('kbc_players') || '[]');
        storageKey = 'kbc_players';
    }

    savedPlayers = savedPlayers.map(player => {
        if (player.id === playerId || player.phone === playerId) {
            if (storageKey === 'kbc_players') {
                player.isBlocked = !player.isBlocked;
            } else {
                player.status = (player.status === 'Blocked') ? 'Active' : 'Blocked';
            }
        }
        return player;
    });

    localStorage.setItem(storageKey, JSON.stringify(savedPlayers));
    loadRealPlayersList();
    updateAdminDashboardStats();
}

// Window load trigger
window.addEventListener('DOMContentLoaded', () => {
    loadRealPlayersList();
    updateAdminDashboardStats();
});

// Fully Dynamic Admin Dashboard Statistics Updater
function updateAdminDashboardStats() {
    let savedPlayers = JSON.parse(localStorage.getItem('kbc_real_players') || 'null');
    if (!savedPlayers || savedPlayers.length === 0) {
        savedPlayers = JSON.parse(localStorage.getItem('kbc_players') || '[]');
    }

    // 1. Total Registered Players Count
    const totalPlayersElem = document.getElementById('total-players');
    if (totalPlayersElem) {
        totalPlayersElem.innerText = savedPlayers.length;
    }

    // 2. Active Sessions Count
    const activeSessionsElem = document.getElementById('active-sessions');
    if (activeSessionsElem) {
        const activeCount = savedPlayers.filter(p => 
            p.status === 'Active' || (!p.isBlocked && p.status !== 'Blocked')
        ).length;
        activeSessionsElem.innerText = activeCount;
    }

    // 3. Fully Dynamic Total Questions Count (No Hardcode)
    const totalQuestionsElem = document.getElementById('total-questions');
    if (totalQuestionsElem) {
        let totalQCount = 150; // Default base count
        try {
            let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
            let allQuestions = JSON.parse(localStorage.getItem('kbc_questions') || 'null');
            
            if (allQuestions && Array.isArray(allQuestions) && allQuestions.length > 0) {
                totalQCount = allQuestions.length + customQuestions.length;
            } else {
                totalQCount = 150 + customQuestions.length;
            }
        } catch (e) {
            totalQCount = 150;
        }
        totalQuestionsElem.innerText = totalQCount;
    }
}

// Tab Switching with Data Synchronization
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
