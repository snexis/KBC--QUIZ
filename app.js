// ==========================================
// SEARCH & REPLACE - KBC Timing Gap & Voice Option Speech Fix
// ==========================================

// Code to Find (Existing Code):
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
}

// Code to Replace With (New Code):
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
