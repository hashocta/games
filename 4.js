(function () {
    'use strict';

    const CSS_CLASSES = {
        CONTAINER: 'gl-container',
        BUTTON: 'gl-button',
        DISABLED: 'gl-disabled',
        SCROLL_PROMPT: 'gl-scroll-prompt',
        FINAL_CONTAINER: 'gl-final-container'
    };

    let getLinkBtn;
    let timerData = {
        timeoutId: null,
        endTime: null,
        remaining: null,
        isPaused: false
    };

    document.addEventListener("DOMContentLoaded", () => {
        createButtonContainer();
        addStyleRules();
        setupVisibilityListener();
    });

    function setupVisibilityListener() {
        document.addEventListener('visibilitychange', () => {
            if (!timerData.endTime) return;
            document.hidden ? pauseTimer() : resumeTimer();
        });
    }

    function createButtonContainer() {
        const topContainer = document.createElement("div");
        topContainer.className = CSS_CLASSES.CONTAINER;
        
        const articleTitle = document.querySelector("article h1");
        if (articleTitle) {
            articleTitle.insertAdjacentElement("afterend", topContainer);
        } else {
            document.body.insertAdjacentElement("afterbegin", topContainer);
        }
        
        getLinkBtn = document.createElement("button");
        getLinkBtn.id = "get-link-btn";
        getLinkBtn.className = CSS_CLASSES.BUTTON;
        getLinkBtn.textContent = "🚀 Click to Get Link";
        getLinkBtn.addEventListener("click", startTimer, { once: true });

        topContainer.appendChild(getLinkBtn);
    }

    function addStyleRules() {
        const style = document.createElement('style');
        style.textContent = `
            .gl-container {
                text-align: center;
                margin-top: 10px;
            }
            .gl-button {
                font-size: 16px;
                padding: 8px 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                background-color: #007bff;
                color: white;
                transition: all 0.3s ease;
            }
            .gl-button:hover {
                background-color: #0056b3;
            }
            .gl-disabled {
                background-color: #6c757d;
                cursor: not-allowed;
            }
            .gl-scroll-prompt {
                background-color: #28a745;
            }
            .gl-final-container {
                text-align: center;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(style);
    }

    function startTimer() {
        if (!getLinkBtn) return;
        timerData.endTime = Date.now() + 10000;
        timerData.remaining = 10000;
        getLinkBtn.classList.add(CSS_CLASSES.DISABLED);
        updateButtonText();
        timerData.timeoutId = setTimeout(tick, 1000);
    }

    function tick() {
        if (document.hidden || timerData.isPaused) return;

        timerData.remaining = timerData.endTime - Date.now();
        if (timerData.remaining <= 0) {
            finishTimer();
        } else {
            updateButtonText();
            timerData.timeoutId = setTimeout(tick, 1000);
        }
    }

    function pauseTimer() {
        if (!timerData.endTime) return;
        timerData.isPaused = true;
        clearTimeout(timerData.timeoutId);
        getLinkBtn.textContent = "⏸ Timer Paused (Switch Back to Continue)";
    }

    function resumeTimer() {
        if (!timerData.endTime || !timerData.isPaused) return;
        timerData.isPaused = false;
        timerData.endTime = Date.now() + timerData.remaining;
        updateButtonText();
        timerData.timeoutId = setTimeout(tick, 1000);
    }

    function updateButtonText() {
        const seconds = Math.ceil(timerData.remaining / 1000);
        getLinkBtn.textContent = `⏳ Wait ${seconds} second${seconds !== 1 ? 's' : ''}...`;
    }

    function finishTimer() {
        clearTimeout(timerData.timeoutId);
        timerData.endTime = null;
        timerData.remaining = null;
        timerData.isPaused = false;
        showScrollMessage();
    }

    function showScrollMessage() {
        getLinkBtn.classList.remove(CSS_CLASSES.DISABLED);
        getLinkBtn.classList.add(CSS_CLASSES.SCROLL_PROMPT);
        getLinkBtn.innerHTML = "👇 Scroll Down to Continue 🔍";
    }

    function showFinalButton() {
        if (document.getElementById('final-container')) return;
        
        const bottomContainer = document.createElement("div");
        bottomContainer.id = "final-container";
        bottomContainer.className = CSS_CLASSES.FINAL_CONTAINER;

        const finalBtn = document.createElement("button");
        finalBtn.className = CSS_CLASSES.BUTTON;
        finalBtn.id = "final-btn";
        finalBtn.innerHTML = "🎯 Get Link Now! 🚀";
        
        finalBtn.addEventListener("click", () => {
            window.location.href = "https://www.google.com";
        });

        bottomContainer.appendChild(finalBtn);
        document.body.appendChild(bottomContainer);
    }
})();
