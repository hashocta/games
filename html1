<!-- Timer Section -->
<div id="timer-section" style="text-align: center; margin: 40px 0;">
    <button id="start-timer-button" style="padding: 12px 24px; font-size: 18px; cursor: pointer; border: none; border-radius: 8px; color: white; background: linear-gradient(45deg, #007bff, #0056b3); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;">
        Click Here to Start Timer
    </button>
    <p id="countdown-message" style="display: none; font-size: 18px; color: #ff5722; margin-top: 20px;">
        Please wait... <span id="countdown">10</span> seconds remaining.
    </p>
    <p id="prompt-message" style="display: none; font-size: 18px; color: #28a745; margin-top: 20px; font-weight: bold;">
        The download link has appeared below! Scroll down to access it.
    </p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-timer-button');
    const countdownMessage = document.getElementById('countdown-message');
    const promptMessage = document.getElementById('prompt-message');
    const countdownEl = document.getElementById('countdown');

    let countdownValue = 10; // Countdown duration in seconds

    startButton.addEventListener('click', function () {
        startButton.style.display = 'none';
        countdownMessage.style.display = 'block';

        const interval = setInterval(() => {
            countdownValue--;
            countdownEl.textContent = countdownValue;

            if (countdownValue <= 0) {
                clearInterval(interval);
                countdownMessage.style.display = 'none';
                promptMessage.style.display = 'block'; // Show prompt message
            }
        }, 1000);
    });
});
</script>
