/**
 * TICKETING SYSTEM
 */

const TICKET_DATA = [
    { id: 1, sport: 'Premier League', date: 'OCT 24', isoDate: '2025-10-24', match: 'Man Utd vs Liverpool', venue: 'Old Trafford', price: 120 },
    { id: 2, sport: 'La Liga', date: 'OCT 26', isoDate: '2025-10-26', match: 'Real Madrid vs Barcelona', venue: 'Santiago Bernabéu', price: 110 },
    { id: 3, sport: 'Serie A', date: 'OCT 29', isoDate: '2025-10-29', match: 'Inter Milan vs AC Milan', venue: 'San Siro', price: 105 },
    { id: 4, sport: 'Champions League', date: 'NOV 02', isoDate: '2025-11-02', match: 'Bayern Munich vs PSG', venue: 'Allianz Arena', price: 150 },
    { id: 5, sport: 'Volleyball', date: 'NOV 05', isoDate: '2025-11-05', match: 'Poland vs Brazil (World Cup)', venue: 'Spodek Arena', price: 60 },
    { id: 6, sport: 'Tennis', date: 'NOV 07', isoDate: '2025-11-07', match: 'Djokovic vs Alcaraz (Masters)', venue: 'O2 Arena', price: 130 },
    { id: 7, sport: 'Basketball', date: 'NOV 12', isoDate: '2025-11-12', match: 'Lakers vs Celtics', venue: 'Crypto.com Arena', price: 180 },
    { id: 8, sport: 'MMA', date: 'NOV 15', isoDate: '2025-11-15', match: 'UFC 305 Main Event', venue: 'T-Mobile Arena', price: 250 },
    { id: 9, sport: 'Formula 1', date: 'NOV 20', isoDate: '2025-11-20', match: 'Monaco Grand Prix', venue: 'Circuit de Monaco', price: 400 },
    { id: 10, sport: 'Hockey', date: 'NOV 22', isoDate: '2025-11-22', match: 'Rangers vs Bruins', venue: 'Madison Square Garden', price: 140 },
    { id: 11, sport: 'Baseball', date: 'NOV 25', isoDate: '2025-11-25', match: 'Dodgers vs Yankees', venue: 'Dodger Stadium', price: 200 },
    { id: 12, sport: 'Boxing', date: 'NOV 28', isoDate: '2025-11-28', match: 'Usyk vs Fury II', venue: 'Kingdom Arena', price: 350 },
    { id: 13, sport: 'Premier League', date: 'DEC 01', isoDate: '2025-12-01', match: 'Arsenal vs Chelsea', venue: 'Emirates Stadium', price: 125 },
    { id: 14, sport: 'Basketball', date: 'DEC 03', isoDate: '2025-12-03', match: 'Warriors vs Nuggets', venue: 'Chase Center', price: 175 },
    { id: 15, sport: 'MMA', date: 'DEC 07', isoDate: '2025-12-07', match: 'McGregor vs Chandler', venue: 'MGM Grand', price: 500 },
    { id: 16, sport: 'Cricket', date: 'DEC 10', isoDate: '2025-12-10', match: 'India vs Pakistan', venue: 'MCG', price: 100 },
    { id: 17, sport: 'Formula 1', date: 'DEC 15', isoDate: '2025-12-15', match: 'Abu Dhabi GP', venue: 'Yas Marina Circuit', price: 450 },
    { id: 18, sport: 'Tennis', date: 'DEC 18', isoDate: '2025-12-18', match: 'Sinner vs Nadal (Exhibition)', venue: 'Santiago Bernabéu', price: 160 },
    { id: 19, sport: 'NFL', date: 'FEB 08', isoDate: '2026-02-08', match: 'Super Bowl LX', venue: 'Levi\'s Stadium', price: 450 },
    { id: 20, sport: 'Football', date: 'MAY 24', isoDate: '2026-05-24', match: 'Champions League Final', venue: 'Allianz Arena', price: 350 },
    { id: 21, sport: 'Tennis', date: 'JUL 12', isoDate: '2026-07-12', match: 'Wimbledon Men\'s Final', venue: 'Centre Court', price: 280 },
    { id: 22, sport: 'Cricket', date: 'NOV 15', isoDate: '2025-11-15', match: 'Australia vs India (Test)', venue: 'The Gabba', price: 85 },
    { id: 23, sport: 'Basketball', date: 'JUN 15', isoDate: '2026-06-15', match: 'NBA Finals Game 7', venue: 'TD Garden', price: 320 },
    { id: 24, sport: 'Formula 1', date: 'MAY 24', isoDate: '2026-05-24', match: 'Monaco Grand Prix', venue: 'Circuit de Monaco', price: 480 },
    { id: 25, sport: 'MMA', date: 'JUL 04', isoDate: '2026-07-04', match: 'UFC International Fight Week', venue: 'T-Mobile Arena', price: 220 },
    { id: 26, sport: 'Football', date: 'AUG 15', isoDate: '2026-08-15', match: 'Premier League Opener', venue: 'Anfield', price: 140 },
    { id: 27, sport: 'Golf', date: 'APR 12', isoDate: '2026-04-12', match: 'The Masters Tournament', venue: 'Augusta National', price: 400 },
    { id: 28, sport: 'Cycling', date: 'JUL 26', isoDate: '2026-07-26', match: 'Tour de France Finale', venue: 'Champs-Élysées', price: 50 },
    { id: 29, sport: 'Athletics', date: 'AUG 08', isoDate: '2026-08-08', match: 'World Athletics Finals', venue: 'National Stadium', price: 90 },
    { id: 30, sport: 'Baseball', date: 'OCT 30', isoDate: '2025-10-30', match: 'World Series Game 5', venue: 'Yankee Stadium', price: 290 }
];

