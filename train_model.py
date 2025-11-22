import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
import pickle
import warnings
warnings.filterwarnings('ignore')

# Load the dataset
print("Loading dataset...")
df = pd.read_csv('train.csv')

# Drop id column as it's not a feature
df = df.drop('id', axis=1)

# Separate features and target
X = df.drop('stroke', axis=1)
y = df['stroke']

# Handle categorical variables
print("Preprocessing data...")
label_encoders = {}

# Encode categorical columns
categorical_cols = ['gender', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']

for col in categorical_cols:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    label_encoders[col] = le

# Feature scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train the logistic regression model
print("Training Logistic Regression model...")
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_scaled, y)

# Evaluate the model
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42, stratify=y)
model.fit(X_train, y_train)

score = model.score(X_test, y_test)
print(f"Model Accuracy: {score:.4f}")

# Save the model and preprocessing objects
print("Saving model and preprocessing objects...")
with open('stroke_model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

with open('label_encoders.pkl', 'wb') as f:
    pickle.dump(label_encoders, f)

print("Model training completed successfully!")
print(f"Model saved as 'stroke_model.pkl'")
print(f"Scaler saved as 'scaler.pkl'")
print(f"Label encoders saved as 'label_encoders.pkl'")

