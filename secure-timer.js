// secure-timer.js
(() => {
    // Web Worker for bulletproof timers
    const timerWorker = new Worker(URL.createObjectURL(new Blob([`
        self.onmessage = function(e) {
            const targetTime = Date.now() + e.data.duration;
            function checkTime() {
                const remaining = targetTime - Date.now();
                if(remaining <= 0) {
                    self.postMessage({done: true});
                } else {
                    self.postMessage({remaining: remaining});
                    setTimeout(checkTime, 50);
                }
            }
            checkTime();
        }
    `], {type: 'text/javascript'})));

    // Intersection Observer for scroll detection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                createFinalButton();
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 1});

    // Secure button container
    const container = document.createElement('div');
    Object.assign(container.style, {
        position: 'fixed', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50)',
        zIndex: 10000
    });

    // Initial button creation
    const initialButton = createButton('Click to Get Link', () => {
        initialButton.disabled = true;
        startCountdown();
    });

    container.appendChild(initialButton);
    document.body.prepend(container);

    function startCountdown() {
        const progress = document.createElement('div');
        const spinner = createSpinner();
        const countdown = document.createElement('span');
        
        container.innerHTML = '';
        container.append(spinner, countdown);

        timerWorker.postMessage({duration: 10000});
        
        timerWorker.onmessage = (e) => {
            if(e.data.done) {
                container.innerHTML = 'Scroll down to continue';
                observeEndOfArticle();
            } else {
                countdown.textContent = `${(e.data.remaining/1000).toFixed(1)}s`;
            }
        };
    }

    function createFinalButton() {
        const finalButton = createButton('GET LINK', () => {
            window.location.href = 'https://google.com';
        });
        
        finalButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 30px;
            font-size: 1.2em;
        `;
        
        document.body.appendChild(finalButton);
    }

    function observeEndOfArticle() {
        const sentinel = document.createElement('div');
        document.body.appendChild(sentinel);
        observer.observe(sentinel);
    }

    function createButton(text, onClick) {
        const btn = document.createElement('button');
        btn.textContent = text;
        Object.assign(btn.style, {
            padding: '12px 24px',
            fontSize: '1.1em',
            background: 'linear-gradient(145deg, #2ecc71, #27ae60)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.1s, filter 0.1s'
        });
        
        btn.addEventListener('click', onClick);
        btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.95)');
        btn.addEventListener('mouseup', () => btn.style.transform = '');
        btn.addEventListener('mouseenter', () => btn.style.filter = 'brightness(1.1)');
        btn.addEventListener('mouseleave', () => btn.style.filter = '');
        
        return btn;
    }

    function createSpinner() {
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        return spinner;
    }

    // Anti-tampering measures
    Object.freeze(Object.prototype);
    Object.freeze(Array.prototype);
    Object.seal(window);
})();
