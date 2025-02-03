<!-- Save as "link-timer.js" and host on GitHub -->
<script>
(() => {
    "use strict";
    const VERSION = "2.3.1";
    const DEBUG_MODE = false;
    const SECURITY_KEY = crypto.randomUUID();
    
    class LinkController {
        constructor() {
            this.startTime = null;
            this.timerActive = false;
            this.articleContent = document.querySelector('article');
            this.init();
        }

        init() {
            this.injectStyles();
            this.createInitialUI();
            this.setupSecurity();
            this.registerSW();
        }

        injectStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .lt-btn {
                    padding: 15px 30px;
                    border: none;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s, filter 0.2s;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                
                .lt-btn:disabled {
                    background: #4b5563;
                    cursor: not-allowed;
                }
                
                .lt-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    filter: brightness(110%);
                }
                
                .lt-timer {
                    font-size: 1.2em;
                    margin: 15px 0;
                    color: #374151;
                }
                
                .lt-security {
                    display: none;
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .lt-btn {
                        transition: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        createInitialUI() {
            const btnContainer = document.createElement('div');
            btnContainer.style.textAlign = 'center';
            btnContainer.style.margin = '20px 0';
            
            this.initialBtn = document.createElement('button');
            this.initialBtn.className = 'lt-btn';
            this.initialBtn.textContent = 'Click to Get Link';
            
            this.timerDisplay = document.createElement('div');
            this.timerDisplay.className = 'lt-timer';
            
            btnContainer.append(this.initialBtn, this.timerDisplay);
            
            if (this.articleContent) {
                this.articleContent.prepend(btnContainer);
            } else {
                document.body.prepend(btnContainer);
            }

            this.initialBtn.addEventListener('click', () => this.startCountdown());
        }

        startCountdown() {
            if (this.timerActive) return;
            
            this.timerActive = true;
            this.startTime = performance.now();
            this.initialBtn.disabled = true;
            
            const securityField = document.createElement('input');
            securityField.type = 'hidden';
            securityField.className = 'lt-security';
            securityField.value = SECURITY_KEY;
            document.body.appendChild(securityField);

            let seconds = 10;
            const timerInterval = setInterval(() => {
                this.timerDisplay.textContent = `Time remaining: ${seconds}s`;
                seconds--;
                
                if (seconds < 0) {
                    clearInterval(timerInterval);
                    this.handleTimerComplete();
                }
            }, 1000);
        }

        handleTimerComplete() {
            this.timerDisplay.innerHTML = '⏳ Scroll down to continue ➔';
            this.createEndButton();
            this.addScrollListener();
            this.enableSecurityChecks();
        }

        createEndButton() {
            const endBtn = document.createElement('button');
            endBtn.className = 'lt-btn';
            endBtn.textContent = 'Get Your Link Now';
            endBtn.style.margin = '40px auto';
            endBtn.style.display = 'block';
            
            endBtn.addEventListener('click', (e) => {
                if (!this.validateAccess()) {
                    e.preventDefault();
                    alert('Access denied. Please complete the timer properly.');
                    return;
                }
                window.open('https://google.com', '_blank');
            });

            const targetSection = this.articleContent || document.body;
            targetSection.appendChild(endBtn);
            this.animateButton(endBtn);
        }

        animateButton(btn) {
            let scale = 1;
            const animate = () => {
                scale = scale === 1 ? 1.05 : 1;
                btn.style.transform = `scale(${scale})`;
                requestAnimationFrame(animate);
            };
            animate();
        }

        addScrollListener() {
            let lastScroll = window.pageYOffset;
            const checkScroll = () => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > lastScroll + 100) {
                    this.timerDisplay.style.opacity = '0.5';
                    window.removeEventListener('scroll', checkScroll);
                }
                lastScroll = currentScroll;
            };
            window.addEventListener('scroll', checkScroll);
        }

        setupSecurity() {
            Object.defineProperty(window, 'SECURITY_KEY', {
                value: SECURITY_KEY,
                writable: false,
                configurable: false
            });
            
            const handler = {
                set(target, prop, value) {
                    if (prop === 'timerActive') return false;
                    return Reflect.set(...arguments);
                }
            };
            
            this.securityProxy = new Proxy(this, handler);
        }

        enableSecurityChecks() {
            const checkTamper = setInterval(() => {
                if (!document.querySelector('.lt-security')?.value === SECURITY_KEY) {
                    this.timerDisplay.textContent = 'Security violation detected!';
                    clearInterval(checkTamper);
                }
            }, 500);
        }

        validateAccess() {
            const timeElapsed = performance.now() - this.startTime;
            return this.timerActive && 
                   timeElapsed >= 10000 && 
                   document.querySelector('.lt-security')?.value === SECURITY_KEY;
        }

        async registerSW() {
            if ('serviceWorker' in navigator) {
                try {
                    await navigator.serviceWorker.register('sw.js');
                    if (DEBUG_MODE) console.log('Service Worker registered');
                } catch (error) {
                    console.error('SW registration failed:', error);
                }
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const controller = new LinkController();
        if (DEBUG_MODE) console.log(`LinkController v${VERSION} initialized`);
    });

    // Advanced error handling
    window.addEventListener('error', (e) => {
        console.error(`Script Error: ${e.message} @ ${e.filename}:${e.lineno}`);
    });
})();
</script>
