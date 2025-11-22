# Brain Stroke Prediction Web Application

A web application that predicts the risk of brain stroke using Machine Learning (Logistic Regression) based on patient health data.

## Features

- **Machine Learning Model**: Logistic Regression with 95.88% accuracy
- **Interactive Web Interface**: User-friendly form to input patient data
- **Real-time Prediction**: Instant stroke risk assessment
- **Prevention Tips**: Educational content to help reduce stroke risk

## Installation

1. Make sure you have Python 3.7+ installed

2. Install required packages:
```bash
pip install pandas numpy scikit-learn flask
```

## Usage

1. **Train the Model** (already done, but you can retrain):
```bash
python train_model.py
```

2. **Run the Flask Application**:
```bash
python app.py
```

3. **Access the Web Application**:
   - Open your browser and go to: `http://localhost:5000`
   - Fill in the patient details form
   - Click "Submit" to get the stroke risk prediction

## Model Details

- **Algorithm**: Logistic Regression
- **Features Used**:
  - Gender
  - Age
  - Hypertension (Yes/No)
  - Heart Disease (Yes/No)
  - Ever Married (Yes/No)
  - Work Type
  - Residence Type (Urban/Rural)
  - Average Glucose Level
  - BMI (Body Mass Index)
  - Smoking Status

- **Model Performance**: 95.88% accuracy on test data

## Project Structure

```
Brain_Stroke_Prediction-main/
├── app.py                  # Flask web application
├── train_model.py          # Model training script
├── stroke_model.pkl        # Trained model
├── scaler.pkl              # Feature scaler
├── label_encoders.pkl      # Label encoders
├── train.csv               # Training dataset
├── test.csv                # Test dataset
├── templates/
│   ├── index.html          # Main form page
│   └── result.html        # Result display page
└── static/
    ├── style.css          # Stylesheet
    ├── script.js          # Frontend JavaScript
    └── result.js          # Result page JavaScript
```

## Technology Stack

- **Backend**: Python, Flask
- **Machine Learning**: scikit-learn, Logistic Regression
- **Frontend**: HTML, CSS, JavaScript
- **Data Processing**: pandas, numpy

## Notes

- This is a prediction tool and should not replace professional medical advice
- The model is trained on a specific dataset and may not generalize to all populations
- Always consult healthcare professionals for medical decisions