let selectedMatch = null;
let selectedSeats = [];
let bookedSeats = [];
let activePayment = 'upi';
let selectedCardType = 'Credit';
let userBookings = []; // Shared state with Profile

let ticketDiscountApplied = 0;
let currentFilters = {
    sport: 'All',
    search: '',
    maxPrice: 500,
    date: ''
};

function renderSportCategories() {
    const sports = ['All', 'Premier League', 'La Liga', 'Serie A', 'Basketball', 'Cricket', 'MMA', 'Tennis', 'Volleyball', 'Formula 1', 'Hockey', 'Baseball', 'NFL', 'Golf'];
    const container = document.getElementById('sportCategories');
    if(container) {
        container.innerHTML = sports.map(s => 
            `<li onclick="updateSportFilter('${s}', this)" class="${s==='All'?'active':''}">
                ${getSportIcon(s)} ${s}
            </li>`).join('');
    }
}

function renderTickets(data) {
    const container = document.getElementById('ticketContainer');
    if(!container) return;
    if (data.length === 0) {
        container.innerHTML = `<div class="no-bookings">No matches found matching your filters.</div>`;
        return;
    }
    container.innerHTML = data.map(t => `
        <div class="match-card" onclick="openSeats(${t.id})">
            <div class="date-box">
                <div class="m">${t.date.split(' ')[0]}</div>
                <div class="d">${t.date.split(' ')[1]}</div>
            </div>
            <div class="match-details">
                <div class="match-name">${t.match}</div>
                <div class="venue">${t.venue} • $${t.price}</div>
            </div>
            <div class="view-seats">View Seats &gt;</div>
        </div>`).join('');
}

function applyAllFilters() {
    let filtered = TICKET_DATA;
    if (currentFilters.search) {
        const query = currentFilters.search.toLowerCase();
        filtered = filtered.filter(t => 
            t.match.toLowerCase().includes(query) || 
            t.venue.toLowerCase().includes(query) ||
            t.sport.toLowerCase().includes(query)
        );
    }
    if (currentFilters.sport !== 'All') {
        filtered = filtered.filter(t => t.sport === currentFilters.sport || t.sport.includes(currentFilters.sport));
    }
    filtered = filtered.filter(t => t.price <= currentFilters.maxPrice);
    if (currentFilters.date) {
        filtered = filtered.filter(t => t.isoDate === currentFilters.date);
    }
    renderTickets(filtered);
}

