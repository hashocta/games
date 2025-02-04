<!-- Place this script at the bottom of your body or use defer -->
<script>
// JEE Score Calculator Script v3.0
(function() {
    // Create calculator container
    const calculator = document.createElement('div');
    calculator.id = 'jee-calculator-v3';

    // Calculator HTML structure
    calculator.innerHTML = `
        <div class="calc-header">
            <h3>JEE Mains 2025 Score Predictor</h3>
            <p class="calc-subtitle">Estimate your rank based on expected performance</p>
        </div>
        <div class="input-section">
            ${['Physics', 'Chemistry', 'Mathematics'].map(sub => `
                <div class="subject-card">
                    <div class="subject-header">${sub}</div>
                    <div class="input-group">
                        <div class="input-col">
                            <label>Correct Answers</label>
                            <input type="number" class="correct-input" data-subject="${sub.toLowerCase()}" min="0" max="25" placeholder="0">
                        </div>
                        <div class="input-col">
                            <label>Incorrect Attempts</label>
                            <input type="number" class="incorrect-input" data-subject="${sub.toLowerCase()}" min="0" max="25" placeholder="0">
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="controls">
            <button class="calc-btn">Calculate My Score</button>
            <button class="reset-btn">Reset</button>
            <div class="result-container">
                <div class="score-display">
                    <span class="score-label">Estimated Score:</span>
                    <span class="score-value">--</span>
                </div>
                <div class="percentile-display">
                    <span class="percentile-label">Expected Percentile:</span>
                    <span class="percentile-value">--</span>
                </div>
                <div class="score-analysis"></div>
            </div>
        </div>
    `;

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        /* Container styling */
        #jee-calculator-v3 {
            font-family: 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
            padding: 2rem;
            border: 1px solid #eee;
            transition: transform 0.3s ease;
        }
        #jee-calculator-v3:hover {
            transform: scale(1.01);
        }
        
        .calc-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .calc-header h3 {
            color: #2c3e50;
            margin: 0;
            font-size: 1.8em;
        }
        .calc-subtitle {
            color: #7f8c8d;
            margin-top: 0.5rem;
            font-size: 0.95em;
        }
        
        /* Subject Cards */
        .subject-card {
            background: #ffffff;
            border-radius: 12px;
            margin: 1rem 0;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .subject-header {
            color: #e74c3c;
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 1.1em;
            border-left: 4px solid #e74c3c;
            padding-left: 0.8rem;
        }
        
        /* Input Groups */
        .input-group {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
        }
        .input-col {
            flex: 1;
            min-width: 140px;
        }
        .input-col label {
            display: block;
            margin-bottom: 0.5rem;
            color: #34495e;
        }
        .input-col input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1em;
            transition: border-color 0.3s ease;
        }
        .input-col input:focus {
            border-color: #e74c3c;
            outline: none;
        }
        
        /* Buttons */
        .controls {
            text-align: center;
            margin-top: 2rem;
        }
        .calc-btn, .reset-btn {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: #fff;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            margin: 0.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .calc-btn:hover, .reset-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(231,76,60,0.3);
        }
        
        /* Result Container */
        .result-container {
            background: rgba(231,76,60,0.05);
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            display: none;
            animation: fadeIn 0.5s ease forwards;
        }
        .score-display, .percentile-display {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem 0;
            padding: 1rem;
            background: #ffffff;
            border-radius: 8px;
        }
        .score-value, .percentile-value {
            color: #e74c3c;
            font-weight: 700;
            font-size: 1.4em;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Responsive Design */
        @media (max-width: 600px) {
            #jee-calculator-v3 {
                margin: 1rem;
                padding: 1rem;
            }
            .input-group {
                flex-direction: column;
            }
        }
    `;

    // Function to calculate score and show results
    function calculateJeeScore() {
        const subjects = ['physics', 'chemistry', 'mathematics'];
        let totalScore = 0;
        
        // Validate inputs first
        for (const sub of subjects) {
            const correctInput = calculator.querySelector(`input[data-subject="${sub}"].correct-input`);
            const incorrectInput = calculator.querySelector(`input[data-subject="${sub}"].incorrect-input`);
            const correct = Number(correctInput.value) || 0;
            const incorrect = Number(incorrectInput.value) || 0;
            
            if (correct < 0 || correct > 25 || incorrect < 0 || incorrect > 25) {
                alert(`Please enter valid values (0-25) for ${sub.charAt(0).toUpperCase() + sub.slice(1)}`);
                return; // Stop calculation if validation fails
            }
        }
        
        // Calculate total score
        subjects.forEach(sub => {
            const correct = Number(calculator.querySelector(`input[data-subject="${sub}"].correct-input`).value) || 0;
            const incorrect = Number(calculator.querySelector(`input[data-subject="${sub}"].incorrect-input`).value) || 0;
            totalScore += (correct * 4) - (incorrect);
        });
        
        const range = calculatePercentile(totalScore);
        displayResults(totalScore, range);
    }
    
    // Function to determine percentile based on score ranges
    function calculatePercentile(score) {
        const ranges = [
            { min: 280, max: 300, percentile: "99.9+", color: "#27ae60" },
            { min: 250, max: 279, percentile: "99.7 - 99.9", color: "#2ecc71" },
            { min: 220, max: 249, percentile: "99.3 - 99.7", color: "#f1c40f" },
            { min: 200, max: 219, percentile: "98.5 - 99.3", color: "#f39c12" },
            { min: 180, max: 199, percentile: "97.5 - 98.5", color: "#e67e22" },
            { min: 150, max: 179, percentile: "94 - 97.5", color: "#d35400" },
            { min: 120, max: 149, percentile: "88 - 94", color: "#e74c3c" },
            { min: 90,  max: 119, percentile: "78 - 88", color: "#c0392b" },
            { min: 0,   max: 89,  percentile: "Below 78", color: "#7f8c8d" }
        ];
        
        // Return the matching range or default if none match
        return ranges.find(range => score >= range.min && score <= range.max) ||
               { percentile: "Not Available", color: "#000" };
    }
    
    // Function to display calculated results
    function displayResults(score, range) {
        const resultContainer = calculator.querySelector('.result-container');
        const scoreValue = calculator.querySelector('.score-value');
        const percentileValue = calculator.querySelector('.percentile-value');
        const analysis = calculator.querySelector('.score-analysis');
    
        scoreValue.textContent = `${score} / 300`;
        percentileValue.textContent = range.percentile;
        percentileValue.style.color = range.color;
        
        analysis.innerHTML = `
            <p>Based on previous trends, your performance corresponds to a <strong style="color: ${range.color}">${range.percentile}</strong> percentile.</p>
        `;
    
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Function to reset all inputs and hide results
    function resetCalculator() {
        calculator.querySelectorAll('input').forEach(input => input.value = '');
        const resultContainer = calculator.querySelector('.result-container');
        resultContainer.style.display = 'none';
    }
    
    // Event listeners
    calculator.querySelector('.calc-btn').addEventListener('click', calculateJeeScore);
    calculator.querySelector('.reset-btn').addEventListener('click', resetCalculator);
    calculator.querySelectorAll('input').forEach(input => {
        input.addEventListener('keyup', e => {
            if (e.key === 'Enter') calculateJeeScore();
        });
    });
    
    // Append style and calculator to document
    const currentScript = document.currentScript;
    currentScript.parentNode.insertBefore(style, currentScript);
    currentScript.parentNode.insertBefore(calculator, currentScript);
})();
</script>
