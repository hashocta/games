(function () {
    'use strict';

    // Cache DOM references and CSS classes
    const CSS_CLASSES = {
        CONTAINER: 'gl-container',
        BUTTON: 'gl-button',
        DISABLED: 'gl-disabled',
        SCROLL_PROMPT: 'gl-scroll-prompt',
        FINAL_CONTAINER: 'gl-final-container'
    };

    let getLinkBtn, intervalId;

    function init() {
        document.addEventListener("DOMContentLoaded", () => {
            createButtonContainer();
            addStyleRules();
        });
    }

    function createButtonContainer() {
        const topContainer = document.createElement("div");
        topContainer.className = CSS_CLASSES.CONTAINER;

        getLinkBtn = document.createElement("button");
        getLinkBtn.id = "get-link-btn";
        getLinkBtn.className = CSS_CLASSES.BUTTON;
        getLinkBtn.textContent = "Click to Get Link";

        getLinkBtn.addEventListener("click", startTimer, { once: true });

        topContainer.appendChild(getLinkBtn);
        document.body.insertAdjacentElement("afterbegin", topContainer);
    }

    function addStyleRules() {
        const style = document.createElement('style');
        style.textContent = `
            .${CSS_CLASSES.CONTAINER} {
                position: relative;
                text-align: center;
                padding: 10px;
                background: #f8f9fa;
                border: 1px solid #ddd;
                margin-bottom: 20px;
            }
            
            .${CSS_CLASSES.BUTTON} {
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border: none;
                background: #007bff;
                color: white;
                border-radius: 5px;
                transition: background 0.3s ease;
            }
            
            .${CSS_CLASSES.DISABLED} {
                background: #ccc !important;
                cursor: not-allowed;
            }
            
            .${CSS_CLASSES.SCROLL_PROMPT} {
                background: #28a745;
            }
            
            .${CSS_CLASSES.FINAL_CONTAINER} {
                text-align: center;
                padding: 10px;
                background: #f8f9fa;
                border: 1px solid #ddd;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(style);
    }

    function startTimer() {
        if (!getLinkBtn) return;

        let timer = 10;
        getLinkBtn.classList.add(CSS_CLASSES.DISABLED);
        getLinkBtn.textContent = `Wait ${timer} seconds...`;

        intervalId = setInterval(() => {
            timer--;
            getLinkBtn.textContent = `Wait ${timer} seconds...`;
            
            if (timer <= 0) {
                clearInterval(intervalId);
                showScrollMessage();
            }
        }, 1000);
    }

    function showScrollMessage() {
        getLinkBtn.classList.remove(CSS_CLASSES.DISABLED);
        getLinkBtn.classList.add(CSS_CLASSES.SCROLL_PROMPT);
        getLinkBtn.textContent = "Scroll Down to Continue";
        
        getLinkBtn.addEventListener('click', handleScrollClick, { once: true });
    }

    function handleScrollClick() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
        
        // Delay final button creation until scroll completes
        setTimeout(showFinalButton, 500);
    }

    function showFinalButton() {
        if (document.getElementById('final-container')) return;

        const bottomContainer = document.createElement("div");
        bottomContainer.id = "final-container";
        bottomContainer.className = CSS_CLASSES.FINAL_CONTAINER;

        const finalBtn = document.createElement("button");
        finalBtn.className = CSS_CLASSES.BUTTON;
        finalBtn.textContent = "Get Link";
        finalBtn.style.backgroundColor = "#dc3545";
        finalBtn.addEventListener("click", () => {
            window.location.href = "https://www.google.com";
        });

        bottomContainer.appendChild(finalBtn);
        document.body.appendChild(bottomContainer);
    }

    init();
})();
