# Step-by-Step Guide: How to Run Brain Stroke Prediction Application

## Prerequisites Check

### Step 1: Verify Python is Installed
1. Open **Command Prompt** (Press `Win + R`, type `cmd`, press Enter)
   OR
   Open **PowerShell** (Press `Win + X`, select "Windows PowerShell")

2. Type this command and press Enter:
   ```
   python --version
   ```
   
3. You should see something like: `Python 3.x.x`
   - ✅ If you see a version number, Python is installed!
   - ❌ If you see an error, install Python from python.org

### Step 2: Verify Required Packages
1. In the same Command Prompt/PowerShell window, navigate to your project folder:
   ```
   cd C:\Users\agraw\Brain_Stroke_Prediction-main
   ```

2. Check if packages are installed:
   ```
   python -c "import flask; import sklearn; print('All packages OK!')"
   ```
   
   - ✅ If you see "All packages OK!", you're ready!
   - ❌ If you see an error, install packages (see Step 3 below)

### Step 3: Install Required Packages (if needed)
If you got an error in Step 2, run this command:
```
pip install -r requirements.txt
```

Wait for installation to complete (may take 1-2 minutes).

---

## Method 1: Double-Click Method (Easiest) 🎯

### Steps:
1. **Open File Explorer** and navigate to:
   ```
   C:\Users\agraw\Brain_Stroke_Prediction-main
   ```

2. **Find the file**: `run_app.bat`

3. **Double-click** on `run_app.bat`

4. A **black Command Prompt window** will open showing:
   ```
   ==========================================
   Brain Stroke Prediction Application
   ==========================================
   
   Starting Flask server...
   
   The application will be available at:
   http://localhost:5000
   
   Press Ctrl+C to stop the server
   ```

5. Wait until you see:
   ```
   * Running on http://127.0.0.1:5000
   ```

6. **Open your web browser** (Chrome, Firefox, Edge, etc.)

7. In the address bar, type:
   ```
   http://localhost:5000
   ```
   and press Enter

8. **You should see the Brain Stroke Prediction form!** 🎉

9. **To stop the server**: Click on the Command Prompt window and press `Ctrl + C`

---

## Method 2: PowerShell Method

### Steps:
1. **Open File Explorer** and navigate to:
   ```
   C:\Users\agraw\Brain_Stroke_Prediction-main
   ```

2. **Right-click** on `run_app.ps1`

3. Select **"Run with PowerShell"**

4. If you see a security warning, click **"Run anyway"** or **"Yes"**

5. Wait until you see:
   ```
   * Running on http://127.0.0.1:5000
   ```

6. **Open your browser** and go to: `http://localhost:5000`

---

## Method 3: Command Line Method (Most Control)

### Steps:
1. **Open Command Prompt or PowerShell**

2. Navigate to your project folder:
   ```
   cd C:\Users\agraw\Brain_Stroke_Prediction-main
   ```
   Press Enter

3. Type this command:
   ```
   python app.py
   ```
   Press Enter

4. You should see output like:
   ```
   Model loaded successfully!
   * Running on http://127.0.0.1:5000
   * Debug mode: on
   ```

5. **Keep this window open** (don't close it!)

6. **Open your browser** and go to: `http://localhost:5000`

7. **To stop**: Go back to the Command Prompt window and press `Ctrl + C`

---

## Using the Application

### Once the page loads:

1. **Fill in the form** with the following information:
   - **Name**: Enter any name
   - **Gender**: Select Male, Female, or Other
   - **Age**: Enter age (e.g., 45)
   - **Hypertension**: Select Yes or No
   - **Heart Disease**: Select Yes or No
   - **Ever Married**: Select Yes or No
   - **Work Type**: Select from dropdown (Private, Self-employed, etc.)
   - **Residence Type**: Select Urban or Rural
   - **Avg Glucose Level**: Enter number (e.g., 95.5)
   - **BMI**: Enter number (e.g., 25.3)
   - **Smoking Status**: Select from dropdown

2. **Click the "Submit" button**

3. **Wait a moment** - you'll be redirected to the results page

4. **View your prediction**:
   - Risk level (High/Low)
   - Probability percentage
   - Prevention tips

5. **To test another person**: Click "Check Another Person" button

---

## Troubleshooting

### Problem: "Python is not recognized"
**Solution**: Python is not in your PATH or not installed
1. Install Python from python.org
2. During installation, check "Add Python to PATH"

### Problem: "ModuleNotFoundError"
**Solution**: Packages not installed
1. Open Command Prompt in project folder
2. Run: `pip install -r requirements.txt`

### Problem: "Port 5000 is already in use"
**Solution**: Another application is using port 5000
1. Close other applications using port 5000
2. OR edit `app.py`:
   - Find: `port=5000`
   - Change to: `port=5001`
   - Use `http://localhost:5001` in browser

### Problem: Browser shows "This site can't be reached"
**Solution**: Server not running
1. Make sure the Command Prompt window is still open
2. Check that you see "Running on http://127.0.0.1:5000"
3. Make sure you typed `http://localhost:5000` (not https)

### Problem: "Model not loaded" error
**Solution**: Model files missing
1. Make sure these files exist in the folder:
   - `stroke_model.pkl`
   - `scaler.pkl`
   - `label_encoders.pkl`
2. If missing, run: `python train_model.py`

### Problem: PowerShell script won't run
**Solution**: Execution policy restriction
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Try running the script again

---

## Quick Test Example

Try these sample values to test the application:

```
Name: John Doe
Gender: Male
Age: 55
Hypertension: Yes
Heart Disease: No
Ever Married: Yes
Work Type: Private
Residence Type: Urban
Avg Glucose Level: 120.5
BMI: 28.5
Smoking Status: formerly smoked
```

Click Submit and see the prediction!

---

## Need Help?

If you encounter any issues:
1. Check that all files are in the folder
2. Verify Python is installed correctly
3. Make sure all packages are installed
4. Check that port 5000 is available
5. Look at the error message in the Command Prompt window

---

**That's it! You're ready to use the Brain Stroke Prediction Application! 🚀**

