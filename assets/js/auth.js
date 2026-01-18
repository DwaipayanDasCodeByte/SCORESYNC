/**
 * AUTHENTICATION & LOGIN VISUALS
 */

// GLOBAL STATE via LocalStorage (Persists on Refresh)
window.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

// User Profile Defaults
window.userProfile = {
    username: "Alex Thompson",
    email: "alex.t@example.com",
    mobile: localStorage.getItem('userMobile') || "",
    favorites: ["Football", "Basketball"],
    fanPoints: 650
};

let redirectAfterLogin = false;
let isLoginViewActive = false;
let authMode = 'login'; 
let loginCanvas, ctx, particles = [];
let mouse = { x: null, y: null };

function handleSocialAuth(provider) {
    showMessage(`Connecting to ${provider}...`);
    setTimeout(() => {
        // SAVE STATE
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('authMethod', 'social'); // Remember this is social
        
        window.isLoggedIn = true;
        window.userProfile.username = "Social User";
        window.userProfile.email = `user@${provider.toLowerCase()}.com`;
        
        completeAuthFlow();
    }, 1200);
}

function completeAuthFlow() {
    showMessage(authMode === 'login' ? "Login Successful!" : "Account Created Successfully!");
    if(typeof updatePointsUI === 'function') updatePointsUI();

    setTimeout(() => { 
        document.getElementById('headerAuthBtn').innerText = "My Profile"; 
        if(redirectAfterLogin) {
            redirectAfterLogin = false;
            window.appShowView('seats');
        } else {
            window.appShowView('home'); 
        }
    }, 1500);
}

function handleLogout() {
    // CLEAR STATE
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authMethod');
    localStorage.removeItem('userMobile');
    
    window.isLoggedIn = false;
    document.getElementById('headerAuthBtn').innerText = "Login";
    showMessage("Signed out successfully.");
    window.appShowView('home');
}

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('auth-submit-btn');
    const link = document.getElementById('toggle-link');
    if(title) title.innerText = authMode === 'signup' ? "Join ScoreSync" : "Welcome Back";
    if(btn) btn.innerText = authMode === 'signup' ? "Create Account" : "Sign In";
    if(link) link.innerText = authMode === 'signup' ? "Sign in" : "Create one";
}

// Background Animation Logic
function initLoginBackground() {
    loginCanvas = document.getElementById('loginCanvas');
    if(!loginCanvas) return;
    ctx = loginCanvas.getContext('2d');
    window.addEventListener('resize', resizeLoginCanvas);
    resizeLoginCanvas();
    animateParticles();
}
function resizeLoginCanvas() {
    if(!loginCanvas) return;
    loginCanvas.width = window.innerWidth;
    loginCanvas.height = window.innerHeight;
    particles = Array.from({length: 80}, () => ({x: Math.random() * loginCanvas.width, y: Math.random() * loginCanvas.height, vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5, size: Math.random()*2+1}));
}
function animateParticles() {
    if(isLoginViewActive && loginCanvas) {
        ctx.clearRect(0, 0, loginCanvas.width, loginCanvas.height);
        const col = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim() || '144, 238, 144';
        for(let i=0; i<particles.length; i++) {
            let p = particles[i];
            p.x += p.vx; p.y += p.vy;
            if (mouse.x && mouse.y) { let dx = mouse.x - p.x; let dy = mouse.y - p.y; if (Math.sqrt(dx*dx + dy*dy) < 150) { p.x -= dx / 50; p.y -= dy / 50; } }
            if(p.x < 0 || p.x > loginCanvas.width) p.vx *= -1;
            if(p.y < 0 || p.y > loginCanvas.height) p.vy *= -1;
            ctx.fillStyle = `rgba(${col}, 0.6)`; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        }
    }
    requestAnimationFrame(animateParticles);
}
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });