document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const heightUnit = document.getElementById('height_unit');
    const weightUnit = document.getElementById('weight_unit');
    const heightImperial = document.getElementById('height_imperial');
    const heightMetric = document.getElementById('height_metric');
    const heightFeet = document.getElementById('height_feet');
    const heightInches = document.getElementById('height_inches');
    const heightCm = document.getElementById('height_cm');
    const weightInput = document.getElementById('weight');
    const weightHint = document.getElementById('weight_hint');
    const bmiInput = document.getElementById('bmi');
    const manualBmiToggle = document.getElementById('manual_bmi_toggle');
    // Defensive: ensure BMI input is readonly (calculated automatically)
    if (bmiInput) {
        // Initialize to auto-calc mode by default (readonly)
        bmiInput.readOnly = true;
        bmiInput.disabled = false; // keep it submittable
        bmiInput.style.cursor = 'not-allowed';
        bmiInput.style.backgroundColor = '#f0f0f0';
        bmiInput.classList.add('bmi-input');
    }
    // If manual toggle exists, set up behavior
    if (manualBmiToggle && bmiInput) {
        manualBmiToggle.addEventListener('change', function() {
            if (manualBmiToggle.checked) {
                // Allow manual edits
                bmiInput.readOnly = false;
                bmiInput.style.cursor = '';
                bmiInput.style.backgroundColor = '';
            } else {
                // Make it readonly and recalculate
                bmiInput.readOnly = true;
                bmiInput.style.cursor = 'not-allowed';
                bmiInput.style.backgroundColor = '#f0f0f0';
                calculateBMI();
            }
        });
    }
    
    // Update weight hint and max value based on unit
    function updateWeightHint() {
        if (weightUnit.value === 'lbs') {
            weightHint.textContent = 'Range: 0-1100 lbs | Common: 110-220 lbs';
            weightInput.setAttribute('max', '1100');
            weightInput.setAttribute('placeholder', 'e.g., 154');
        } else {
            weightHint.textContent = 'Range: 0-500 kg | Common: 50-100 kg';
            weightInput.setAttribute('max', '500');
            weightInput.setAttribute('placeholder', 'e.g., 70');
        }
    }
    
    // Function to calculate BMI
    function calculateBMI() {
        let heightInMeters = 0;
        let weightInKg = 0;
        
        // Get height in meters
        if (heightUnit.value === 'imperial') {
            const feet = parseFloat(heightFeet.value) || 0;
            const inches = parseFloat(heightInches.value) || 0;
            if (feet > 0 || inches > 0) {
                const totalInches = (feet * 12) + inches;
                heightInMeters = totalInches * 0.0254; // Convert inches to meters
            }
        } else {
            const cm = parseFloat(heightCm.value) || 0;
            if (cm > 0) {
                heightInMeters = cm / 100; // Convert cm to meters
            }
        }
        
        // Get weight in kg
        const weight = parseFloat(weightInput.value) || 0;
        if (weight > 0) {
            if (weightUnit.value === 'lbs') {
                weightInKg = weight * 0.453592; // Convert lbs to kg
            } else {
                weightInKg = weight;
            }
        }
        
        // Calculate BMI: weight (kg) / height (m)²
        if (heightInMeters > 0 && weightInKg > 0) {
            const bmi = weightInKg / (heightInMeters * heightInMeters);
            // Only write the calculated BMI if auto mode is on (not manual)
            if (!manualBmiToggle || !manualBmiToggle.checked) {
                bmiInput.value = bmi.toFixed(1);
            }
        } else {
            // Only clear if auto mode is on
            if (!manualBmiToggle || !manualBmiToggle.checked) {
                bmiInput.value = '';
            }
        }
    }
    
    // Handle height unit change
    heightUnit.addEventListener('change', function() {
        if (this.value === 'imperial') {
            heightImperial.style.display = 'flex';
            heightMetric.style.display = 'none';
            heightCm.removeAttribute('required');
            heightFeet.setAttribute('required', 'required');
            heightInches.setAttribute('required', 'required');
        } else {
            heightImperial.style.display = 'none';
            heightMetric.style.display = 'block';
            heightFeet.removeAttribute('required');
            heightInches.removeAttribute('required');
            heightCm.setAttribute('required', 'required');
        }
        calculateBMI();
    });
    
    // Update weight hint when unit changes
    weightUnit.addEventListener('change', function() {
        updateWeightHint();
        calculateBMI();
    });
    
    // Initialize weight hint and calculate BMI on load
    updateWeightHint();
    calculateBMI();
    
    // Add event listeners for BMI calculation
    heightFeet.addEventListener('input', calculateBMI);
    heightInches.addEventListener('input', calculateBMI);
    heightCm.addEventListener('input', calculateBMI);
    weightInput.addEventListener('input', calculateBMI);
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate BMI is calculated
        const bmiValue = parseFloat(bmiInput.value);
        if (!bmiValue || bmiValue <= 0) {
            alert('Please enter height and weight to calculate BMI.');
            return;
        }
        
        // Disable submit button and show loading state
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        form.classList.add('loading');
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            gender: document.getElementById('gender').value,
            age: parseFloat(document.getElementById('age').value),
            hypertension: parseInt(document.getElementById('hypertension').value),
            heart_disease: parseInt(document.getElementById('heart_disease').value),
            ever_married: document.getElementById('ever_married').value,
            work_type: document.getElementById('work_type').value,
            Residence_type: document.getElementById('Residence_type').value,
            avg_glucose_level: parseFloat(document.getElementById('avg_glucose_level').value),
            bmi: bmiValue,
            smoking_status: document.getElementById('smoking_status').value
        };
        
        try {
            // Send prediction request to backend
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Store result in sessionStorage to pass to result page
                sessionStorage.setItem('predictionResult', JSON.stringify({
                    ...result,
                    name: formData.name
                }));
                
                // Redirect to result page
                window.location.href = '/result';
            } else {
                // Show error message
                alert('Error: ' + (result.error || 'Something went wrong. Please try again.'));
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
                form.classList.remove('loading');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please make sure the server is running and try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
            form.classList.remove('loading');
        }
    });
    
    // Input validation
    const inputs = form.querySelectorAll('input[type="number"]:not(#bmi)');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
    
    // If there is code that sets bmiInput.value on load, remove or guard it.
    // Safe read when submitting or preparing payload:
    function readFormValues() {
      // ...existing code...
      const bmiRaw = bmiInput ? bmiInput.value.trim() : '';
      const bmi = bmiRaw === '' ? null : parseFloat(bmiRaw);
      // use `bmi` (number or null) in your payload/model input
      // ...existing code...
    }
});
