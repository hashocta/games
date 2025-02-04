// JEE Score Calculator Script v2.0
(function() {
    // Create calculator container
    const calculator = document.createElement('div');
    calculator.id = 'jee-calculator-v2';
    
    // Calculator HTML structure
    calculator.innerHTML = `
        <div class="calc-header">
            <h3>JEE Mains 2025 Score Predictor</h3>
            <p class="calc-subtitle">Estimate your rank based on your expected performance</p>
        </div>
        <div class="input-section">
            ${['Physics', 'Chemistry', 'Mathematics'].map(sub => `
                <div class="subject-card">
                    <div class="subject-header">${sub}</div>
                    <div class="input-group">
                        <div class="input-col">
                            <label for="${sub.toLowerCase()}-correct">Correct Answers</label>
                            <input id="${sub.toLowerCase()}-correct" type="number" class="correct-input" 
                                data-subject="${sub.toLowerCase()}" 
                                min="0" max="25" placeholder="0">
                        </div>
                        <div class="input-col">
                            <label for="${sub.toLowerCase()}-incorrect">Incorrect Attempts</label>
                            <input id="${sub.toLowerCase()}-incorrect" type="number" class="incorrect-input" 
                                data-subject="${sub.toLowerCase()}" 
                                min="0" max="25" placeholder="0">
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="controls">
            <button class="calc-btn">Calculate My Score</button>
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

    // Style implementation
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary-color: #e74c3c;
            --secondary-color: #c0392b;
            --accent-color: #2ecc71;
            --text-color: #2c3e50;
            --subtext-color: #7f8c8d;
            --bg-color: #ffffff;
            --light-bg: #f8f9fa;
            --shadow-color: rgba(0, 0, 0, 0.12);
            --transition-speed: 0.3s;
            --border-radius: 12px;
        }

        #jee-calculator-v2 {
            font-family: 'Segoe UI', system-ui, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            background: var(--bg-color);
            border-radius: 16px;
            box-shadow: 0 8px 30px var(--shadow-color);
            padding: 2rem;
            border: 1px solid #eee;
            transition: box-shadow var(--transition-speed) ease;
        }
        
        #jee-calculator-v2:hover {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .calc-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .calc-header h3 {
            color: var(--text-color);
            margin: 0;
            font-size: 1.8em;
        }

        .calc-subtitle {
            color: var(--subtext-color);
            margin: 0.5rem 0 0;
            font-size: 0.95em;
        }

        .subject-card {
            background: var(--bg-color);
            border-radius: var(--border-radius);
            margin: 1rem 0;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
        }

        .subject-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .subject-header {
            color: var(--primary-color);
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 1.1em;
            border-left: 4px solid var(--primary-color);
            padding-left: 0.8rem;
        }

        .input-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .input-col {
            display: flex;
            flex-direction: column;
        }

        .input-col label {
            margin-bottom: 0.5rem;
            font-size: 0.9em;
            color: var(--text-color);
        }

        .input-col input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: var(--border-radius);
            font-size: 1em;
            transition: border-color var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
        }

        .input-col input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 8px rgba(231, 76, 60, 0.2);
            outline: none;
        }

        .controls {
            margin-top: 2rem;
        }

        .calc-btn {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: #fff;
            border: none;
            padding: 1rem 2rem;
            border-radius: var(--border-radius);
            font-weight: 600;
            cursor: pointer;
            transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
            width: 100%;
            margin: 1.5rem 0;
            font-size: 1em;
        }

        .calc-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(231,76,60,0.3);
        }

        .calc-btn:active {
            transform: translateY(1px);
            box-shadow: none;
        }

        .result-container {
            background: #fafafa;
            border-radius: var(--border-radius);
            padding: 1.5rem;
            margin-top: 1.5rem;
            display: none;
            border: 1px solid #ddd;
            animation: fadeIn 0.5s ease forwards;
        }

        .score-display, .percentile-display {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem 0;
            padding: 1rem;
            background: #fff;
            border-radius: var(--border-radius);
            border: 1px solid #eee;
        }

        .score-label, .percentile-label {
            font-size: 1em;
            color: var(--text-color);
        }

        .score-value, .percentile-value {
            color: var(--primary-color);
            font-weight: 700;
            font-size: 1.4em;
        }

        .score-analysis {
            margin-top: 1rem;
            font-size: 0.95em;
            color: var(--text-color);
            text-align: center;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
            .input-group {
                grid-template-columns: 1fr;
            }
            
            #jee-calculator-v2 {
                margin: 1rem;
                padding: 1rem;
            }

            .calc-btn {
                padding: 0.8rem 1rem;
                font-size: 0.95em;
            }
        }
    `;

    // Functionality
    function calculateJeeScore() {
        const subjects = ['physics', 'chemistry', 'mathematics'];
        let totalScore = 0;
        let valid = true;
        
        subjects.forEach(sub => {
            const correctInput = calculator.querySelector(`input[data-subject="${sub}"].correct-input`);
            const incorrectInput = calculator.querySelector(`input[data-subject="${sub}"].incorrect-input`);
            const correct = parseInt(correctInput.value) || 0;
            const incorrect = parseInt(incorrectInput.value) || 0;
            
            if (correct < 0 || correct > 25 || incorrect < 0 || incorrect > 25) {
                alert(`Please enter valid values (0-25) for ${sub.charAt(0).toUpperCase() + sub.slice(1)}`);
                valid = false;
                return;
            }
    
            totalScore += (correct * 4) - (incorrect * 1);
        });
        
        if (!valid) return;
        const range = calculatePercentile(totalScore);
        displayResults(totalScore, range);
    }
    
    function calculatePercentile(score) {
        const percentileRanges = [
            { min: 280, max: 300, percentile: "99.9+", color: "#27ae60" },
            { min: 250, max: 279, percentile: "99.7 - 99.9", color: "#2ecc71" },
            { min: 220, max: 249, percentile: "99.3 - 99.7", color: "#f1c40f" },
            { min: 200, max: 219, percentile: "98.5 - 99.3", color: "#f39c12" },
            { min: 180, max: 199, percentile: "97.5 - 98.5", color: "#e67e22" },
            { min: 150, max: 179, percentile: "94 - 97.5", color: "#d35400" },
            { min: 120, max: 149, percentile: "88 - 94", color: "#e74c3c" },
            { min: 90, max: 119, percentile: "78 - 88", color: "#c0392b" },
            { min: 0, max: 89, percentile: "Below 78", color: "#7f8c8d" }
        ];
    
        return percentileRanges.find(range => score >= range.min && score <= range.max);
    }
    
    function displayResults(score, range) {
        const resultContainer = calculator.querySelector('.result-container');
        const scoreValue = calculator.querySelector('.score-value');
        const percentileValue = calculator.querySelector('.percentile-value');
        const analysis = calculator.querySelector('.score-analysis');
    
        scoreValue.textContent = `${score}/300`;
        percentileValue.textContent = range.percentile;
        percentileValue.style.color = range.color;
        
        analysis.innerHTML = `
            Based on previous trends, your score suggests a performance in the
            <strong style="color: ${range.color}">${range.percentile} percentile</strong>.
        `;
    
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Event listeners
    calculator.querySelector('.calc-btn').addEventListener('click', calculateJeeScore);
    calculator.querySelectorAll('input').forEach(input => {
        input.addEventListener('keyup', e => {
            if (e.key === 'Enter') calculateJeeScore();
        });
    });
    
    // Append to document
    document.currentScript.parentNode.insertBefore(style, document.currentScript);
    document.currentScript.parentNode.insertBefore(calculator, document.currentScript);
})();
