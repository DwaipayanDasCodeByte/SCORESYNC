/**
 * FAN ZONE & GAMIFICATION
 */

const POLL_DATA = [
    { id: 1, question: "Who will win El Clásico?", options: ["Real Madrid", "Barcelona", "Draw"], votes: [1240, 980, 450] },
    { id: 2, question: "MVP of tonight's Lakers Game?", options: ["LeBron James", "Anthony Davis", "Other"], votes: [2100, 1500, 300] }
];

const PREDICTION_DATA = [
    { id: 1, match: "India vs Pakistan", sport: "Cricket", points: 250 },
    { id: 2, match: "Man Utd vs Liverpool", sport: "Football", points: 150 }
];

const LEADERBOARD = [
    { user: "GoalMaster99", points: 4250 },
    { user: "HoopsFanatic", points: 3800 },
    { user: "NadalKing", points: 3100 },
    { user: "PacerForce", points: 2950 },
    { user: "CricketLover", points: 2400 }
];

// --- NEW DATA FOR TRIVIA & JACKPOT ---
const TRIVIA_DATA = {
    question: "Which country won the first ever FIFA World Cup in 1930?",
    options: ["Brazil", "Uruguay", "Italy", "Argentina"],
    correctIndex: 1 // Uruguay
};

const JACKPOT_DATA = {
    match: "Man City vs Arsenal",
    sport: "Premier League",
    jackpot: "10,000",
    timer: "12:45:00"
};
// -------------------------------------