function updateSportFilter(s, el) {
    document.querySelectorAll('#sportCategories li').forEach(li => li.classList.remove('active'));
    if (el) el.classList.add('active');
    currentFilters.sport = s;
    applyAllFilters();
}

function updatePriceFilter(val) {
    document.getElementById('priceVal').innerText = val;
    currentFilters.maxPrice = parseInt(val);
    applyAllFilters();
}

function updateDateFilter(val) {
    currentFilters.date = val;
    applyAllFilters();
}

function handleSearch() {
    currentFilters.search = document.getElementById('ticketSearch').value;
    applyAllFilters();
}

function resetFilters() {
    currentFilters = { sport: 'All', search: '', maxPrice: 500, date: '' };
    document.getElementById('ticketSearch').value = '';
    document.getElementById('priceFilter').value = 500;
    document.getElementById('priceVal').innerText = 500;
    document.getElementById('dateFilter').value = '';
    
    document.querySelectorAll('#sportCategories li').forEach(li => li.classList.remove('active'));
    const allTab = Array.from(document.querySelectorAll('#sportCategories li')).find(li => li.innerText.includes('All'));
    if(allTab) allTab.classList.add('active');

    applyAllFilters();
}

// BOOKING LOGIC
function openSeats(id) {
    selectedMatch = TICKET_DATA.find(m => m.id === id);
    selectedSeats = [];
    bookedSeats = Array.from({length: 40}, () => Math.floor(Math.random() * 100));
    window.appShowView('seats'); // Switch view
    
    // Render needs to happen after view switch logic or view load
    setTimeout(() => {
        const title = document.getElementById('seatViewTitle');
        if(title) {
            title.innerText = selectedMatch.match;
            document.getElementById('seatViewVenue').innerText = selectedMatch.venue;
            renderSeatGrid();
            updateSeatUI();
        }
    }, 100);
}

function renderSeatGrid() {
    const grid = document.getElementById('seatGrid');
    if(!grid) return;
    let html = "";
    for(let i=0; i<100; i++) {
        const isBooked = bookedSeats.includes(i);
        const sId = String.fromCharCode(65 + Math.floor(i / 10)) + ((i % 10) + 1);
        html += `<div class="seat ${isBooked ? 'booked' : ''}" id="seat-${i}" onclick="toggleSeat(${i}, '${sId}')">${sId}</div>`;
    }
    grid.innerHTML = html;
    document.getElementById('statBooked').innerText = bookedSeats.length;
    document.getElementById('statLeft').innerText = 100 - bookedSeats.length;
}

function toggleSeat(index, seatId) {
    const el = document.getElementById(`seat-${index}`);
    if(selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(s => s !== seatId);
        el.classList.remove('selected');
    } else {
        if(selectedSeats.length >= 6) return showMessage("Max 6 seats per booking");
        selectedSeats.push(seatId);
        el.classList.add('selected');
    }
    updateSeatUI();
}

function updateSeatUI() {
    document.getElementById('selectedSeatsCount').innerText = selectedSeats.length;
    document.getElementById('selectedSeatsList').innerHTML = selectedSeats.map(s => `<span>${s}</span>`).join('');
    document.getElementById('seatSubtotal').innerText = `$${selectedSeats.length * (selectedMatch ? selectedMatch.price : 0)}`;
}

// --- CHECKOUT & PAYMENT LOGIC ---

function proceedToCheckout() {
    if(!isLoggedIn) {
        showMessage("Please login to proceed with your booking");
        redirectAfterLogin = true;
        window.appShowView('login');
        return;
    }
    if(selectedSeats.length === 0) return showMessage("Select at least one seat");
    
    ticketDiscountApplied = 0;
    window.appShowView('checkout');
    
    setTimeout(() => {
        renderCheckoutSummary();
        const redUI = document.getElementById('ticketRedemptionUI');
        if(redUI && typeof userProfile !== 'undefined' && userProfile.fanPoints >= 500) {
            redUI.style.display = 'flex';
            document.getElementById('checkoutFanPointsText').innerText = `${userProfile.fanPoints} Fan Points`;
        } else if (redUI) {
            redUI.style.display = 'none';
        }
        
        // Default to UPI on load
        const initialMethod = document.querySelector('.payment-methods .method-option[data-method="upi"]');
        if(initialMethod) selectPayment('upi', initialMethod);
    }, 100);
}

