/**
 * Project: KBC Admin Dashboard Logic
 * Role: Senior Software Architect & Security Expert
 * Description: Fully updated administrative logic supporting cross-storage fallback,
 * live player tracking, custom + base question insertion/edit/delete, audit logging,
 * password view toggle, and dynamic status updates.
 */

// Tracks which question is currently being edited (null = adding new)
let editingQuestionId = null;
let editingIsBaseQuestion = false;

// Cache for the fetched base questions.json so we don't re-fetch every time
let baseQuestionsCache = null;

// Helper Function: Find which localStorage key currently holds the player array
function findPlayerStorageKey() {
    const keysToTry = ['kbc_real_players', 'kbc_players', 'players', 'users', 'registered_users', 'kbc_users'];
    for (let key of keysToTry) {
        let data = localStorage.getItem(key);
        if (data) {
            try {
                let parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return key;
                }
            } catch (e) {}
        }
    }
    return 'kbc_real_players';
}

function getAllStoredPlayers() {
    const key = findPlayerStorageKey();
    try {
        let parsed = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function savePlayersList(players) {
    const key = findPlayerStorageKey();
    localStorage.setItem(key, JSON.stringify(players));
    localStorage.setItem('kbc_real_players', JSON.stringify(players));
}

// ================= QUESTION BANK HELPERS (base + overrides + deletions) =================

async function fetchBaseQuestions() {
    if (baseQuestionsCache) return baseQuestionsCache;
    try {
        const res = await fetch('/KBC--QUIZ/questions.json');
        if (!res.ok) throw new Error('not found');
        const data = await res.json();
        baseQuestionsCache = Array.isArray(data) ? data : [];
    } catch (e) {
        baseQuestionsCache = [];
    }
    return baseQuestionsCache;
}

function getOverrides() {
    try {
        return JSON.parse(localStorage.getItem('kbc_question_overrides') || '{}');
    } catch (e) {
        return {};
    }
}
function saveOverrides(obj) {
    localStorage.setItem('kbc_question_overrides', JSON.stringify(obj));
}
function getDeletedIds() {
    try {
        const arr = JSON.parse(localStorage.getItem('kbc_deleted_question_ids') || '[]');
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        return [];
    }
}
function saveDeletedIds(arr) {
    localStorage.setItem('kbc_deleted_question_ids', JSON.stringify(arr));
}
// ================= ADD / EDIT QUESTION =================

async function addNewQuestionFromAdmin() {
    const authorElem = document.getElementById('admin-q-author');
    const authorName = authorElem ? authorElem.value.trim() : "";

    const subjElem = document.getElementById('admin-q-subj');
    const levelElem = document.getElementById('admin-q-level');
    const qTextElem = document.getElementById('admin-q-text');

    const subj = subjElem ? subjElem.value : "all";
    const level = levelElem ? levelElem.value : "junior";
    const qText = qTextElem ? qTextElem.value.trim() : "";

    const optA = document.getElementById('admin-opt-a') ? document.getElementById('admin-opt-a').value.trim() : "";
    const optB = document.getElementById('admin-opt-b') ? document.getElementById('admin-opt-b').value.trim() : "";
    const optC = document.getElementById('admin-opt-c') ? document.getElementById('admin-opt-c').value.trim() : "";
    const optD = document.getElementById('admin-opt-d') ? document.getElementById('admin-opt-d').value.trim() : "";
    const correct = document.getElementById('admin-correct-opt') ? document.getElementById('admin-correct-opt').value : "a";

    const expElement = document.getElementById('admin-q-exp');
    const qExp = expElement ? expElement.value.trim() : "";

    if (!authorName) {
        alert("দয়া করে এডমিনের নাম (Created By) ইনপুট দিন!");
        if (authorElem) authorElem.focus();
        return;
    }

    if (!qText || !optA || !optB || !optC || !optD) {
        alert("দয়া করে প্রশ্ন এবং ৪টি অপশন সঠিকভাবে পূরণ করুন!");
        return;
    }

    if (editingQuestionId) {
        // ---- EDIT MODE ----
        const updatedQ = {
            id: editingQuestionId,
            author: authorName,
            subject: subj,
            level: level,
            correct: correct,
            bn: { q: qText, a: optA, b: optB, c: optC, d: optD, exp: qExp },
            en: { q: qText, a: optA, b: optB, c: optC, d: optD, exp: qExp }
        };

        if (editingIsBaseQuestion) {
            // Base (questions.json) question: store as an override, don't touch the file
            let overrides = getOverrides();
            overrides[editingQuestionId] = updatedQ;
            saveOverrides(overrides);
        } else {
            // Admin-added custom question: update in place
            let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
            const customIdx = customQuestions.findIndex(q => q.id === editingQuestionId);
            if (customIdx >= 0) customQuestions[customIdx] = updatedQ;
            localStorage.setItem('kbc_custom_questions', JSON.stringify(customQuestions));

            let mainQuestions = JSON.parse(localStorage.getItem('kbc_questions') || '[]');
            const mainIdx = mainQuestions.findIndex(q => q.id === editingQuestionId);
            if (mainIdx >= 0) mainQuestions[mainIdx] = updatedQ;
            localStorage.setItem('kbc_questions', JSON.stringify(mainQuestions));
        }

        logAuditEntry(authorName, "✏️ Edited", qText);
        alert("প্রশ্নটি সফলভাবে আপডেট হয়েছে!");

        editingQuestionId = null;
        editingIsBaseQuestion = false;
        resetAddQuestionFormLabel();

    } else {
        // ---- ADD MODE ----
        const newQ = {
            id: "custom_" + Date.now(),
            author: authorName,
            subject: subj,
            level: level,
            correct: correct,
            bn: { q: qText, a: optA, b: optB, c: optC, d: optD, exp: qExp },
            en: { q: qText, a: optA, b: optB, c: optC, d: optD, exp: qExp }
        };

        let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
        if (!Array.isArray(customQuestions)) customQuestions = [];
        customQuestions.push(newQ);
        localStorage.setItem('kbc_custom_questions', JSON.stringify(customQuestions));

        let mainQuestions = JSON.parse(localStorage.getItem('kbc_questions') || '[]');
        if (!Array.isArray(mainQuestions)) mainQuestions = [];
        mainQuestions.push(newQ);
        localStorage.setItem('kbc_questions', JSON.stringify(mainQuestions));

        logAuditEntry(authorName, "✔️ Added", qText);
        alert("প্রশ্ন ও ব্যাখ্যা সফলভাবে সেভ হয়েছে! প্লেয়ার পরের বার গেম খুললে নতুন প্রশ্ন পাবে।");
    }

    if (qTextElem) qTextElem.value = '';
    if (document.getElementById('admin-opt-a')) document.getElementById('admin-opt-a').value = '';
    if (document.getElementById('admin-opt-b')) document.getElementById('admin-opt-b').value = '';
    if (document.getElementById('admin-opt-c')) document.getElementById('admin-opt-c').value = '';
    if (document.getElementById('admin-opt-d')) document.getElementById('admin-opt-d').value = '';
    if (expElement) expElement.value = '';

    updateAdminDashboardStats();
    loadCustomQuestionsList();
}

// Load an existing question (base OR custom) back into the form for editing
async function editCustomQuestion(qId, isBase) {
    let q = null;

    if (isBase) {
        const base = await fetchBaseQuestions();
        const overrides = getOverrides();
        const found = base.find(item => String(item.id) === String(qId));
        if (!found) {
            alert("প্রশ্নটি খুঁজে পাওয়া যায়নি!");
            return;
        }
        q = overrides[qId] ? { ...overrides[qId], id: qId } : found;
    } else {
        let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
        q = customQuestions.find(item => item.id === qId);
        if (!q) {
            alert("প্রশ্নটি খুঁজে পাওয়া যায়নি!");
            return;
        }
    }

    document.getElementById('admin-q-author').value = q.author || '';
    document.getElementById('admin-q-subj').value = q.subject || 'all';
    document.getElementById('admin-q-level').value = q.level || 'junior';
    document.getElementById('admin-q-text').value = (q.bn && q.bn.q) || '';
    document.getElementById('admin-opt-a').value = (q.bn && q.bn.a) || '';
    document.getElementById('admin-opt-b').value = (q.bn && q.bn.b) || '';
    document.getElementById('admin-opt-c').value = (q.bn && q.bn.c) || '';
    document.getElementById('admin-opt-d').value = (q.bn && q.bn.d) || '';
    document.getElementById('admin-correct-opt').value = q.correct || 'a';
    document.getElementById('admin-q-exp').value = (q.bn && q.bn.exp) || '';

    editingQuestionId = qId;
    editingIsBaseQuestion = !!isBase;

    const saveBtn = document.getElementById('save-question-btn');
    if (saveBtn) saveBtn.innerText = '✏️ Update This Question';

    const formBox = document.getElementById('admin-q-author');
    if (formBox) formBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetAddQuestionFormLabel() {
    const saveBtn = document.getElementById('save-question-btn');
    if (saveBtn) saveBtn.innerText = '💾 Save Question to Game';
}

// Delete a question (base OR custom) permanently from the player's pool
function deleteCustomQuestion(qId, isBase) {
    if (!confirm("আপনি কি নিশ্চিত এই প্রশ্নটি স্থায়ীভাবে মুছে ফেলতে চান? এটি প্লেয়ারদের প্রশ্ন তালিকা থেকেও সরে যাবে।")) {
        return;
    }

    if (isBase) {
        let deletedIds = getDeletedIds();
        if (!deletedIds.map(String).includes(String(qId))) {
            deletedIds.push(qId);
            saveDeletedIds(deletedIds);
        }
        let overrides = getOverrides();
        delete overrides[qId];
        saveOverrides(overrides);
    } else {
        let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
        customQuestions = customQuestions.filter(q => q.id !== qId);
        localStorage.setItem('kbc_custom_questions', JSON.stringify(customQuestions));

        let mainQuestions = JSON.parse(localStorage.getItem('kbc_questions') || '[]');
        mainQuestions = mainQuestions.filter(q => q.id !== qId);
        localStorage.setItem('kbc_questions', JSON.stringify(mainQuestions));
    }

    logAuditEntry('Admin', "🗑️ Deleted", String(qId));

    if (editingQuestionId === qId) {
        editingQuestionId = null;
        editingIsBaseQuestion = false;
        resetAddQuestionFormLabel();
    }

    updateAdminDashboardStats();
    loadCustomQuestionsList();
}
// ================= QUESTION LIST (base + custom merged) =================

async function loadCustomQuestionsList() {
    const tbody = document.getElementById('custom-question-list-tbody');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#aaa; padding:15px;">লোড হচ্ছে...</td></tr>`;

    const base = await fetchBaseQuestions();
    const overrides = getOverrides();
    const deletedIds = getDeletedIds().map(String);

    let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
    if (!Array.isArray(customQuestions)) customQuestions = [];

    const baseFiltered = base
        .filter(q => !deletedIds.includes(String(q.id)))
        .map(q => overrides[q.id] ? { ...overrides[q.id], id: q.id, isBase: true } : { ...q, isBase: true });

    const customMarked = customQuestions.slice().reverse().map(q => ({ ...q, isBase: false }));

    const allQuestions = [...customMarked, ...baseFiltered];
    window._allQuestionsCache = allQuestions;

    renderQuestionListRows(allQuestions);
}

function renderQuestionListRows(list) {
    const tbody = document.getElementById('custom-question-list-tbody');
    if (!tbody) return;

    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#aaa; padding:15px;">কোনো প্রশ্ন পাওয়া যায়নি</td></tr>`;
        return;
    }

    let html = '';
    list.forEach(q => {
        const qText = (q.bn && q.bn.q) ? q.bn.q : '';
        const preview = qText.length > 50 ? qText.substring(0, 50) + '...' : qText;
        const sourceTag = q.isBase
            ? '<span style="color:#94a3b8; font-size:11px;">(মূল প্রশ্ন)</span>'
            : '<span style="color:#ffd700; font-size:11px;">(এডমিন যোগ করেছে)</span>';
        html += `
            <tr>
                <td>${preview}<br>${sourceTag}</td>
                <td>${q.subject || 'all'}</td>
                <td>${q.level || 'junior'}</td>
                <td>
                    <button class="btn-sm" style="background:#3b82f6; margin-right:6px;" onclick="editCustomQuestion('${q.id}', ${q.isBase})">✏️ Edit</button>
                    <button class="btn-sm btn-block" onclick="deleteCustomQuestion('${q.id}', ${q.isBase})">🗑️ Delete</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function filterQuestionList() {
    const inputElem = document.getElementById('question-search-input');
    const searchVal = inputElem ? inputElem.value.trim().toLowerCase() : '';
    const all = window._allQuestionsCache || [];
    if (!searchVal) {
        renderQuestionListRows(all);
        return;
    }
    const filtered = all.filter(q => {
        const qText = ((q.bn && q.bn.q) || '').toLowerCase();
        return qText.includes(searchVal);
    });
    renderQuestionListRows(filtered);
}

// ================= AUDIT LOG =================

function logAuditEntry(authorName, statusLabel, questionText) {
    const now = new Date();
    const timeFormatted = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

    const logEntry = {
        author: authorName,
        timestamp: timeFormatted,
        status: statusLabel,
        questionSnippet: (questionText || '').length > 45 ? questionText.substring(0, 45) + "..." : (questionText || '')
    };

    let auditLogs = JSON.parse(localStorage.getItem('kbc_admin_audit_log') || '[]');
    if (!Array.isArray(auditLogs)) auditLogs = [];
    auditLogs.unshift(logEntry);
    localStorage.setItem('kbc_admin_audit_log', JSON.stringify(auditLogs));
}

function loadAuditLogs() {
    const logTbody = document.getElementById('audit-log-tbody');
    if (!logTbody) return;

    const auditLogs = JSON.parse(localStorage.getItem('kbc_admin_audit_log') || '[]');

    if (!Array.isArray(auditLogs) || auditLogs.length === 0) {
        logTbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #aaa;">কোনো হিস্ট্রি বা লগ পাওয়া যায়নি</td></tr>`;
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

// ================= PLAYER LIST (with Password view toggle) =================

function loadRealPlayersList() {
    const tableBody = document.getElementById('player-table-body');
    if (!tableBody) return;

    let savedPlayers = getAllStoredPlayers();

    if (savedPlayers.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #aaa;">কোনো প্লেয়ার পাওয়া যায়নি</td></tr>`;
        return;
    }

    let html = '';
    const currentTime = Date.now();

    savedPlayers.forEach((player, idx) => {
        const playerId = player.id || player.phone || player.userId || 'N/A';
        const playerStatus = player.status || (player.isBlocked ? 'Blocked' : 'Active');

        let isLive = false;
        if (player.lastActive && (currentTime - player.lastActive < 30000)) {
            isLive = true;
        }

        const liveBadge = isLive
            ? `<span class="badge badge-active" style="display: inline-flex; align-items: center; gap: 4px; background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 2px 8px; border-radius: 12px; font-size: 11px;"><span style="width: 6px; height: 6px; background: #10b981; border-radius: 50%; display: inline-block;"></span> LIVE</span>`
            : `<span class="badge" style="display: inline-flex; align-items: center; gap: 4px; background: rgba(149, 165, 166, 0.2); color: #95a5a6; padding: 2px 8px; border-radius: 12px; font-size: 11px;"><span style="width: 6px; height: 6px; background: #95a5a6; border-radius: 50%; display: inline-block;"></span> Offline</span>`;

        const playerName = player.name || player.fullName || 'Unknown';
        const playerUsername = player.username || player.id || 'N/A';
        const playerPhone = player.phone || 'N/A';
        const playerScore = player.highScore || player.score || 0;
        const formattedScore = typeof playerScore === 'number' ? '৳ ' + playerScore.toLocaleString() : playerScore;
        const isBlocked = playerStatus === 'Blocked';

        // Password is only available if this player's account was created on THIS
        // same browser (localStorage). Players synced from another device via
        // Google Sheets will show "N/A" here since we do not store passwords
        // in the Sheet for security reasons.
        const playerPass = player.pass || 'N/A';

        html += `
            <tr>
                <td>${playerPhone}</td>
                <td>${playerUsername}</td>
                <td>
                    <span id="pass-hidden-${idx}">••••••</span>
                    <span id="pass-visible-${idx}" style="display:none;">${playerPass}</span>
                    <button class="btn-sm" style="background:#334155; padding:2px 8px;" onclick="togglePasswordView(${idx})">👁️</button>
                </td>
                <td>
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                        <span>${playerName}</span>
                        ${liveBadge}
                    </div>
                </td>
                <td>${formattedScore}</td>
                <td><span class="badge ${isBlocked ? 'badge-blocked' : 'badge-active'}">${playerStatus}</span></td>
                <td>
                    <button class="btn-sm btn-block" onclick="toggleBlockPlayer('${playerId}')" style="background: ${isBlocked ? '#10b981' : '#ef4444'}; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 6px; font-weight: bold; margin-right: 6px;">
                        ${isBlocked ? 'Unblock 🔓' : 'Block 🚫'}
                    </button>
                    <button class="btn-sm" onclick="deletePlayerPermanently('${playerId}')" style="background: #7f1d1d; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 6px; font-weight: bold;">
                        🗑️ Remove
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

function togglePasswordView(idx) {
    const hiddenElem = document.getElementById('pass-hidden-' + idx);
    const visibleElem = document.getElementById('pass-visible-' + idx);
    if (!hiddenElem || !visibleElem) return;

    if (visibleElem.style.display === 'none') {
        visibleElem.style.display = 'inline';
        hiddenElem.style.display = 'none';
    } else {
        visibleElem.style.display = 'none';
        hiddenElem.style.display = 'inline';
    }
}

function toggleBlockPlayer(playerId) {
    let savedPlayers = getAllStoredPlayers();
    savedPlayers = savedPlayers.map(player => {
        if (player.id === playerId || player.phone === playerId || player.userId === playerId) {
            player.isBlocked = !player.isBlocked;
            player.status = player.isBlocked ? 'Blocked' : 'Active';
        }
        return player;
    });
    savePlayersList(savedPlayers);
    loadRealPlayersList();
    updateAdminDashboardStats();
}

function deletePlayerPermanently(playerId) {
    if (!confirm("আপনি কি নিশ্চিত এই প্লেয়ারকে স্থায়ীভাবে মুছে ফেলতে চান? এই কাজটি ফেরানো যাবে না।")) {
        return;
    }
    let savedPlayers = getAllStoredPlayers();
    savedPlayers = savedPlayers.filter(player =>
        player.id !== playerId && player.phone !== playerId && player.userId !== playerId
    );
    savePlayersList(savedPlayers);
    loadRealPlayersList();
    updateAdminDashboardStats();
}

// ================= DASHBOARD STATS =================

function updateAdminDashboardStats() {
    let savedPlayers = getAllStoredPlayers();
    const currentTime = Date.now();

    const totalPlayersElem = document.getElementById('total-players');
    if (totalPlayersElem) totalPlayersElem.innerText = savedPlayers.length;

    const activeSessionsElem = document.getElementById('active-sessions');
    if (activeSessionsElem) {
        const activeCount = savedPlayers.filter(p =>
            !p.isBlocked && p.status !== 'Blocked' && (p.lastActive && (currentTime - p.lastActive < 30000))
        ).length;
        activeSessionsElem.innerText = activeCount;
    }

    const totalQuestionsElem = document.getElementById('total-questions');
    if (totalQuestionsElem) {
        (async () => {
            const base = await fetchBaseQuestions();
            const deletedIds = getDeletedIds().map(String);
            const baseCount = base.filter(q => !deletedIds.includes(String(q.id))).length;

            let customQuestions = [];
            try {
                customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
                if (!Array.isArray(customQuestions)) customQuestions = [];
            } catch (e) {
                customQuestions = [];
            }
            totalQuestionsElem.innerText = baseCount + customQuestions.length;
        })();
    }
}

// ================= TAB SWITCH HOOK =================

const originalSwitchTab = window.switchTab;
window.switchTab = function(tabName, element) {
    if (typeof originalSwitchTab === 'function') {
        originalSwitchTab(tabName, element);
    }
    if (tabName === 'dashboard') {
        updateAdminDashboardStats();
    } else if (tabName === 'players') {
        loadRealPlayersList();
    } else if (tabName === 'add-question') {
        loadCustomQuestionsList();
    }
};

// ================= INIT =================

window.addEventListener('DOMContentLoaded', () => {
    loadRealPlayersList();
    updateAdminDashboardStats();
    loadCustomQuestionsList();
});
