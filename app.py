from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# Load the trained model and preprocessing objects
try:
    with open('stroke_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    with open('label_encoders.pkl', 'rb') as f:
        label_encoders = pickle.load(f)
    
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    scaler = None
    label_encoders = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # Get form data
        data = request.json
        
        # Prepare features in the correct order
        features = [
            'gender',
            'age',
            'hypertension',
            'heart_disease',
            'ever_married',
            'work_type',
            'Residence_type',
            'avg_glucose_level',
            'bmi',
            'smoking_status'
        ]
        
        # Extract and encode categorical variables
        input_data = {}
        for feature in features:
            value = data.get(feature, '')
            
            if feature in ['gender', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']:
                # Encode categorical feature
                if feature in label_encoders:
                    try:
                        # Handle case-insensitive matching
                        value_str = str(value)
                        if feature == 'gender':
                            value_str = value_str.capitalize()
                        elif feature == 'ever_married':
                            value_str = value_str.capitalize()
                        elif feature == 'work_type':
                            if value_str == 'Private':
                                value_str = 'Private'
                            elif value_str == 'Self-employed':
                                value_str = 'Self-employed'
                            elif value_str == 'Govt_job' or value_str == 'Government':
                                value_str = 'Govt_job'
                            elif value_str == 'children' or value_str == 'Children':
                                value_str = 'children'
                            elif value_str == 'Never_worked' or value_str == 'Never worked':
                                value_str = 'Never_worked'
                        elif feature == 'Residence_type':
                            value_str = value_str.capitalize()
                        elif feature == 'smoking_status':
                            if value_str.lower() == 'never smoked':
                                value_str = 'never smoked'
                            elif value_str.lower() == 'formerly smoked':
                                value_str = 'formerly smoked'
                            elif value_str.lower() == 'unknown':
                                value_str = 'Unknown'
                            elif value_str.lower() == 'smokes' or value_str.lower() == 'smoking':
                                value_str = 'smokes'
                        
                        # Get all possible values
                        all_values = label_encoders[feature].classes_
                        # Find matching value (case-insensitive)
                        matched_value = None
                        for val in all_values:
                            if str(val).lower() == value_str.lower():
                                matched_value = val
                                break
                        
                        if matched_value is None:
                            # Use the first value as default
                            matched_value = all_values[0]
                        
                        input_data[feature] = label_encoders[feature].transform([matched_value])[0]
                    except:
                        # Use default encoding (first class)
                        input_data[feature] = 0
                else:
                    input_data[feature] = 0
            else:
                # Numerical feature
                try:
                    input_data[feature] = float(value)
                except:
                    input_data[feature] = 0.0
        
        # Create feature array in correct order
        feature_array = np.array([[input_data[f] for f in features]])
        
        # Scale the features
        feature_array_scaled = scaler.transform(feature_array)
        
        # Make prediction
        prediction = model.predict(feature_array_scaled)[0]
        probability = model.predict_proba(feature_array_scaled)[0]
        
        # Get probability of stroke (class 1)
        stroke_probability = probability[1] if len(probability) > 1 else 0
        
        result = {
            'prediction': int(prediction),
            'probability': float(stroke_probability),
            'message': 'High risk of stroke' if prediction == 1 else 'Low risk of stroke'
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/result')
def result():
    return render_template('result.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