function handleTicketRedeem() {
    ticketDiscountApplied = 5;
    const redUI = document.getElementById('ticketRedemptionUI');
    if(redUI) redUI.style.display = 'none'; 
    renderCheckoutSummary(); 
    if(typeof showMessage === 'function') showMessage("Discount applied! $5 off.");
}

function renderCheckoutSummary() {
    const sub = selectedSeats.length * selectedMatch.price;
    const discount = ticketDiscountApplied;
    const total = (sub + 15) - discount;
    const summary = document.getElementById('checkoutSummary');
    if(summary) {
        summary.innerHTML = `
            <div class="sidebar-card">
                <h3>Order Summary</h3>
                <div style="margin-bottom:15px"><b>${selectedMatch.match}</b><br><small>${selectedSeats.join(', ')}</small></div>
                <div class="summary-row"><span>Seats</span><span>$${sub}.00</span></div>
                <div class="summary-row"><span>Fee</span><span>$15.00</span></div>
                ${discount > 0 ? `<div class="summary-row" style="color:var(--accent);"><span>Discount</span><span>-$${discount}.00</span></div>` : ''}
                <div class="summary-total"><span>Total</span><span>$${total}.00</span></div>
            </div>`;
    }
}

function selectPayment(m, el) {
    document.querySelectorAll('.payment-methods .method-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    
    document.querySelectorAll('.payment-form').forEach(f => f.classList.remove('active'));
    
    const targetForm = document.getElementById(`form-${m}`);
    if(targetForm) targetForm.classList.add('active');
    
    activePayment = m;
    
    // Auto-select Credit if card is chosen
    if(m === 'card') {
        const creditBtn = document.getElementById('card-credit-btn');
        if(creditBtn) selectCardType('Credit', creditBtn);
    }
}

function selectCardType(type, el) {
    const buttons = document.querySelectorAll('.card-type-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if(el) el.classList.add('active');
    selectedCardType = type;
}

function processPayment() {
    document.getElementById('loadingOverlay').style.display = 'flex';
    setTimeout(() => {
        const newRef = 'SS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        if(ticketDiscountApplied > 0 && typeof userProfile !== 'undefined') {
            userProfile.fanPoints -= 500;
            if(typeof updatePointsUI === 'function') updatePointsUI();
        }

        userBookings.unshift({
            ref: newRef,
            match: selectedMatch.match,
            venue: selectedMatch.venue,
            date: selectedMatch.date,
            seats: [...selectedSeats],
            price: selectedMatch.price,
            paymentMethod: activePayment,
            cardType: selectedCardType
        });

        document.getElementById('loadingOverlay').style.display = 'none';
        window.appShowView('receipt');
        setTimeout(() => renderProfessionalReceipt(newRef), 100);
    }, 2500); 
}

// --- NEW DOWNLOAD FUNCTION ---
function downloadTicket() {
    const btn = document.getElementById('btn-download-ticket');
    if(btn) {
        const originalText = btn.innerText;
        btn.innerText = "Processing...";
        setTimeout(() => {
            window.print(); // Triggers browser print/save as PDF dialog
            btn.innerText = originalText;
        }, 800);
    }
}

// --- UPDATED RECEIPT RENDERER (Split View) ---
function renderProfessionalReceipt(refNum) {
    const orderNum = refNum || ('SS-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    const sub = (selectedSeats.length * selectedMatch.price) + 15;
    const total = sub - ticketDiscountApplied;
    const methodDisplay = activePayment === 'card' ? `${selectedCardType} Card` : activePayment.toUpperCase();
    
    const container = document.getElementById('receiptContainer');
    if(container) {
        // We use a Flex wrapper to put the Ticket (Left) and Guide (Right) side by side
        container.innerHTML = `
            <div style="display: flex; gap: 40px; justify-content: center; align-items: flex-start; flex-wrap: wrap;">
                
                <div class="ticket-receipt" style="margin: 0; flex: 1; min-width: 340px; max-width: 400px;">
                    <div class="ticket-top">
                        <div class="ticket-brand">
                            <div class="ticket-logo">SCORE<span>SYNC</span></div>
                            <div class="ticket-status">CONFIRMED</div>
                        </div>
                        <div class="ticket-event-name">${selectedMatch.match}</div>
                        <div class="ticket-grid">
                            <div class="ticket-info-box"><label>Venue</label><span>${selectedMatch.venue}</span></div>
                            <div class="ticket-info-box" style="text-align:right;"><label>Date & Time</label><span>${selectedMatch.date} • 19:30</span></div>
                            <div class="ticket-info-box"><label>Section</label><span>MAIN STAND</span></div>
                            <div class="ticket-info-box" style="text-align:right;"><label>Seats</label><span>${selectedSeats.join(', ')}</span></div>
                        </div>
                    </div>
                    
                    <div class="ticket-perforation">
                        <div class="notch"></div>
                        <div class="perforation-line"></div>
                        <div class="notch"></div>
                    </div>

                    <div class="ticket-bottom">
                        <div class="ticket-qr-wrap"><div class="ticket-qr-placeholder"></div></div>
                        <div class="ticket-barcode"></div>
                        <div class="ticket-ref">REF: ${orderNum}</div>
                        <div class="ticket-cost-summary">
                            <div class="ticket-total-label">Paid via ${methodDisplay}</div>
                            <div class="ticket-total-amount">$${total}.00</div>
                        </div>
                        <button type="button" class="btn-primary full-width" style="margin-top:20px;" onclick="window.appShowView('profile')">View in My Bookings</button>
                    </div>
                </div>

                <div class="match-guide-card" style="flex: 1; min-width: 320px; max-width: 380px; background: #1e293b; border-radius: 20px; padding: 30px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 20px 40px rgba(0,0,0,0.3); color: #fff; height: fit-content;">
                    <h3 style="margin-top:0; font-size: 1.4rem; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; margin-bottom: 20px;">Match Day Guide</h3>
                    
                    <div style="background: linear-gradient(135deg, #334155, #1e293b); height: 140px; border-radius: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; border: 1px dashed rgba(255,255,255,0.2);">
                        <span style="color: #94a3b8; font-size: 0.9rem;">📍 Venue Map Loading...</span>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                        <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px;">
                            <div style="font-size: 0.8rem; color: #94a3b8;">Weather Forecast</div>
                            <div style="font-size: 1.1rem; font-weight: 600; margin-top: 5px;">⛅ 18°C</div>
                            <div style="font-size: 0.75rem; color: #64748b;">Clear Skies</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px;">
                            <div style="font-size: 0.8rem; color: #94a3b8;">Gates Open</div>
                            <div style="font-size: 1.1rem; font-weight: 600; margin-top: 5px;">17:30</div>
                            <div style="font-size: 0.75rem; color: #64748b;">2h before Kickoff</div>
                        </div>
                    </div>

                    <h4 style="font-size: 0.95rem; margin-bottom: 10px; color: #e2e8f0;">Quick Tips</h4>
                    <ul style="list-style: none; padding: 0; margin: 0 0 25px 0; font-size: 0.85rem; color: #cbd5e1;">
                        <li style="margin-bottom: 8px; display: flex; gap: 10px;">✅ Use Gate 4 for Main Stand entry.</li>
                        <li style="margin-bottom: 8px; display: flex; gap: 10px;">👜 Small bags only (A4 size max).</li>
                        <li style="display: flex; gap: 10px;">🆔 Digital ID required at entry.</li>
                    </ul>

                    <button id="btn-download-ticket" onclick="downloadTicket()" style="width: 100%; padding: 14px; background: transparent; border: 2px solid #4ade80; color: #4ade80; font-weight: 700; border-radius: 12px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download Ticket
                    </button>
                </div>
            </div>`;
    }
}