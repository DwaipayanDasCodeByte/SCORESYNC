/**
 * PROFILE & USER DATA
 */

function updatePointsUI() {
    const pPoints = document.getElementById('profileUserPoints');
    const fPoints = document.getElementById('fanzoneUserPoints');
    // Ensure userProfile exists to prevent errors
    if(typeof userProfile !== 'undefined') {
        if(pPoints) pPoints.innerText = userProfile.fanPoints.toLocaleString();
        if(fPoints) fPoints.innerText = userProfile.fanPoints.toLocaleString();
    }
}

function renderFavoritesGrid() {
    const sports = ['Football', 'Basketball', 'Cricket', 'MMA', 'Tennis', 'Volleyball', 'Formula 1', 'Hockey', 'Baseball'];
    const grid = document.getElementById('favoritesGrid');
    if(!grid) return;
    
    // Safety check for userProfile
    const favorites = (typeof userProfile !== 'undefined' && userProfile.favorites) ? userProfile.favorites : [];

    grid.innerHTML = sports.map(s => {
        const isActive = favorites.includes(s);
        return `<button type="button" class="fav-chip ${isActive ? 'active' : ''}" onclick="toggleFavorite('${s}', this)">
            ${getSportIcon(s)} ${s}
        </button>`;
    }).join('');
}

function toggleFavorite(sport, el) {
    if(typeof userProfile === 'undefined') return;
    
    if (userProfile.favorites.includes(sport)) {
        userProfile.favorites = userProfile.favorites.filter(f => f !== sport);
        el.classList.remove('active');
    } else {
        userProfile.favorites.push(sport);
        el.classList.add('active');
    }
}

function renderBookings() {
    const container = document.getElementById('bookingsList');
    if(!container) return;
    
    // Safety check for userBookings
    const bookings = (typeof userBookings !== 'undefined') ? userBookings : [];

    if(bookings.length === 0) {
        container.innerHTML = `<div class="no-bookings">No tickets purchased yet. Start browsing now!</div>`;
        // TRIGGER SECURITY FEATURES HERE (Even if no bookings)
        setTimeout(initSecurityFeatures, 50); 
        return;
    }

    container.innerHTML = bookings.map((b, idx) => `
        <div class="booking-item">
            <div class="booking-info">
                <h4>${b.match}</h4>
                <p>${b.venue} • ${b.date}</p>
                <p style="color:var(--accent); font-weight:700;">Seats: ${b.seats.join(', ')}</p>
            </div>
            <button class="btn-outline" onclick="reprintReceipt(${idx})">View Receipt</button>
        </div>
    `).join('');

    // TRIGGER SECURITY FEATURES HERE (After bookings render)
    // This ensures the logic runs every time the profile view is loaded.
    setTimeout(initSecurityFeatures, 50);
}

function reprintReceipt(index) {
    if(typeof userBookings === 'undefined') return;
    const booking = userBookings[index];
    
    // Ensure global variables are set (simulating app state)
    window.selectedMatch = { match: booking.match, venue: booking.venue, date: booking.date, price: booking.price };
    window.selectedSeats = booking.seats;
    window.activePayment = booking.paymentMethod;
    window.selectedCardType = booking.cardType;
    
    if(window.appShowView) {
        window.appShowView('receipt');
        if(typeof renderProfessionalReceipt === 'function') {
            setTimeout(() => renderProfessionalReceipt(booking.ref), 100);
        }
    }
}

/* ==========================================
   SECURITY & RECOVERY LOGIC (SPA-COMPATIBLE)
   ========================================== */

function initSecurityFeatures() {
    // 1. Check if user is allowed to see security settings (Email users only)
    const authMethod = localStorage.getItem('authMethod'); // 'email', 'google', 'apple'
    const securitySection = document.getElementById('security-area');
    
    if (securitySection) {
        // Show section only if logged in via Email (or if testing/undefined)
        if (!authMethod || authMethod === 'email') {
            securitySection.style.display = 'block';
        } else {
            securitySection.style.display = 'none';
        }
    }

    // 2. Pre-fill Mobile Number if exists
    const mobileInput = document.getElementById('profile-mobile');
    if (mobileInput && typeof userProfile !== 'undefined' && userProfile.mobile) {
        mobileInput.value = userProfile.mobile;
    }

    // 3. Attach Listeners Safely
    setupMobileForm();
    setupPasswordForm();
}

function setupMobileForm() {
    const form = document.getElementById('mobile-form');
    if (!form) return;

    // Use cloneNode to wipe old listeners (prevents duplicate triggers)
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('profile-mobile');
        const btn = newForm.querySelector('button');
        const num = input.value.trim();

        if (num.length < 10) {
            alert("Please enter a valid mobile number.");
            return;
        }

        // Save Data
        if(typeof userProfile !== 'undefined') {
            userProfile.mobile = num;
            // Optional: Save to localStorage to persist across reloads
            localStorage.setItem('userProfileMobile', num); 
        }
        
        // Visual Feedback
        const originalText = btn.innerText;
        btn.innerText = "✓ Number Saved";
        btn.style.background = "#22c55e"; 
        btn.style.borderColor = "#22c55e";
        btn.style.color = "#000";

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = ""; 
            btn.style.borderColor = "";
            btn.style.color = "";
        }, 2000);
    });
}

function setupPasswordForm() {
    const form = document.getElementById('password-form');
    if (!form) return;

    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = newForm.querySelectorAll('input');
        const newPass = inputs[1].value;
        const btn = newForm.querySelector('button');

        if (newPass.length < 6) {
            alert("New password must be at least 6 characters.");
            return;
        }

        // Simulate Update
        const originalText = btn.innerText;
        btn.innerText = "Updating...";
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = "✓ Password Updated";
            btn.style.background = "#22c55e";
            btn.style.borderColor = "#22c55e";
            btn.style.color = "#000";
            btn.disabled = false;
            newForm.reset(); 

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.borderColor = "";
                btn.style.color = "";
            }, 2000);
        }, 1000);
    });
}

// Global hook for manual initialization if needed
window.initSecurityFeatures = initSecurityFeatures;