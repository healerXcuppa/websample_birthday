// birthday/main.js
        // variables for slideshow
        let currentSlide = 0;
        let slides = [];
        let isPlaying = false;
        const music = document.getElementById('birthdayMusic');
        
        // run when page loads
        window.onload = function() {
            createParticles();
            createStars();
            createConfetti();
            setInterval(createConfetti, 3000);
            updateSlides();
            initializeDots();
            autoSlide();
        };

        // make floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // make stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 2 + 's';
                starsContainer.appendChild(star);
            }
        }

        // create confetti animation
        function createConfetti() {
            const colors = ['#ff6b6b', '#4ecdc4', '#fed330', '#a55eea', '#f39c12', '#3498db'];
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = -10 + 'px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }
        }

        // play and pause music
        function toggleMusic() {
            const button = document.getElementById('playPauseBtn');
            const status = document.getElementById('musicStatus');
            
            if (isPlaying) {
                music.pause();
                button.innerHTML = '🎵 Play Birthday Song';
                status.textContent = 'Paused';
                status.style.background = 'rgba(255, 107, 107, 0.2)';
                status.style.color = '#ff6b6b';
                isPlaying = false;
            } else {
                music.play().then(() => {
                    button.innerHTML = '⏸️ Pause Music';
                    status.textContent = 'Playing';
                    status.style.background = 'rgba(78, 205, 196, 0.2)';
                    status.style.color = '#4ecdc4';
                    isPlaying = true;
                }).catch(error => {
                    console.log('Could not play audio:', error);
                    status.textContent = 'Click to play';
                });
            }
        }

        // change volume
        function changeVolume(value) {
            music.volume = value / 100;
        }

        // update which slide is showing
        function updateSlides() {
            slides = document.querySelectorAll('.slide');
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });
            updateDots();
        }

        // go to next or previous slide
        function changeSlide(direction) {
            slides = document.querySelectorAll('.slide');
            currentSlide += direction;
            
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            
            updateSlides();
        }

        // jump to specific slide
        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
        }

        // automatically change slides
        function autoSlide() {
            setInterval(() => {
                changeSlide(1);
            }, 5000);
        }

        // create dots for navigation
        function initializeDots() {
            const dotsContainer = document.getElementById('dotsContainer');
            slides = document.querySelectorAll('.slide');
            
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'dot';
                if (index === 0) dot.classList.add('active');
                dot.onclick = () => goToSlide(index);
                dotsContainer.appendChild(dot);
            });
        }

        // update which dot is active
        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentSlide) {
                    dot.classList.add('active');
                }
            });
        }

        // set starting volume
        music.volume = 0.7;