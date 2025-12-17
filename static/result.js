document.addEventListener('DOMContentLoaded', function() {
    // Get prediction result from sessionStorage
    const resultData = sessionStorage.getItem('predictionResult');
    
    if (!resultData) {
        // No result data, redirect to home
        window.location.href = '/';
        return;
    }
    
    const result = JSON.parse(resultData);
    
    // Update result display
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const probabilityText = document.getElementById('probabilityText');
    
    const probability = (result.probability * 100).toFixed(2);
    
    if (result.prediction === 1) {
        // High risk
        resultIcon.innerHTML = '<span class="icon">🚨</span>';
        resultTitle.textContent = `Hello ${result.name || 'User'}, You have a High Risk of Stroke`;
        resultTitle.className = 'risk-high';
        probabilityText.textContent = `Risk Probability: ${probability}%`;
        probabilityText.className = 'probability risk-high';
    } else {
        // Low risk
        resultIcon.innerHTML = '<span class="icon">✅</span>';
        resultTitle.textContent = `Hello ${result.name || 'User'}, You have a Low Risk of Stroke`;
        resultTitle.className = 'risk-low';
        probabilityText.textContent = `Risk Probability: ${probability}%`;
        probabilityText.className = 'probability risk-low';
    }
    
    // Clear sessionStorage after displaying result
    // sessionStorage.removeItem('predictionResult');
});

