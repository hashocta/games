// JEE Score Calculator Script v2.0
(function() {
    // Create calculator container
    const calculator = document.createElement('div');
    calculator.id = 'jee-calculator-v2';
    
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
                            <input type="number" class="correct-input" 
                                data-subject="${sub.toLowerCase()}" 
                                min="0" max="25" placeholder="0">
                        </div>
                        <div class="input-col">
                            <label>Incorrect Attempts</label>
                            <input type="number" class="incorrect-input" 
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
        #jee-calculator-v2 {
            font-family: 'Segoe UI', system-ui;
            max-width: 800px;
            margin: 2rem auto;
            background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
            padding: 2rem;
            border: 1px solid #eee;
        }

        .calc-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        h3 {
            color: #2c3e50;
            margin: 0;
            font-size: 1.8em;
        }

        .calc-subtitle {
            color: #7f8c8d;
            margin: 0.5rem 0 0;
            font-size: 0.95em;
        }

        .subject-card {
            background: rgba(255,255,255,0.9);
            border-radius: 12px;
            margin: 1rem 0;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: transform 0.2s ease;
        }

        .subject-card:hover {
            transform: translateY(-2px);
        }

        .subject-header {
            color: #e74c3c;
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 1.1em;
            border-left: 4px solid #e74c3c;
            padding-left: 0.8rem;
        }

        .input-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
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

        .calc-btn {
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin: 1.5rem 0;
        }

        .calc-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(231,76,60,0.3);
        }

        .result-container {
            background: rgba(231,76,60,0.05);
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            display: none;
        }

        .score-display, .percentile-display {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem 0;
            padding: 1rem;
            background: white;
            border-radius: 8px;
        }

        .score-value, .percentile-value {
            color: #e74c3c;
            font-weight: 700;
            font-size: 1.4em;
        }

        @media (max-width: 600px) {
            .input-group {
                grid-template-columns: 1fr;
            }
            
            #jee-calculator-v2 {
                margin: 1rem;
                padding: 1rem;
            }
        }
    `;

    // Functionality
    function calculateJeeScore() {
        const subjects = ['physics', 'chemistry', 'mathematics'];
        let totalScore = 0;

        subjects.forEach(sub => {
            const correct = parseInt(calculator.querySelector(`input[data-subject="${sub}"].correct-input`).value) || 0;
            const incorrect = parseInt(calculator.querySelector(`input[data-subject="${sub}"].incorrect-input`).value) || 0;
            
            if (correct < 0 || correct > 25 || incorrect < 0 || incorrect > 25) {
                alert(`Please enter valid values (0-25) for ${sub.charAt(0).toUpperCase() + sub.slice(1)}`);
                return;
            }

            totalScore += (correct * 4) - (incorrect * 1);
        });

        const percentile = calculatePercentile(totalScore);
        displayResults(totalScore, percentile);
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
            <div class="analysis-message">
                Based on previous year trends, your score suggests:<br>
                <strong style="color: ${range.color}">${range.percentile} percentile</strong>
            </div>
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
