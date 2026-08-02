// Admin Add Question Functionality
function addNewQuestionFromAdmin() {
    const lang = document.getElementById('admin-q-lang').value;
    const subj = document.getElementById('admin-q-subj').value;
    const level = document.getElementById('admin-q-level').value;
    const qText = document.getElementById('admin-q-text').value.trim();
    
    const optA = document.getElementById('admin-opt-a').value.trim();
    const optB = document.getElementById('admin-opt-b').value.trim();
    const optC = document.getElementById('admin-opt-c').value.trim();
    const optD = document.getElementById('admin-opt-d').value.trim();
    const correct = document.getElementById('admin-correct-opt').value;

    if (!qText || !optA || !optB || !optC || !optD) {
        alert("দয়া করে প্রশ্ন এবং ৪টি অপশন সঠিকভাবে পূরণ করুন!");
        return;
    }

    // Question Object Structure
    const newQ = {
        id: "custom_" + Date.now(),
        subject: subj,
        level: level,
        correct: correct,
        bn: (lang === 'bn') ? { q: qText, a: optA, b: optB, c: optC, d: optD } : null,
        en: (lang === 'en') ? { q: qText, a: optA, b: optB, c: optC, d: optD } : null
    };

    // Save Custom Questions to LocalStorage
    let customQuestions = JSON.parse(localStorage.getItem('kbc_custom_questions') || '[]');
    customQuestions.push(newQ);
    localStorage.setItem('kbc_custom_questions', JSON.stringify(customQuestions));

    alert("প্রশ্ন সফলভাবে সেভ হয়েছে! গেমে নতুন প্রশ্ন যুক্ত হয়ে গেছে।");

    // Clear Form Fields
    document.getElementById('admin-q-text').value = '';
    document.getElementById('admin-opt-a').value = '';
    document.getElementById('admin-opt-b').value = '';
    document.getElementById('admin-opt-c').value = '';
    document.getElementById('admin-opt-d').value = '';
}

// Function to Load Real Players List (Will be integrated with Cloud Backend in Step 3)
function loadRealPlayersList() {
    const tableBody = document.getElementById('player-table-body');
    const savedPlayers = JSON.parse(localStorage.getItem('kbc_real_players') || '[]');

    if (!tableBody) return;

    if (savedPlayers.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #aaa;">কোনো প্লেয়ার পাওয়া যায়নি</td>
            </tr>
        `;
        return;
    }

    let html = '';
    savedPlayers.forEach(player => {
        html += `
            <tr>
                <td>${player.phone || player.id}</td>
                <td>${player.name}</td>
                <td>${player.highScore || 0} Points</td>
                <td><span style="color: ${player.status === 'Blocked' ? '#e74c3c' : '#2ecc71'};">${player.status || 'Active'}</span></td>
                <td>
                    <button class="btn-action" onclick="toggleBlockPlayer('${player.id}')" style="background: ${player.status === 'Blocked' ? '#27ae60' : '#e74c3c'}; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">
                        ${player.status === 'Blocked' ? 'Unblock' : 'Block'}
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

// Window load trigger
window.addEventListener('DOMContentLoaded', () => {
    loadRealPlayersList();
});
