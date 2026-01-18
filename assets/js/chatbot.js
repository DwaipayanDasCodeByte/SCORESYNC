/* ==========================================
   FILE: assets/js/chatbot.js
   PURPOSE: SyncBot Logic (Logic ONLY - No HTML Injection)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initChatLogic();
});

function initChatLogic() {
    // 1. Get Elements from index.html
    const btn = document.getElementById('syncbot-btn');
    const chatWindow = document.getElementById('syncbot-window');
    const close = document.getElementById('close-chat');
    const input = document.getElementById('chat-input');
    const send = document.getElementById('send-btn');
    const messages = document.getElementById('chat-messages');

    // Safety Check: If elements are missing, stop to prevent errors
    if (!btn || !chatWindow) {
        console.error("SyncBot Error: HTML elements not found in index.html");
        return;
    }

    // 2. Toggle Window Logic
    btn.onclick = function() {
        chatWindow.classList.toggle('hidden');
    };

    if (close) {
        close.onclick = function() {
            chatWindow.classList.add('hidden');
        };
    }

    // 3. Send Message Logic
    function sendMessage() {
        const text = input.value.trim();
        if (text === "") return;

        // User Message
        addMessage(text, 'user-msg');
        input.value = "";

        // Thinking Animation
        const loadingId = addLoadingBubble();
        // Auto-scroll to bottom
        messages.scrollTop = messages.scrollHeight;

        // AI Response Delay (800ms)
        setTimeout(() => {
            removeLoadingBubble(loadingId);
            const response = getBotResponse(text.toLowerCase());
            addMessage(response, 'bot-msg');
            messages.scrollTop = messages.scrollHeight;
        }, 800);
    }

    // 4. Attach Events
    if (send) send.onclick = sendMessage;
    if (input) {
        input.onkeypress = (e) => {
            if (e.key === 'Enter') sendMessage();
        };
    }

    // Helper: Create Bubble
    function addMessage(text, className) {
        const div = document.createElement('div');
        div.className = `message ${className} animate-in`;
        div.innerHTML = text;
        messages.appendChild(div);
    }

    // Helper: Loading Dots
    function addLoadingBubble() {
        const id = 'loading-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'message bot-msg';
        div.innerHTML = '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
        messages.appendChild(div);
        return id;
    }

    // Helper: Remove Dots
    function removeLoadingBubble(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
}

// 5. THE "BRAIN" (Keyword Matcher)
function getBotResponse(input) {
    if (input.includes('ticket') || input.includes('price') || input.includes('buy')) {
        return "You can buy tickets in our <b>Tickets</b> section. Prices start at $60. <br><button class='chat-link-btn' onclick='appShowView(\"tickets\")'>Go to Tickets</button>";
    }
    if (input.includes('score') || input.includes('live') || input.includes('match')) {
        return "Current Live Match:<br><b>Man City 2 - 1 Arsenal</b><br>(78th Minute). It's intense!";
    }
    if (input.includes('login') || input.includes('sign')) {
        return "Access your account here: <br><button class='chat-link-btn' onclick='appShowView(\"login\")'>Login Page</button>";
    }
    if (input.includes('hi') || input.includes('hello')) {
        return "Hello! 👋 I am SyncBot. Ask me about tickets, scores, or schedules!";
    }
    return "I'm not sure. Try asking about <b>Tickets</b>, <b>Scores</b>, or <b>Login</b>.";
}