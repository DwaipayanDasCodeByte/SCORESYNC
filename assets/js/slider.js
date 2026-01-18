/**
 * HERO SLIDER
 */

const HERO_DATA = [
    { img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1600', title: 'Feel the Stadium Roar', desc: 'Get exclusive access to the most anticipated matches of the season.' },
    { img: 'assets/image/2nd.jpg', title: 'Champions are Made Here', desc: 'Secure your premium seats for the global championship series.' },
    { img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1600', title: 'The Ultimate Fan Experience', desc: 'Join thousands of fans in the heart of the action with ScoreSync.' },
    { img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1600', title: 'Witness the Gentleman\'s Game', desc: 'Experience the magic of international cricket across all formats.' },
    { img: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&q=80&w=1600', title: 'Speed, Precision, Glory', desc: 'Feel the g-force at the world\'s most iconic Grand Prix circuits.' },
    { img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1600', title: 'Courtside Intensity', desc: 'Catch every slam dunk and buzzer-beater in the upcoming playoffs.' },
    { img: 'assets/image/7nd.jpg', title: 'Grand Slam Drama', desc: 'Watch the world\'s best athletes battle for tennis supremacy.' },
    { img: 'assets/image/8th.jpg', title: 'The Ring of Fire', desc: 'Secure your ringside seats for the Heavyweight Unification bout.' }
];

let currentSlide = 0;

function renderHero() {
    const slider = document.getElementById('slider');
    const dots = document.getElementById('sliderDots');
    if(!slider || !dots) return;

    slider.innerHTML = HERO_DATA.map((s, i) => `
        <div class="slide ${i === 0 ? 'active' : ''}" style="background-image: url('${s.img}')">
            <div class="slide-content">
                <h1>${s.title}</h1>
                <p>${s.desc}</p>
                <button type="button" class="btn-primary" onclick="window.appShowView('tickets')">Browse Tickets</button>
            </div>
        </div>`).join('');
    dots.innerHTML = HERO_DATA.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>`).join('');
}

function goToSlide(i) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if(!slides.length) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = i;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}