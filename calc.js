function calculateScore() {
    const phyCorrect = parseInt(document.getElementById('phy-correct').value) || 0;
    const phyIncorrect = parseInt(document.getElementById('phy-incorrect').value) || 0;
    const chemCorrect = parseInt(document.getElementById('chem-correct').value) || 0;
    const chemIncorrect = parseInt(document.getElementById('chem-incorrect').value) || 0;
    const mathCorrect = parseInt(document.getElementById('math-correct').value) || 0;
    const mathIncorrect = parseInt(document.getElementById('math-incorrect').value) || 0;

    if ([phyCorrect, phyIncorrect, chemCorrect, chemIncorrect, mathCorrect, mathIncorrect].some(val => val < 0 || val > 25)) {
        alert("Values must be between 0 and 25!");
        return;
    }

    const totalScore = 
        (phyCorrect * 4 - phyIncorrect * 1) + 
        (chemCorrect * 4 - chemIncorrect * 1) + 
        (mathCorrect * 4 - mathIncorrect * 1);

    let percentile;
    if (totalScore >= 280) percentile = "99.9+";
    else if (totalScore >= 250) percentile = "99.7 - 99.9";
    else if (totalScore >= 220) percentile = "99.3 - 99.7";
    else if (totalScore >= 200) percentile = "98.5 - 99.3";
    else if (totalScore >= 180) percentile = "97.5 - 98.5";
    else if (totalScore >= 150) percentile = "94 - 97.5";
    else if (totalScore >= 120) percentile = "88 - 94";
    else if (totalScore >= 90) percentile = "78 - 88";
    else percentile = "Below 78";

    document.getElementById('result').innerHTML = 
        `Your Estimated Score: <strong>${totalScore}/300</strong><br>
         Predicted Percentile: <strong>${percentile}</strong>`;
}
