        // --- ENHANCED GAME LOGIC ---
        let curLang = 'bn';
        let curIdx = 0;
        let score = 0, cor = 0, wr = 0;
        let timerVal = 30;
        let timerInt;
        let activeQuestions = [];
        let canAnswer = false;
        let voiceEnabled = false;
        let recognition;

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
                    console.log('Recognition already started');
                }
            }
        }

        function processVoiceCommand(cmd) {
            if (!canAnswer) return;
            
            // Map voice commands to option indices
            const mappings = {
                'a': 0, 'এ': 0, 'one': 0, 'প্রথম': 0,
                'b': 1, 'বি': 1, 'two': 1, 'দ্বিতীয়': 1,
                'c': 2, 'সি': 2, 'three': 2, 'তৃতীয়': 2,
                'd': 3, 'ডি': 3, 'four': 3, 'চতুর্থ': 3
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

        function start(l) {
            curLang = l;
            curIdx = 0; score = 0; cor = 0; wr = 0;
            // Shuffle all 200 questions
            activeQuestions = [...bank].sort(() => Math.random() - 0.5);
            show('scr-game');
            
            const bg = document.getElementById('bg-music');
            bg.volume = 0.3; 
            bg.play().catch(e => console.log("Audio play blocked until click"));
            
            if (voiceEnabled) initVoice();
            loadQ();
        }

        function loadQ() {
            clearInterval(timerInt);
            if(curIdx >= 200) return end();
            
            canAnswer = true;
            const q = activeQuestions[curIdx];
            
            // Update difficulty badge based on question number
            const diffBadge = document.getElementById('diff-badge');
            if (curIdx < 50) {
                diffBadge.innerText = 'STANDARD';
                diffBadge.style.background = '#00ff88';
                timerVal = 30;
            } else if (curIdx < 150) {
                diffBadge.innerText = 'ADVANCED';
                diffBadge.style.background = '#ffbf00';
                timerVal = 20;
            } else {
                diffBadge.innerText = 'EXPERT';
                diffBadge.style.background = '#ff3333';
                timerVal = 15;
            }
            
            document.getElementById('st-count').innerText = `Q: ${curIdx+1}/200`;
            document.getElementById('st-score').innerText = `SCORE: ${score}`;
            
            const txt = (curLang === 'bn') ? q.qb : q.qe;
            const opts = (curLang === 'bn') ? q.ab : q.ae;
            
            document.getElementById('q-text').innerText = txt;
            const container = document.getElementById('opt-container');
            container.innerHTML = '';
            
            opts.forEach((o, i) => {
                const div = document.createElement('div');
                div.className = 'option';
                div.innerHTML = `<strong>${String.fromCharCode(65+i)}:</strong> ${o}`;
                div.onclick = () => check(i);
                container.appendChild(div);
            });

            document.getElementById('timer').innerText = timerVal;
            document.getElementById('timer').classList.remove('critical');
            
            timerInt = setInterval(() => {
                timerVal--;
                document.getElementById('timer').innerText = timerVal;
                
                // Critical timer effect
                if (timerVal <= 5) {
                    document.getElementById('timer').classList.add('critical');
                    playSound('tick');
                }
                
                if(timerVal <= 0) {
                    clearInterval(timerInt);
                    check(-1); // Timeout case
                }
            }, 1000);

            speak(txt);
            if (voiceEnabled) setTimeout(startListening, 1500);
        }

        function check(idx) {
            if(!canAnswer) return;
            canAnswer = false;
            clearInterval(timerInt);
            
            const q = activeQuestions[curIdx];
            const opts = document.querySelectorAll('.option');
            
            if(idx === q.ans) {
                // Progressive scoring system
                let points = 10;
                if (curIdx >= 50) points = 15;
                if (curIdx >= 150) points = 25;
                
                score += points;
                cor++;
                playSound('cor');
                if(idx !== -1) opts[idx].classList.add('correct');
            } else {
                wr++;
                playSound('wr');
                if(idx !== -1) opts[idx].classList.add('wrong');
                // Always show correct answer
                if(opts[q.ans]) opts[q.ans].classList.add('correct');
            }

            const explanation = curLang === "bn" ? (q.expb || "ব্যাখ্যা উপলব্ধ নেই।") : (q.expe || "Explanation not available.");
            const box = document.getElementById("exp-box");
            box.style.display = "block";
            box.innerHTML = "<b>" + (curLang=="bn" ? "ব্যাখ্যা" : "Explanation") + ":</b><br>" + explanation;

            setTimeout(() => {
                box.style.display = "none";
                curIdx++;
                loadQ();
            }, 4000);
        }

        function playSound(type) {
            const sounds = {
                'cor': document.getElementById('snd-cor'),
                'wr': document.getElementById('snd-wr'),
                'tick': document.getElementById('snd-tick'),
                'alert': document.getElementById('snd-alert')
            };
            if (sounds[type]) {
                sounds[type].currentTime = 0;
                sounds[type].play().catch(e => {});
            }
        }

        function speak(t) {
            if (!window.speechSynthesis) return;
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
            document.getElementById('bg-music').pause();
            window.speechSynthesis.cancel();
            if (recognition) recognition.stop();
        }

        function show(id) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
        }

        // Anti-Cheat: Resets game if user switches tabs
        document.addEventListener('visibilitychange', () => {
            if(document.hidden && curIdx > 0 && curIdx < 200) {
                document.body.classList.add('blur');
                alert("GAME ABORTED DUE TO TAB SWITCHING (CHEATING PREVENTION).");
                location.reload();
            }
        });
        
        // Initialize voice on load
        window.onload = () => {
            initVoice();
        };
