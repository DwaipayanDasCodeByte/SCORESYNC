/**
 * LIVE CENTER & STATISTICS
 */

const TEAM_DETAILS = {
    'Man City': [ { name: "Kevin De Bruyne", pos: "MID", rating: 9.1 }, { name: "Erling Haaland", pos: "FWD", rating: 9.2 }, { name: "Rodri", pos: "MID", rating: 8.9 }, { name: "Ederson", pos: "GK", rating: 8.6 } ],
    'Arsenal': [ { name: "Bukayo Saka", pos: "FWD", rating: 8.8 }, { name: "Martin Odegaard", pos: "MID", rating: 8.7 }, { name: "Declan Rice", pos: "MID", rating: 8.6 }, { name: "David Raya", pos: "GK", rating: 8.3 } ],
    'Real Madrid': [ { name: "Kylian Mbappé", pos: "FWD", rating: 9.3 }, { name: "Vinícius Júnior", pos: "FWD", rating: 9.0 }, { name: "Jude Bellingham", pos: "MID", rating: 8.9 }, { name: "Thibaut Courtois", pos: "GK", rating: 8.8 } ],
    'Barcelona': [ { name: "Robert Lewandowski", pos: "FWD", rating: 8.7 }, { name: "Lamine Yamal", pos: "FWD", rating: 8.6 }, { name: "Pedri", pos: "MID", rating: 8.5 }, { name: "Ter Stegen", pos: "GK", rating: 8.5 } ],
    'Inter Milan': [ { name: "Lautaro Martínez", pos: "FWD", rating: 8.9 }, { name: "Nicolò Barella", pos: "MID", rating: 8.7 }, { name: "Yann Sommer", pos: "GK", rating: 8.4 } ],
    'Celtics': [ { name: "Jayson Tatum", pos: "F", rating: 9.1 }, { name: "Jaylen Brown", pos: "G", rating: 8.9 }, { name: "Kristaps Porzingis", pos: "C", rating: 8.6 } ],
    'Lakers': [ { name: "LeBron James", pos: "F", rating: 8.9 }, { name: "Anthony Davis", pos: "F/C", rating: 9.0 } ]
};

function initMomentumAnimation() {
    const footballPath = document.getElementById('momentumPathFootball');
    const basketballPath = document.getElementById('momentumPathBasketball');
    const cricketPath = document.getElementById('momentumPathCricket');
    
    let phase = 0;
    function animate() {
        phase += 0.02;
        
        if(footballPath) {
            const domFootball = Math.sin(phase * 0.4) * 35; 
            footballPath.setAttribute('d', generateWavePath(phase, domFootball));
        }
        if(basketballPath) {
            const domBasketball = Math.sin(phase * 0.8) * 50; 
            basketballPath.setAttribute('d', generateWavePath(phase * 1.5, domBasketball));
        }
        if(cricketPath) {
            const domCricket = Math.sin(phase * 0.2) * 25; 
            cricketPath.setAttribute('d', generateWavePath(phase * 0.5, domCricket));
        }
        // Simulated Stats Updates are triggered by app.js interval
        requestAnimationFrame(animate);
    }
    animate();
}

function generateWavePath(phase, dominance) {
    const points = 8;
    let d = "M0,100 ";
    for(let i=0; i<=points; i++) {
        const x = (i / points) * 800;
        const wave = Math.sin(phase + i * 0.8) * 15;
        const y = 100 + dominance + wave;
        if(i === 0) d += `L${x},${y} `;
        else d += `Q${x - 50},${y} ${x},${y} `;
    }
    d += "L800,200 L0,200 Z";
    return d;
}

function updateSimulatedLiveStats() {
    const fPoss = 48 + Math.floor(Math.random() * 8);
    if(document.getElementById('f-poss-a')) document.getElementById('f-poss-a').innerText = fPoss + '%';
    
    const bAcc = (44 + Math.random() * 6).toFixed(1);
    if(document.getElementById('b-acc')) document.getElementById('b-acc').innerText = bAcc + '%';
    
    const cRR = (7.5 + Math.random() * 2).toFixed(2);
    if(document.getElementById('c-rr')) document.getElementById('c-rr').innerText = cRR;
}

function showTeamDetails(teamName, category) {
    const modal = document.getElementById('teamDetailsModal');
    const rosterList = document.getElementById('rosterList');
    document.getElementById('modalTeamName').innerText = teamName;
    document.getElementById('modalTeamCategory').innerText = category;
    
    const players = TEAM_DETAILS[teamName] || generateMockRoster(teamName);
    
    rosterList.innerHTML = players.map(p => {
        let color = 'var(--rating-red)';
        const rating = parseFloat(p.rating);
        if(rating >= 8.5) color = 'var(--rating-green)';
        else if(rating >= 7.0) color = 'var(--rating-yellow)';
        else if(rating >= 5.0) color = 'var(--rating-orange)';
        
        return `
            <div class="player-row">
                <div class="player-name">
                    ${p.name}
                    <span class="player-pos">${p.pos}</span>
                </div>
                <div class="rating-badge" style="background:${color}">${rating.toFixed(1)}</div>
            </div>
        `;
    }).join('');

    modal.style.display = 'flex';
}

function closeTeamDetails(e) {
    if(e.target.id === 'teamDetailsModal') {
        document.getElementById('teamDetailsModal').style.display = 'none';
    }
}

function generateMockRoster(name) {
    const positions = ["FWD", "MID", "DEF", "GK", "Regular", "Core"];
    const roster = [];
    for (let i = 0; i < 11; i++) {
        roster.push({
            name: `Player ${String.fromCharCode(65 + i)}`,
            pos: positions[Math.floor(Math.random() * positions.length)],
            rating: (Math.random() * (9.5 - 3.5) + 3.5).toFixed(1)
        });
    }
    return roster;
}