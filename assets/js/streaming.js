/**
 * STREAMING MODULE
 */

const STREAM_DATA = [
    { id: 101, match: 'Real Madrid vs Barcelona', sport: 'Football', type: 'Premium', price: '$9.99', thumb: 'assets/image/rma.jpg' },
    { id: 102, match: 'Lakers vs Celtics', sport: 'Basketball', type: 'Free', price: 'Free', thumb: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800' },
    { id: 103, match: 'Djokovic vs Alcaraz', sport: 'Tennis', type: 'Premium', price: '$4.99', thumb: 'assets/image/badminton.jpg' },
    { id: 104, match: 'India vs Pakistan', sport: 'Cricket', type: 'Premium', price: '$14.99', thumb: 'assets/image/cricket.jpg' },
    { id: 105, match: 'Monaco Grand Prix', sport: 'F1', type: 'Premium', price: '$12.99', thumb: 'assets/image/monaco.jpg' },
    { id: 106, match: 'Man City vs Arsenal', sport: 'Football', type: 'Free', price: 'Free', thumb: 'assets/image/arsenal.jpg' }
];

let activeStreamPayment = 'upi';
let activeStreamMatch = null;
let streamDiscountApplied = 0;

function renderStreams() {
    const grid = document.getElementById('streamGrid');
    if(!grid) return;
    grid.innerHTML = STREAM_DATA.map(s => `
        <div class="stream-card">
            <div class="stream-thumb" style="background-image:url('${s.thumb}')">
                <div class="stream-badge ${s.type === 'Free' ? 'badge-free' : 'badge-premium'}">${s.type}</div>
                <div class="stream-overlay">
                    <div class="play-btn" onclick="startWatch('${s.match}', '${s.type}', '${s.price}')">▶</div>
                </div>
            </div>
            <div class="stream-info">
                <div class="stream-match">${s.match}</div>
                <div class="stream-meta">
                    <span>${s.sport}</span>
                    <span style="font-weight:700; color:${s.type==='Free'?'var(--accent)':'var(--premium-gold)'}">${s.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function startWatch(match, type, price) {
    if(!isLoggedIn) {
        showMessage("Please login to watch live streams");
        window.appShowView('login');
        return;
    }
    if(type === 'Premium') {
        showStreamPaymentModal(match, price);
    } else {
        showMessage(`Enjoy the free stream of ${match}!`);
    }
}

function showStreamPaymentModal(match, price) {
    activeStreamMatch = match;
    streamDiscountApplied = 0;
    
    document.getElementById('streamModalTitle').innerText = match;
    const priceEl = document.getElementById('streamModalPrice');
    if(priceEl) {
        priceEl.innerText = `Price: ${price}`;
        priceEl.style.textDecoration = 'none';
    }
    
    const redUI = document.getElementById('streamRedemptionUI');
    if(userProfile.fanPoints >= 200) {
        redUI.style.display = 'flex';
        document.getElementById('streamFanPointsText').innerText = `${userProfile.fanPoints} Fan Points`;
    } else {
        redUI.style.display = 'none';
    }

    document.getElementById('streamPaymentModal').style.display = 'flex';
    const defaultMethod = document.getElementById('m-stream-upi');
    if(defaultMethod) selectStreamPayment('upi', defaultMethod);
}

function selectStreamPayment(method, el) {
    document.querySelectorAll('#streamPaymentModal .method-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    activeStreamPayment = method;

    document.querySelectorAll('#streamPaymentModal .payment-form').forEach(f => f.classList.remove('active'));
    const targetForm = document.getElementById(`stream-form-${method}`);
    if(targetForm) targetForm.classList.add('active');
}

function confirmStreamPayment() {
    document.getElementById('streamPaymentModal').style.display = 'none';
    document.getElementById('loadingOverlay').style.display = 'flex';
    
    setTimeout(() => {
        if(streamDiscountApplied > 0) {
            userProfile.fanPoints -= 200;
            if(typeof updatePointsUI === 'function') updatePointsUI();
        }
        document.getElementById('loadingOverlay').style.display = 'none';
        showMessage(`Payment Success! Streaming access granted for ${activeStreamMatch}.`);
    }, 2500);
}

function closeStreamPayment(e) {
    if(e.target.id === 'streamPaymentModal') {
        document.getElementById('streamPaymentModal').style.display = 'none';
    }
}