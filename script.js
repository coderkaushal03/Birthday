// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        let rafId;
        window.addEventListener('mousemove', (e) => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                cursorDot.style.left = `${e.clientX}px`;
                cursorDot.style.top = `${e.clientY}px`;
                cursorOutline.style.left = `${e.clientX}px`;
                cursorOutline.style.top = `${e.clientY}px`;
                rafId = null;
            });
        });

        const interactives = document.querySelectorAll('button, a, input, .story-item, .cake, .tilt-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
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

    // --- 3. Vanilla Tilt (optimised: no glare, lower speed) ---
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 8,
        speed: 600,
        glare: false,
        scale: 1.01,
        gyroscope: false
    });

    // --- 4. Initial Confetti Burst (reduced) ---
    setTimeout(() => {
        confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff7096', '#ff477e', '#c9184a']
        });
        confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff7096', '#ff477e', '#c9184a']
        });
    }, 800);

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
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".tilt-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
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
                const duration = 2500;
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

    // --- 7b. Wall of Legends — Infinite Marquee ---
    const wishes = [
        { name: "Balaji", message: "Azz to Happy wala din hai kisi ka.... 😋😋" },
        { name: "Tushar", message: "Happy Birthday brother" },
        { name: "Devansh", message: "happy birthday bhai jaan" },
        { name: "Kirti", message: "Happieee birthday laadale 💪🏻😎🤗🥳" },
        { name: "Gaurav", message: "happy birthday" },
        { name: "Kajal", message: "Happy Birthday 🎂" },
        { name: "Sonu", message: "Janmdin ki Bahutt bahut badhaiya mere bhai 🫂✨💗" },
        { name: "Jhalak", message: "Happiest birthday kaushal 👀🎂🎂🎉🧿✨" },
        { name: "Maulik", message: "Happy birthday bhai 🎊🥂" },
        { name: "Janvi", message: "Happy birthday kaushal 🥳" },
        { name: "Harshita", message: "Happy birthday kaushal ❤️🤝" },
        { name: "Harshal", message: "Happy Birthday Kaushal 🥂💗🥳....Stay happy always ✨" },
        { name: "Harshita Ratnawat", message: "happy birthday coder kaushal" },
        { name: "Indraj", message: "happy birthday bhai✨" },
        { name: "Himanshi", message: "hapieest birthday kaushal" },
        { name: "Shalini Ma'am", message: "Happy Birthday bro 🎉🥳" },
        { name: "Vanshika", message: "Happy Birthday kaushal😇😇" },
        { name: "Rohan", message: "Happy birthday bhaiii 😍🤙🏻" },
        { name: "Hitesh", message: "Happy birthday Koli Flower 🌷🌹🌹" },
        { name: "Praagya", message: "Happy Birthday bhai 🎉🎉🎉🫂" },
        { name: "Priyam", message: "Happy Birthday Bhaiii 🫂🎊🍰" },
        { name: "Yash Balani", message: "Happy Birthday Bhai 🥳✨" },
        { name: "Jiya", message: "Happy birthday Kaushal ✨️🎂🎊💗" },
        { name: "Prisha", message: "Happiest Birthdayyy🤍" },
        { name: "Kritika", message: "Happpyyy birthday kaushal✨️" },
        { name: "Keshav Gupta", message: "Happy birthday bhai 🫂❤️" },
        { name: "Harsh Gwala", message: "happy birthday bhai❤️" },
        { name: "Vansh Bhamota", message: "happy birthday bhai" },
        { name: "Angel", message: "Happiest Birthday 🎂 ✨" },
        { name: "Nano", message: "Happy bday polio🚀" },
        { name: "Vansh Sharma", message: "HAPPPPYYYY BIRTHDAY BHAII KOOO🎈🎈🎈" },
        { name: "Lalit", message: "Happy Birthday bhai ✨" },
        { name: "Purujit", message: "Happy birthday Bhai 🎉" },
        { name: "Bhavesh", message: "Happy birthday bhaii ❤️" },
        { name: "Sakshi", message: "Happy Birthday Kaushal🎂🎂✨🎊🎉" },
        { name: "Krati", message: "Happy Birthday yrrrrr" },
        { name: "Tanmay Singh", message: "Happy birthday bhai" },
        { name: "Khushboo", message: "Happiest Birthday Kaushal 🫶🏻🥳" },
        { name: "Vedd", message: "Happy Birthday bhai 🧿✨" },
        { name: "Shahid", message: "happy birthday bhai" },
        { name: "Shabd", message: "Happy Birthday kaushal bhaiya ✨💪🏻" },
        { name: "Lakshya Matha", message: "Happy birthday londe🫂🫶🏻" },
        { name: "Bhawna Didi", message: "happy birthday✨" },
        { name: "Harshit Pathak", message: "Happy birthday bro ✨" },
        { name: "Roshni", message: "Happy bday🎂🍫🍫🍫" },
        { name: "Umesh", message: "Happy birthday ladli 💖🎂🥳🥳" },
        { name: "Unnati", message: "Happy birthday Kaushal 🎂🎉" },
        { name: "Himanshu Agrawal", message: "Happy birthday bhai 🥂🥂" },
        { name: "Sunil", message: "Happy Birthday kaushal bhai" },
        { name: "Aditya Hada", message: "happy birthday sharmaji ke bete" },
        { name: "Tanmay Sharma", message: "Happy birthday 🫂💖" },
        { name: "Lokesh", message: "Happy Birthday Bhai 💗" },
        { name: "Tanishq", message: "Bhaiii happyy b'dayyy🫂😘🫶🏻.....Janamdinnki shubhkaanaayee✨" },
        { name: "Keshav", message: "happy birthday developer" },
        { name: "Ravi Sir", message: "Happy birthday babu✨🎉🎊" },
        { name: "Poha", message: "Janmdin ki badhai ho bhai 🫂❤️🥳😘" },
        { name: "Riyansh", message: "Happy Birthday bhai 🥳💐" },
        { name: "Himanshu Sharma", message: "Happy birthday bhai 🥳🥂" },
        { name: "Yash", message: "Happy birthday bhai" },
        { name: "Garima", message: "OMGGG!!! Happiest birthday Kaushalllllll🫶🏻🌻🌻......Hapiiiiessttt bdayyyyy!" },
        { name: "Vedant", message: "Happy birthday dost" },
        { name: "Karan", message: "happy birthday brother from another mother❤️" },
    ];

    function getAvatarUrl(name) {
        const seed = encodeURIComponent(name.trim());
        // Using high-end initials with vibrant gradients
        return `https://api.dicebear.com/8.x/initials/svg?seed=${seed}&backgroundType=gradientLinear&fontFamily=Arial,sans-serif&fontWeight=600`;
    }

    function buildMarqueeCard(wish) {
        return `
            <div class="wish-card glass-panel">
                <img src="${getAvatarUrl(wish.name)}" 
                     alt="${wish.name}" class="wish-avatar" loading="lazy">
                <div class="wish-content">
                    <strong>${wish.name}</strong>
                    <p>"${wish.message}"</p>
                </div>
            </div>`;
    }

    const track = document.getElementById('marquee-track');
    if (track) {
        const html = wishes.map(buildMarqueeCard).join('');
        track.innerHTML = html + html; // duplicate for seamless infinite loop

        // Pause on hover of any card
        track.querySelectorAll('.wish-card').forEach(card => {
            card.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
            card.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
        });
    }


    // --- 7. Audio Controls ---
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = musicBtn.querySelector('i');
    let isPlaying = false;
    music.volume = 0.3;

    function playMusic() {
        if (!isPlaying) {
            music.play().then(() => {
                isPlaying = true;
                musicIcon.classList.replace('ph-speaker-slash', 'ph-speaker-high');
            }).catch(e => {
                console.log("Autoplay blocked. Waiting for interaction.");
            });
        }
    }

    // Try to play immediately (might be blocked)
    playMusic();

    // Play on first interaction if blocked
    const startAudioOnInteraction = () => {
        playMusic();
        window.removeEventListener('click', startAudioOnInteraction);
        window.removeEventListener('scroll', startAudioOnInteraction);
        window.removeEventListener('touchstart', startAudioOnInteraction);
    };

    window.addEventListener('click', startAudioOnInteraction);
    window.addEventListener('scroll', startAudioOnInteraction, { passive: true });
    window.addEventListener('touchstart', startAudioOnInteraction, { passive: true });

    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent trigger the window click
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
        "Hey {name}!",
        "Yo {name}, you're a legend!",
        "To my dear friend {name}:",
        "Much love to you, {name}!",
        "Hey {name}, you just made my day!",
        "{name}, you're absolutely amazing!",
        "Big shoutout to {name}:",
        "A huge thank you to {name}!"
    ];

    const bodies = [
        "Your wish was like an overclocked GPU—pure power and zero lag in my heart-rig. 🖥️",
        "I scanned 10^12 timelines, and this is the one where your message made my day iconic. 🌌",
        "You’re basically the CSS that makes my life look beautiful. No cap. ✨",
        "Your birthday packet was received with 0% packet loss and 100% emotional impact. 📡",
        "If my life was a codebase, you’d be the most important library in my dependencies. 📦",
        "Your wish just added +500 XP to my maturity level (still stuck at level 1 though). 🎮",
        "I've updated my firmware. Version 'Kaushal-2.1' now includes a permanent {name} fan-club. 🦾",
        "Your message is currently the top-voted entry in my happiness database. 🗃️"
    ];

    const outtros = [
        "Stay legendary, stay you. ❤️🧿",
        "Leveling up wouldn't be the same without you! 🚀",
        "Sending you a virtual high-five across the multiverse! 🖐️✨",
        "Catch you on the next orbit around the sun! ☀️🌍",
        "Real ones like you are rare. Keep shining! 💎",
        "Error: Gratitude overflow. Ending session with a big hug! 🤗",
        "You’re the MVP of this celebration. Period. 🏆"
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
                colors: isRare ? ['#ffd700', '#ffaa00'] : ['#ff477e', '#ff7096']
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
                    colors: ['#ff477e', '#ff7096', '#c9184a', '#ffd700']
                });
            }
        }, 15000);
    });



    // Scroll-to-Top Surprise Button
    const surpriseBtn = document.getElementById('surprise-btn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        });
    }

    // --- 11. Wishlist Claim Buttons ---
    const claimBtns = document.querySelectorAll('.wishlist-card .small-btn');
    claimBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff477e', '#ff7096', '#c9184a']
            });
            
            // Change button state
            this.innerHTML = '<i class="ph ph-check-circle"></i> Claimed!';
            this.style.background = 'rgba(255, 71, 126, 0.2)';
            this.style.color = '#ff477e';
            this.style.border = '1px solid rgba(255, 71, 126, 0.4)';
            this.disabled = true;
        });
    });
});
