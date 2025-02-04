// JEE Mains 2025 Score Calculator v3.0
(function() {
    const createCalculator = () => {
        const calculator = document.createElement('div');
        calculator.id = 'jee-calculator-pro';
        calculator.innerHTML = `
            <div class="calc-container">
                <header class="calc-header">
                    <h2>JEE Mains 2025 Score Predictor</h2>
                    <p class="calc-subtitle">Enter your attempted answers to estimate your score</p>
                </header>
                
                <div class="input-section">
                    ${['Physics', 'Chemistry', 'Math'].map(sub => `
                        <fieldset class="subject-card">
                            <legend>${sub}</legend>
                            <div class="input-group">
                                <div class="input-field">
                                    <label>Correct Answers</label>
                                    <input type="number" class="correct-input" 
                                        data-subject="${sub.toLowerCase()}" 
                                        min="0" max="25" placeholder="0">
                                </div>
                                <div class="input-field">
                                    <label>Incorrect Attempts</label>
                                    <input type="number" class="incorrect-input" 
                                        data-subject="${sub.toLowerCase()}" 
                                        min="0" max="25" placeholder="0">
                                </div>
                            </div>
                        </fieldset>
                    `).join('')}
                </div>

                <div class="controls">
                    <button class="calc-btn">Calculate Score</button>
                    <div class="result-container">
                        <div class="result-card score-card">
                            <span>Total Marks</span>
                            <div class="score-value">--</div>
                        </div>
                        <div class="result-card percentile-card">
                            <span>Expected Percentile</span>
                            <div class="percentile-value">--</div>
                        </div>
                        <div class="analysis-message"></div>
                    </div>
                </div>
            </div>
        `;
        return calculator;
    };

    const addStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            #jee-calculator-pro {
                --primary: #d32f2f;
                --primary-dark: #b71c1c;
                --text: #2c3e50;
                --background: #f8f9fa;
                font-family: 'Segoe UI', system-ui;
                max-width: 800px;
                margin: 2rem auto;
                padding: 1rem;
            }

            .calc-container {
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.1);
                overflow: hidden;
            }

            .calc-header {
                background: var(--primary);
                color: white;
                padding: 1.5rem;
                text-align: center;
            }

            h2 {
                margin: 0;
                font-weight: 600;
                font-size: 1.8rem;
            }

            .calc-subtitle {
                margin: 0.5rem 0 0;
                opacity: 0.9;
            }

            .input-section {
                padding: 1.5rem;
            }

            fieldset {
                border: 2px solid #eee;
                border-radius: 12px;
                margin: 1rem 0;
                padding: 1rem;
            }

            legend {
                color: var(--text);
                font-weight: 600;
                padding: 0 0.5rem;
            }

            .input-group {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-top: 0.5rem;
            }

            .input-field {
                display: flex;
                flex-direction: column;
            }

            input {
                padding: 0.8rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }

            input:focus {
                border-color: var(--primary);
                outline: none;
            }

            .calc-btn {
                background: var(--primary);
                color: white;
                border: none;
                padding: 1rem;
                width: 100%;
                border-radius: 8px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin: 1rem 0;
            }

            .calc-btn:hover {
                background: var(--primary-dark);
                transform: translateY(-2px);
            }

            .result-container {
                display: none;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                padding: 1.5rem;
                background: var(--background);
                border-radius: 12px;
                margin-top: 1rem;
            }

            .result-card {
                text-align: center;
                padding: 1rem;
                border-radius: 8px;
                background: white;
            }

            .score-value, .percentile-value {
                font-size: 1.8rem;
                font-weight: 700;
                margin-top: 0.5rem;
            }

            .analysis-message {
                grid-column: span 2;
                text-align: center;
                padding: 1rem;
                font-size: 0.95rem;
            }

            @media (max-width: 600px) {
                .input-group {
                    grid-template-columns: 1fr;
                }
                
                .result-container {
                    grid-template-columns: 1fr;
                }
                
                .analysis-message {
                    grid-column: span 1;
                }
                
                #jee-calculator-pro {
                    margin: 1rem;
                    padding: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Calculator Logic
    const calculateScore = () => {
        const subjects = ['physics', 'chemistry', 'math'];
        let totalScore = 0;
        let isValid = true;

        for (const sub of subjects) {
            const correctInput = calculator.querySelector(`input[data-subject="${sub}"].correct-input`);
            const incorrectInput = calculator.querySelector(`input[data-subject="${sub}"].incorrect-input`);
            
            const correct = parseInt(correctInput.value) || 0;
            const incorrect = parseInt(incorrectInput.value) || 0;

            if (correct < 0 || correct > 25 || incorrect < 0 || incorrect > 25) {
                alert(`Invalid values for ${sub}! Please enter numbers between 0-25.`);
                isValid = false;
                break;
            }

            if ((correct + incorrect) > 25) {
                alert(`Total attempts for ${sub} cannot exceed 25!`);
                isValid = false;
                break;
            }

            totalScore += (correct * 4) - (incorrect * 1);
        }

        if (isValid) {
            const percentileData = calculatePercentile(totalScore);
            showResults(totalScore, percentileData);
        }
    };

    const calculatePercentile = (score) => {
        const ranges = [
            { min: 281, percentile: "99.99", color: "#2ecc71", note: "Top Rank" },
            { min: 250, percentile: "99.8+", color: "#27ae60", note: "Excellent" },
            { min: 220, percentile: "99.5+", color: "#f1c40f", note: "Very Good" },
            { min: 200, percentile: "98.5+", color: "#f39c12", note: "Good" },
            { min: 180, percentile: "97+", color: "#e67e22", note: "Above Average" },
            { min: 150, percentile: "94+", color: "#d35400", note: "Average" },
            { min: 0, percentile: "<94", color: "#e74c3c", note: "Needs Improvement" }
        ];
        
        return ranges.find(r => score >= r.min) || ranges[ranges.length-1];
    };

    const showResults = (score, range) => {
        const resultContainer = calculator.querySelector('.result-container');
        const scoreElement = calculator.querySelector('.score-value');
        const percentileElement = calculator.querySelector('.percentile-value');
        const analysisElement = calculator.querySelector('.analysis-message');

        scoreElement.textContent = `${score}/300`;
        percentileElement.textContent = range.percentile;
        
        scoreElement.style.color = range.color;
        percentileElement.style.color = range.color;
        
        analysisElement.innerHTML = `
            <div style="color: ${range.color}">
                ${range.note} • ${range.percentile} Percentile
            </div>
        `;

        resultContainer.style.display = 'grid';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Initialize Calculator
    const calculator = createCalculator();
    addStyles();
    
    // Event Listeners
    calculator.querySelector('.calc-btn').addEventListener('click', calculateScore);
    calculator.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') calculateScore();
        });
    });

    // Insert into DOM
    document.currentScript.parentNode.insertBefore(calculator, document.currentScript);
})();
