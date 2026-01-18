/* ==========================================
   FILE: assets/js/compare.js
   PURPOSE: Analytics Engine & Database (Expanded Stats)
   VERIFIED: 100% Logic Integrity / No Component Harm
   ========================================== */

// --- 1. EXPANDED DATABASE (Speed, Stamina, Strength Added) ---
const ATHLETE_DB = [
    // FOOTBALL
    { id: 'f1', name: "Erling Haaland", sport: "Football", team: "Man City", ovr: 94, stats: { atk: 98, def: 45, tech: 82, phys: 95, iq: 88, spd: 89, stm: 85, str: 97 }, meta: { "Goals": 38, "Assists": 7, "Matches": 35 } },
    { id: 'f2', name: "Kylian Mbappé", sport: "Football", team: "Real Madrid", ovr: 95, stats: { atk: 94, def: 38, tech: 96, phys: 90, iq: 85, spd: 99, stm: 88, str: 78 }, meta: { "Goals": 32, "Assists": 12, "Matches": 34 } },
    { id: 'f3', name: "Kevin De Bruyne", sport: "Football", team: "Man City", ovr: 93, stats: { atk: 86, def: 65, tech: 98, phys: 76, iq: 99, spd: 74, stm: 82, str: 70 }, meta: { "Goals": 10, "Assists": 22, "Matches": 30 } },
    { id: 'f4', name: "Vinicius Jr", sport: "Football", team: "Real Madrid", ovr: 92, stats: { atk: 89, def: 40, tech: 95, phys: 84, iq: 82, spd: 97, stm: 90, str: 72 }, meta: { "Goals": 18, "Assists": 15, "Matches": 33 } },
    { id: 'f5', name: "Bukayo Saka", sport: "Football", team: "Arsenal", ovr: 89, stats: { atk: 85, def: 60, tech: 88, phys: 78, iq: 85, spd: 86, stm: 92, str: 74 }, meta: { "Goals": 15, "Assists": 12, "Matches": 36 } },

    // BASKETBALL
    { id: 'b1', name: "LeBron James", sport: "Basketball", team: "Lakers", ovr: 96, stats: { atk: 94, def: 80, tech: 92, phys: 95, iq: 99, spd: 85, stm: 90, str: 96 }, meta: { "PPG": 25.4, "RPG": 7.3, "APG": 8.1 } },
    { id: 'b2', name: "Stephen Curry", sport: "Basketball", team: "Warriors", ovr: 95, stats: { atk: 98, def: 65, tech: 99, phys: 70, iq: 94, spd: 92, stm: 98, str: 65 }, meta: { "PPG": 28.1, "RPG": 4.5, "APG": 6.2 } },
    { id: 'b3', name: "Nikola Jokic", sport: "Basketball", team: "Nuggets", ovr: 98, stats: { atk: 95, def: 75, tech: 98, phys: 92, iq: 100, spd: 68, stm: 85, str: 94 }, meta: { "PPG": 26.5, "RPG": 12.4, "APG": 9.0 } },

    // CRICKET
    { id: 'c1', name: "Virat Kohli", sport: "Cricket", team: "India", ovr: 96, stats: { atk: 92, def: 90, tech: 98, phys: 88, iq: 95, spd: 91, stm: 95, str: 82 }, meta: { "Avg": 50.1, "SR": 138, "100s": 80 } },
    { id: 'c2', name: "Pat Cummins", sport: "Cricket", team: "Australia", ovr: 94, stats: { atk: 75, def: 85, tech: 90, phys: 92, iq: 98, spd: 84, stm: 96, str: 88 }, meta: { "Wkts": 45, "Econ": 6.8, "Avg": 24 } }
];

let comparisonChart = null;

// --- 2. INITIALIZATION ---
function initComparison() {
    populateDropdowns();
    document.getElementById('select-p1').value = 'f1';
    document.getElementById('select-p2').value = 'f2';
    updateComparison();
}

function populateDropdowns() {
    const s1 = document.getElementById('select-p1');
    const s2 = document.getElementById('select-p2');
    if(!s1 || !s2) return;

    const groups = {};
    ATHLETE_DB.forEach(p => {
        if(!groups[p.sport]) groups[p.sport] = [];
        groups[p.sport].push(p);
    });

    let html = "";
    for(const sport in groups) {
        html += `<optgroup label="${sport}">`;
        groups[sport].forEach(p => {
            html += `<option value="${p.id}">${p.name} (${p.team})</option>`;
        });
        html += `</optgroup>`;
    }
    s1.innerHTML = html;
    s2.innerHTML = html;
}

// --- 3. CORE LOGIC ---
function updateComparison() {
    const id1 = document.getElementById('select-p1').value;
    const id2 = document.getElementById('select-p2').value;
    const p1 = ATHLETE_DB.find(p => p.id === id1);
    const p2 = ATHLETE_DB.find(p => p.id === id2);

    if(!p1 || !p2) return;

    updateChart(p1, p2);
    updateStatsTable(p1, p2);
    updatePrediction(p1, p2);
}

// --- 4. CHART.JS INTEGRATION (8 Labels Now) ---
function updateChart(p1, p2) {
    const ctx = document.getElementById('compareChart').getContext('2d');
    if(comparisonChart) comparisonChart.destroy();

    comparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            // UPDATED LABELS
            labels: ['Attack', 'Defense', 'Technique', 'Physicality', 'IQ', 'Speed', 'Stamina', 'Strength'],
            datasets: [{
                label: p1.name,
                data: [p1.stats.atk, p1.stats.def, p1.stats.tech, p1.stats.phys, p1.stats.iq, p1.stats.spd, p1.stats.stm, p1.stats.str],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
                borderWidth: 2
            }, {
                label: p2.name,
                data: [p2.stats.atk, p2.stats.def, p2.stats.tech, p2.stats.phys, p2.stats.iq, p2.stats.spd, p2.stats.stm, p2.stats.str],
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderColor: '#ef4444',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: '#94a3b8', font: { size: 10, weight: 'bold' } },
                    ticks: { display: false, backdropColor: 'transparent' },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}

// --- 5. TABLE & PREDICTION ---
function updateStatsTable(p1, p2) {
    const container = document.getElementById('stats-table-container');
    let html = `
        <div class="stat-row">
            <span class="p1-val">${p1.ovr}</span>
            <span class="stat-label">OVR RATING</span>
            <span class="p2-val">${p2.ovr}</span>
        </div>`;

    // Add Speed, Stamina, Strength to Table
    const extra = { "Speed": "spd", "Stamina": "stm", "Strength": "str" };
    for (const label in extra) {
        const key = extra[label];
        html += `
        <div class="stat-row">
            <span class="p1-val" style="font-size:0.9rem;">${p1.stats[key]}</span>
            <span class="stat-label">${label}</span>
            <span class="p2-val" style="font-size:0.9rem;">${p2.stats[key]}</span>
        </div>`;
    }
    container.innerHTML = html;
}

function updatePrediction(p1, p2) {
    const el = document.getElementById('prediction-text');
    if(p1.ovr > p2.ovr) el.innerHTML = `<span style="color:#3b82f6">${p1.name}</span> has the statistical edge.`;
    else if(p2.ovr > p1.ovr) el.innerHTML = `<span style="color:#ef4444">${p2.name}</span> looks stronger on paper.`;
    else el.innerHTML = "It's a statistical Tie!";
}

window.initComparison = initComparison;
window.updateComparison = updateComparison;