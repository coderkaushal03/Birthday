// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Add slight delay to outline
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Add hover effects for interactive elements
        const interactives = document.querySelectorAll('button, a, input, .story-item, .cake, .tilt-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // --- 2. Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- 3. Vanilla Tilt ---
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
    });

    // --- 4. Initial Confetti Burst ---
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff7096', '#ff477e', '#c9184a']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff7096', '#ff477e', '#c9184a']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // --- 5. Premium GSAP Animations ---
    gsap.from(".badge", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    });

    gsap.from(".fade-up-stagger", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.2
    });

    const sections = gsap.utils.toArray('.fade-up');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.5)"
        });
    });

    gsap.utils.toArray(".tilt-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // --- 6. Stats Counter ---
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: "#stats",
            start: "top 85%",
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                const duration = 2500; // 2.5 seconds
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            }
        });
    });

    // --- 7. Audio Controls ---
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = musicBtn.querySelector('i');
    let isPlaying = false;
    music.volume = 0.3;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicIcon.classList.replace('ph-speaker-high', 'ph-speaker-slash');
        } else {
            music.play().catch(e => console.log("Audio play failed:", e));
            musicIcon.classList.replace('ph-speaker-slash', 'ph-speaker-high');
        }
        isPlaying = !isPlaying;
    });

    // --- 7. Dynamic Last Wish Time ---
    const timeElement = document.getElementById('last-wish-time');
    if (timeElement) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - 10);
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        timeElement.innerText = `${hours}:${minutes} ${ampm}`;
    }

    // --- 8. AI Generator Logic ---
    const generateBtn = document.getElementById('generate-btn');
    const nameInput = document.getElementById('guest-name');
    const outputDiv = document.getElementById('ai-output');
    const typingIndicator = document.querySelector('.typing-indicator');
    const generatedMessage = document.getElementById('generated-message');

    const intros = [
        "Beep boop! Hello {name}.",
        "Initializing gratitude protocol for {name}...",
        "Neural network confirms: {name} is awesome.",
        "Hey {name}!"
    ];

    const bodies = [
        "Your wishes totally made my day unforgettable.",
        "I analyzed all my birthday messages, and yours had the highest energy levels.",
        "Thanks for being a core memory in my system today.",
        "Your message was the perfect upgrade to my birthday firmware."
    ];

    const outtros = [
        "You're a legend! ❤️",
        "Keep shining! ✨",
        "Stay awesome! 🚀",
        "Sending virtual high-fives! 🙌"
    ];

    generateBtn.addEventListener('click', () => {
        const name = nameInput.value.trim() || "Guest";

        outputDiv.classList.remove('hidden');
        generatedMessage.style.display = 'none';
        typingIndicator.style.display = 'flex';

        // Bounce animation on the core
        gsap.to(".ai-core", { scale: 1.5, duration: 0.3, yoyo: true, repeat: 3 });

        setTimeout(() => {
            const intro = intros[Math.floor(Math.random() * intros.length)].replace('{name}', name);
            const body = bodies[Math.floor(Math.random() * bodies.length)];
            const outtro = outtros[Math.floor(Math.random() * outtros.length)];

            typingIndicator.style.display = 'none';
            generatedMessage.style.display = 'block';

            generatedMessage.innerHTML = '';
            const fullMessage = `${intro} ${body} ${outtro}`;

            // --- Discord Webhook Integration ---
            const webhookURL = "https://discord.com/api/webhooks/1499361044513161246/eVbBCwxSbEg4ZrI-0XI4mi9mN6kEhhuy9B5JlT46YWoIfZKs3R2ejwsbND2471Gz3rLj"; 
            
            if (webhookURL && webhookURL.includes("discord.com/api/webhooks")) {
                fetch(webhookURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `🎉 **${name}** just visited the birthday site!\n> *${fullMessage}*`
                    })
                }).catch(err => console.error('Webhook error:', err));
            }
            // -----------------------------------

            let i = 0;
            const typeWriter = setInterval(() => {
                generatedMessage.innerHTML += fullMessage.charAt(i);
                i++;
                if (i >= fullMessage.length) {
                    clearInterval(typeWriter);
                }
            }, 30);

        }, 1500);
    });

    // --- 9. Arcade Catch the Cake Mini-Game ---
    const startGameBtn = document.getElementById('start-game');
    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('score');
    const timerBar = document.querySelector('.timer-bar');
    const timerFill = document.querySelector('.timer-fill');
    
    let score = 0;
    let gameInterval;
    let isGameRunning = false;

    const standardCakes = ['🎂', '🧁', '🍰'];
    const rareGifts = ['🎁'];

    function spawnItem() {
        if (!isGameRunning) return;

        const isRare = Math.random() < 0.15; // 15% chance for a rare gift
        const itemArray = isRare ? rareGifts : standardCakes;
        const emoji = itemArray[Math.floor(Math.random() * itemArray.length)];
        const points = isRare ? 5 : 1;

        const item = document.createElement('div');
        item.classList.add('cake');
        item.innerText = emoji;
        // Make rare gifts larger and glowing
        if (isRare) {
            item.style.fontSize = '4rem';
            item.style.filter = 'drop-shadow(0 0 15px gold)';
        }

        const maxX = gameArea.clientWidth - 80;
        item.style.left = Math.random() * maxX + 'px';
        item.style.top = '100%'; // Start at bottom

        gameArea.appendChild(item);

        // Float upwards animation
        const floatDuration = 2 + Math.random() * 2; // 2 to 4 seconds
        gsap.to(item, {
            y: -(gameArea.clientHeight + 100),
            duration: floatDuration,
            ease: "none",
            onComplete: () => {
                if (item.parentElement) item.remove();
            }
        });
        
        // Add slight horizontal drift
        gsap.to(item, {
            x: `+=${(Math.random() - 0.5) * 100}`,
            duration: floatDuration,
            ease: "sine.inOut"
        });

        item.addEventListener('click', (e) => {
            if (!isGameRunning) return;
            score += points;
            scoreDisplay.innerText = score;

            const rect = gameArea.getBoundingClientRect();
            
            // Spawn Floating Text
            const floatingText = document.createElement('div');
            floatingText.classList.add('floating-text');
            floatingText.innerText = `+${points}`;
            floatingText.style.left = e.clientX - rect.left + 'px';
            floatingText.style.top = e.clientY - rect.top + 'px';
            if (isRare) floatingText.style.color = 'gold';
            
            gameArea.appendChild(floatingText);
            
            gsap.to(floatingText, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                onComplete: () => floatingText.remove()
            });

            // Mini Confetti
            confetti({
                particleCount: isRare ? 40 : 15,
                spread: 50,
                origin: {
                    x: e.clientX / window.innerWidth,
                    y: e.clientY / window.innerHeight
                },
                colors: isRare ? ['#ffd700', '#ffaa00'] : ['#ff477e', '#00f5d4']
            });

            // Pop out item
            gsap.killTweensOf(item);
            gsap.to(item, { scale: 0, opacity: 0, duration: 0.15, onComplete: () => item.remove() });
        });
    }

    startGameBtn.addEventListener('click', () => {
        if (isGameRunning) return;

        isGameRunning = true;
        score = 0;
        scoreDisplay.innerText = score;
        
        timerBar.style.display = 'block';
        gsap.set(timerFill, { scaleX: 1 });
        gsap.to(timerFill, { scaleX: 0, duration: 15, ease: "none" });

        // Fly out button
        gsap.to(startGameBtn, { y: -50, opacity: 0, duration: 0.3, onComplete: () => startGameBtn.style.display = 'none' });

        gameInterval = setInterval(spawnItem, 600); // Spawn faster

        setTimeout(() => {
            clearInterval(gameInterval);
            isGameRunning = false;
            
            timerBar.style.display = 'none';

            const remaining = document.querySelectorAll('.cake');
            remaining.forEach(c => {
                gsap.killTweensOf(c);
                gsap.to(c, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => c.remove() });
            });

            startGameBtn.innerText = "Play Again";
            startGameBtn.style.display = 'flex';
            gsap.to(startGameBtn, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)" });

            if (score > 15) {
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#ff477e', '#ff7096', '#00f5d4', '#ffd700']
                });
            }
        }, 15000);
    });

    // --- 10. Surprise Me Button ---
    const surpriseBtn = document.getElementById('surprise-btn');
    surpriseBtn.addEventListener('click', () => {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 1 },
            colors: ['#ff7096', '#ff477e', '#c9184a'],
            startVelocity: 60
        });

        const sectionsIds = ['#legends', '#ai-generator', '#highlights', '#game'];
        const randomSection = document.querySelector(sectionsIds[Math.floor(Math.random() * sectionsIds.length)]);
        randomSection.scrollIntoView({ behavior: 'smooth' });
    });

    // --- 11. Wishlist Claim Buttons ---
    const claimBtns = document.querySelectorAll('.wishlist-card .small-btn');
    claimBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff477e', '#ff7096', '#00f5d4']
            });
            
            // Change button state
            this.innerHTML = '<i class="ph ph-check-circle"></i> Claimed!';
            this.style.background = 'rgba(0, 245, 212, 0.2)';
            this.style.color = '#00f5d4';
            this.style.border = '1px solid rgba(0, 245, 212, 0.4)';
            this.disabled = true;
        });
    });
});