function renderFanZone() {
    const pollsCont = document.getElementById('pollsContainer');
    const predCont = document.getElementById('predictionsContainer');
    const lbTable = document.getElementById('leaderboardTable');

    // --- EXISTING POLL RENDER LOGIC ---
    if(pollsCont) {
        pollsCont.innerHTML = POLL_DATA.map(p => {
            const totalVotes = p.votes.reduce((a, b) => a + b, 0);
            return `
            <div class="poll-card">
                <div class="poll-question">${p.question}</div>
                <div class="poll-options">
                    ${p.options.map((opt, i) => {
                        const pct = Math.round((p.votes[i] / totalVotes) * 100);
                        return `
                        <div class="poll-option" onclick="castVote(this, ${p.id}, ${i})">
                            <div class="poll-bar" data-pct="${pct}"></div>
                            <div class="poll-label">
                                <span>${opt}</span>
                                <span class="pct-val" style="display:none;">${pct}%</span>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>`;
        }).join('');
    }

    // --- EXISTING PREDICTION RENDER LOGIC ---
    if(predCont) {
        predCont.innerHTML = PREDICTION_DATA.map(p => `
            <div class="prediction-item">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.7rem; font-weight:800; color:var(--text-secondary); text-transform:uppercase;">${p.sport}</span>
                    <span class="points-badge">+${p.points} Points</span>
                </div>
                <div class="prediction-teams">
                    <span>${p.match.split(' vs ')[0]}</span>
                    <input type="text" class="pred-input" placeholder="0">
                    <span>-</span>
                    <input type="text" class="pred-input" placeholder="0">
                    <span>${p.match.split(' vs ')[1]}</span>
                </div>
                <button class="btn-primary full-width" onclick="submitPrediction(this, ${p.points})">Lock Prediction</button>
            </div>
        `).join('');
    }

    // --- EXISTING LEADERBOARD RENDER LOGIC ---
    if(lbTable) {
        lbTable.innerHTML = `
            <tr><td><b>Rank</b></td><td><b>User</b></td><td class="points"><b>Points</b></td></tr>
            ${LEADERBOARD.map((l, i) => `
            <tr>
                <td style="color:var(--accent); font-weight:800;">#${i+1}</td>
                <td>${l.user}</td>
                <td class="points">${l.points.toLocaleString()}</td>
            </tr>`).join('')}`;
    }

    // --- NEW: CALL RENDER FUNCTIONS FOR TRIVIA & JACKPOT ---
    renderDailyTrivia();
    renderSuperJackpot();
}

// --- EXISTING INTERACTION FUNCTIONS ---

function castVote(el, pollId, optIdx) {
    if(!isLoggedIn) return showMessage("Login to vote!");
    const card = el.closest('.poll-card');
    card.querySelectorAll('.poll-option').forEach(o => o.classList.add('voted'));
    card.querySelectorAll('.poll-bar').forEach(b => {
        b.style.width = b.dataset.pct + '%';
    });
    card.querySelectorAll('.pct-val').forEach(v => v.style.display = 'block');
    
    userProfile.fanPoints += 10;
    if(typeof updatePointsUI === 'function') updatePointsUI();
    showMessage("Vote cast! +10 Fan Points");
}

function submitPrediction(btn, points) {
    if(!isLoggedIn) return window.appShowView('login');
    btn.innerText = "Prediction Locked";
    btn.disabled = true;
    btn.style.opacity = "0.5";
    showMessage(`Prediction saved! You will earn ${points} points if correct.`);
}

// --- NEW LOGIC: TRIVIA & JACKPOT ---

function renderDailyTrivia() {
    const container = document.getElementById('dailyTriviaContainer');
    if(!container) return;

    container.innerHTML = `
        <div style="margin-bottom:10px; font-weight:600; font-size:0.85rem;">${TRIVIA_DATA.question}</div>
        <div style="display:grid; gap:8px;">
            ${TRIVIA_DATA.options.map((opt, i) => `
                <button class="trivia-btn" onclick="submitTriviaAnswer(this, ${i})" 
                style="padding:8px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; cursor:pointer; text-align:left; font-size:0.8rem; transition:0.2s;">
                    ${opt}
                </button>
            `).join('')}
        </div>
    `;
}

function submitTriviaAnswer(btn, index) {
    if(!isLoggedIn) return showMessage("Login to play trivia!");
    
    // Disable all buttons
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('button');
    buttons.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });

    if(index === TRIVIA_DATA.correctIndex) {
        btn.style.background = '#4ade80'; // Green
        btn.style.color = '#000';
        btn.style.opacity = '1';
        
        userProfile.fanPoints += 50;
        if(typeof updatePointsUI === 'function') updatePointsUI();
        showMessage("Correct! +50 Fan Points");
    } else {
        btn.style.background = '#ef4444'; // Red
        buttons[TRIVIA_DATA.correctIndex].style.background = '#4ade80'; // Show correct one
        buttons[TRIVIA_DATA.correctIndex].style.color = '#000';
        buttons[TRIVIA_DATA.correctIndex].style.opacity = '1';
        showMessage("Wrong answer! Try again tomorrow.");
    }
}

function renderSuperJackpot() {
    const container = document.getElementById('superJackpotContainer');
    if(!container) return;

    container.innerHTML = `
        <div style="background: linear-gradient(135deg, #fbbf24, #d97706); border-radius:12px; padding:20px; color:#000; position:relative; overflow:hidden; box-shadow: 0 10px 30px rgba(251, 191, 36, 0.2);">
            <div style="position:relative; z-index:2;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Super Jackpot</div>
                        <h2 style="margin:0; font-size:1.8rem; font-weight:900;">${JACKPOT_DATA.jackpot} PTS</h2>
                    </div>
                    <div style="background:rgba(0,0,0,0.1); padding:5px 10px; border-radius:20px; font-weight:700; font-size:0.8rem;">
                        ⏳ ${JACKPOT_DATA.timer} Left
                    </div>
                </div>
                
                <div style="margin-top:20px; background:rgba(255,255,255,0.2); padding:15px; border-radius:10px; backdrop-filter:blur(5px);">
                    <div style="text-align:center; font-weight:800; margin-bottom:10px; font-size:1.1rem;">${JACKPOT_DATA.match}</div>
                    <div style="display:flex; gap:10px; justify-content:center;">
                        <input type="number" id="jp-score-1" placeholder="0" style="width:50px; padding:10px; border:none; border-radius:8px; text-align:center; font-weight:bold; font-size:1.2rem;">
                        <span style="align-self:center; font-weight:bold;">-</span>
                        <input type="number" id="jp-score-2" placeholder="0" style="width:50px; padding:10px; border:none; border-radius:8px; text-align:center; font-weight:bold; font-size:1.2rem;">
                    </div>
                    <button onclick="submitJackpot(this)" style="width:100%; margin-top:15px; padding:12px; background:#000; color:#fbbf24; border:none; border-radius:8px; font-weight:800; cursor:pointer;">
                        ENTER TO WIN
                    </button>
                </div>
            </div>
        </div>
    `;
}

function submitJackpot(btn) {
    if(!isLoggedIn) return window.appShowView('login');
    
    const s1 = document.getElementById('jp-score-1').value;
    const s2 = document.getElementById('jp-score-2').value;

    if(s1 === '' || s2 === '') return showMessage("Please enter a score for both teams.");

    btn.innerHTML = "ENTRY CONFIRMED ✓";
    btn.disabled = true;
    btn.style.opacity = "0.8";
    
    showMessage("Jackpot Entry Locked! Good luck.");
}