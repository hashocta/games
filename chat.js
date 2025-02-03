(function () {
    document.addEventListener("DOMContentLoaded", function () {
        // Create container for the button
        let topContainer = document.createElement("div");
        topContainer.id = "get-link-container";
        topContainer.style = "position: relative; text-align: center; padding: 10px; background: #f8f9fa; border: 1px solid #ddd; margin-bottom: 20px;";

        // Create initial button
        let getLinkBtn = document.createElement("button");
        getLinkBtn.id = "get-link-btn";
        getLinkBtn.innerText = "Click to Get Link";
        getLinkBtn.style = "padding: 10px 20px; font-size: 16px; cursor: pointer; border: none; background: #007bff; color: white; border-radius: 5px;";

        topContainer.appendChild(getLinkBtn);
        document.body.insertBefore(topContainer, document.body.firstChild);

        getLinkBtn.addEventListener("click", function () {
            startTimer();
        });
    });

    function startTimer() {
        let getLinkBtn = document.getElementById("get-link-btn");
        if (!getLinkBtn) return;

        let timer = 10;
        getLinkBtn.disabled = true;
        getLinkBtn.innerText = `Wait ${timer} seconds...`;
        getLinkBtn.style.background = "#ccc";
        getLinkBtn.style.cursor = "not-allowed";

        let interval = setInterval(() => {
            timer--;
            if (timer > 0) {
                getLinkBtn.innerText = `Wait ${timer} seconds...`;
            } else {
                clearInterval(interval);
                showScrollMessage();
            }
        }, 1000);
    }

    function showScrollMessage() {
        let getLinkBtn = document.getElementById("get-link-btn");
        getLinkBtn.innerText = "Scroll Down to Continue";
        getLinkBtn.style.background = "#28a745";
        getLinkBtn.style.cursor = "pointer";
        getLinkBtn.disabled = false;
        getLinkBtn.addEventListener("click", function () {
            document.documentElement.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
            showFinalButton();
        });
    }

    function showFinalButton() {
        let bottomContainer = document.createElement("div");
        bottomContainer.id = "final-container";
        bottomContainer.style = "text-align: center; padding: 10px; background: #f8f9fa; border: 1px solid #ddd; margin-top: 20px;";

        let finalBtn = document.createElement("button");
        finalBtn.id = "final-btn";
        finalBtn.innerText = "Get Link";
        finalBtn.style = "padding: 10px 20px; font-size: 16px; cursor: pointer; border: none; background: #dc3545; color: white; border-radius: 5px;";

        finalBtn.addEventListener("click", function () {
            window.location.href = "https://www.google.com";
        });

        bottomContainer.appendChild(finalBtn);
        document.body.appendChild(bottomContainer);
    }
})();
