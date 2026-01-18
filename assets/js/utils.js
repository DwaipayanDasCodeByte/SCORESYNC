/**
 * UTILITIES & GLOBAL HELPERS
 */

// Global State wrapper for shared data (if needed)
const APP_STATE = {};

function showMessage(t) { 
    const b = document.getElementById('msgBox'); 
    if(b) {
        b.innerText = t; 
        b.style.display = 'block'; 
        setTimeout(() => b.style.display='none', 3000); 
    }
}

function getSportIcon(sport) {
    const icons = {
        'Football': '⚽', 'Premier League': '⚽', 'La Liga': '⚽', 'Serie A': '⚽', 'Champions League': '⚽',
        'Basketball': '🏀', 'Cricket': '🏏',
        'MMA': '🥊', 'Tennis': '🎾', 'Formula 1': '🏎️',
        'Hockey': '🏒', 'Volleyball': '🏐', 'Boxing': '🥊', 'Baseball': '⚾', 'NFL': '🏈', 'Golf': '⛳', 'Cycling': '🚲', 'Athletics': '👟'
    };
    return icons[sport] || '🏆';
}

function toggleFaq(el) {
    const items = document.querySelectorAll('.faq-item');
    const isActive = el.classList.contains('active');
    items.forEach(item => item.classList.remove('active'));
    if (!isActive) el.classList.add('active');
}