(function () {
    'use strict';

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
        getLinkBtn.textContent = "🚀 Click to Get Link";

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
                padding: 15px;
                background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
                border: 3px solid #007bff;
                border-radius: 10px;
                margin: 20px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .${CSS_CLASSES.BUTTON} {
                padding: 12px 25px;
                font-size: 18px;
                cursor: pointer;
                border: none;
                background: linear-gradient(45deg, #007bff, #0062cc);
                color: white;
                border-radius: 8px;
                transition: all 0.3s ease;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                border: 2px solid #0056b3;
            }
            
            .${CSS_CLASSES.BUTTON}:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,123,255,0.4);
            }
            
            .${CSS_CLASSES.DISABLED} {
                background: linear-gradient(45deg, #6c757d, #495057) !important;
                cursor: not-allowed;
                border-color: #343a40;
            }
            
            .${CSS_CLASSES.SCROLL_PROMPT} {
                background: linear-gradient(45deg, #28a745, #1e7e34);
                border-color: #155724;
            }
            
            .${CSS_CLASSES.FINAL_CONTAINER} {
                text-align: center;
                padding: 15px;
                background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
                border: 3px solid #dc3545;
                border-radius: 10px;
                margin: 20px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            #final-btn {
                background: linear-gradient(45deg, #dc3545, #c82333);
                border: 2px solid #b21f2d;
            }
            
            #final-btn:hover {
                background: linear-gradient(45deg, #c82333, #bd2130);
                box-shadow: 0 5px 15px rgba(220,53,69,0.4);
            }
        `;
        document.head.appendChild(style);
    }

    function startTimer() {
        if (!getLinkBtn) return;

        let timer = 10;
        getLinkBtn.classList.add(CSS_CLASSES.DISABLED);
        getLinkBtn.textContent = `⏳ Wait ${timer} seconds...`;

        intervalId = setInterval(() => {
            timer--;
            getLinkBtn.textContent = `⏳ Wait ${timer} seconds...`;
            
            if (timer <= 0) {
                clearInterval(intervalId);
                showScrollMessage();
            }
        }, 1000);
    }

    function showScrollMessage() {
        getLinkBtn.classList.remove(CSS_CLASSES.DISABLED);
        getLinkBtn.classList.add(CSS_CLASSES.SCROLL_PROMPT);
        getLinkBtn.innerHTML = "👇 Scroll Down to Continue 🔍";
        
        getLinkBtn.addEventListener('click', handleScrollClick, { once: true });
    }

    function handleScrollClick() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
        
        setTimeout(showFinalButton, 500);
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
        
        // Add subtle animation when button appears
        setTimeout(() => {
            bottomContainer.style.transform = "translateY(0)";
            bottomContainer.style.opacity = "1";
        }, 50);
    }

    init();
})();
