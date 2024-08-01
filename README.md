## Project Documentation: Customer Churn Prediction

  

### Overview

  

The **Customer Churn Prediction** project aims to provide businesses with insights into their customer base, helping them understand and retain their customers better. The project consists of two main machine learning tasks: Churn Prediction (classification) and Total Charges Prediction (regression). The implementation involves a combination of data collection, model development, API development using FastAPI, and frontend development using Next.js.

  

### Table of Contents

  

1. Introduction

2. Frontend Documentation

3. Backend Documentation

4. Machine Learning Models

5. Conclusion

  

## 1. Introduction

  

### Goal

  

The main goals of this project are:

- **Churn Prediction**: To predict whether a customer will churn (leave the service).

- **Total Charges Prediction**: To estimate the total charges a customer will incur.

  

### Methodology

  

1. **Data Collection & Cleaning**: Clean and transform the dataset.

2. **Model Development & Training**: Develop and train the models for classification and regression.

3. **API Development**: Create FastAPI endpoints for model predictions.

4. **Frontend Development**: Create a user-friendly interface using Next.js for data input and result visualization.

5. **Data Visualization**: Use interactive charts and graphs to visualize the data and model results.

  

### Datasets
**Telco Customer Churn Dataset**: Contains customer demographics, services subscribed, and churn status.
**Link**: https://www.kaggle.com/datasets/blastchar/telco-customer-churn/data

  

## 2. Frontend Documentation

  

### Overview

  

The frontend is developed using **Next.js** and provides an interactive interface for users to input data, visualize results, and explore data insights.

  

### Key Features

  

- **Input Forms**: Allow users to input customer data for predictions.

- **Visualization**: Display churn probability and estimated total charges.

- **Data Exploration**: Interactive charts and graphs to explore data.

  

### Libraries Used

  

- **Recharts**: For creating interactive charts and graphs.

  

### Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Or Check out the deployed version:** https://customer-churn-interface.vercel.app

## 3. Backend Documentation

  

### Overview

  

The backend is developed using **FastAPI** and serves as the API layer to handle data input, model predictions, and data visualization requests.

  

### Key Endpoints

  

- **/classify-churn**: Accepts customer data and returns a churn prediction.

- **/predict-total-charges**: Accepts customer data and returns an estimated total charges.

- **/total_charges_correlation**: Returns the correlation of features with total charges.

- **/churn_correlation**: Returns the correlation of features with churn.

  

### Example FastAPI Code

  

```python
class  Customer(BaseModel):
SeniorCitizen:  int
Partner:  int
Dependents:  int
tenure:  int
OnlineSecurity:  int
OnlineBackup:  int
DeviceProtection:  int
TechSupport:  int
Contract:  int
PaperlessBilling:  int
PaymentMethod:  int
MonthlyCharges:  float
TotalCharges:  float


with  open("total_charges_correlation.json",  "r")  as  file:
total_charges_data  =  json.load(file)

@app.get("/total_charges_correlation")
async  def  total_charges_correlation():
return  JSONResponse(content=total_charges_data)

```

  

## 4. Machine Learning Models

  

### Churn Prediction (Classification)

  

#### Goal

  

The goal of churn prediction is to identify customers who are likely to leave the service. This helps in taking proactive measures to retain these customers.

  

#### Data Preprocessing

  

1. **Removing Unnecessary Columns**: Remove columns that is not highly correlated with "Churn"

2. **Encoding Categorical Variables**: Convert categorical variables into numerical ones using one-hot encoding.

3. **Feature Scaling**: Normalize or standardize features to ensure the model treats all features equally.

**1. Feature Correlation Plot**
![output2](https://github.com/user-attachments/assets/f1c022ac-87a6-463f-b189-451d9cb80cd4)
_Description_: The plot displays the correlation coefficients between features. High correlations indicate a strong relationship between features, helping in feature selection and understanding multicollinearity.

#### Model Selection


1. **Random Forest**:

- **Description**: An ensemble method that uses multiple decision trees to improve classification accuracy.

- **Advantages**: Handles overfitting by averaging multiple trees, robust to noisy data.

- **Disadvantages**: Can be computationally intensive.

  

2. **Gradient Boosting**:

- **Description**: An ensemble technique that builds trees sequentially, with each tree trying to correct errors made by the previous one.

- **Advantages**: High predictive power and accuracy.

- **Disadvantages**: Can be prone to overfitting if not properly tuned.

  

#### Model Training

  

- **Train-Test Split**: Split the data into training (80%) and testing (20%) sets.

- **Training**: Use the training set to train the models.

- **Hyperparameter Tuning**: Use GridSearchCV to find the best hyperparameters for each model.

  

#### Evaluation

 - **Best Score:** 0.8033777777777779 
 - **Best Scaler:** RobustScaler()
 - **Best Classifier:** GradientBoostingClassifier()
- **Accuracy:** 78.54%
- **Mean Squared Error:** 0.2146410803127221
- **Mean Absolute Error:** 0.2146410803127221

**2. Confusion Matrix**
![output](https://github.com/user-attachments/assets/0fe6ee7a-7e24-4e3d-ae08-719298539df6)
_Description_: This plot shows the model’s performance on the testing set, comparing predicted vs. actual values. It displays the number of true positives, true negatives, false positives, and false negatives.

**3. Feature Importance**
![output1](https://github.com/user-attachments/assets/e48c3292-2adf-44d9-abd8-8d2cc6639db7)
_Description_: This bar chart ranks features based on their importance in predicting Churn.

---

### Total Charges Prediction (Regression)

  

#### Goal

The goal of total charges prediction is to estimate the total charges a customer will incur, helping in financial forecasting and customer management.

  

#### Data Preprocessing

  

1. **Removing Unnecessary Columns**: Remove columns that is not highly correlated with "TotalCharges"

2. **Encoding Categorical Variables**: Convert categorical variables into numerical ones.

3. **Feature Scaling**: Normalize or standardize features to ensure the model treats all features equally.

  **1. Feature Correlation Plot**
![output4](https://github.com/user-attachments/assets/b90d1b50-e5f7-4c7d-b680-c133c3a7d4b4)

_Description_: The plot displays the correlation coefficients between features. High correlations indicate a strong relationship between features, helping in feature selection and understanding multicollinearity.

#### Model Selection

  

1. **Linear Regression**:

- **Description**: A linear approach to modeling the relationship between the dependent variable and one or more independent variables.

- **Advantages**: Simple and interpretable.

- **Disadvantages**: Assumes a linear relationship.

  

2. **Decision Trees**:

- **Description**: A non-linear model that splits the data into subsets based on feature values.

- **Advantages**: Can capture non-linear relationships.

- **Disadvantages**: Prone to overfitting.

  

3. **XGBoost**:

- **Description**: An efficient and scalable implementation of gradient boosting framework.

- **Advantages**: High predictive power and accuracy.

- **Disadvantages**: Requires careful tuning to avoid overfitting.

  

#### Model Training

  

- **Train-Test Split**: Split the data into training (80%) and testing (20%) sets.

- **Training**: Use the training set to train the models.

- **Hyperparameter Tuning**: Use GridSearchCV to find the best hyperparameters for each model.

  

#### Evaluation

 - **Best Scaler:** StandardScaler()
 - **Best Regressor:** LinearRegression()
- **Accuracy:** 91.15% 
- **Mean Squared Error:** 457577.88785762683
- **Mean Absolute Error:** 541.6182644264559
- **R2 Score:** 0.9114517314021886

**2. Confusion Matrix**
![output1](https://github.com/user-attachments/assets/1d6ad2c1-e912-48c8-8fde-e74c71319cb3)

_Description_: This plot shows the model’s performance on the testing set, comparing predicted vs. actual values. It displays the number of true positives, true negatives, false positives, and false negatives.

**3. Coefficients Plot**


![output](https://github.com/user-attachments/assets/5979f67b-3eee-4961-8f1e-64540a84adc8)

_Description_: This bar chart ranks Coefficients based on predicting TotalCharges.

## **5. Conclusion**

The **Customer Churn Prediction** project successfully integrates data collection, model development, API development using FastAPI, and frontend development using Next.js. By predicting customer churn and estimating total charges, businesses can gain valuable insights into their customer base, enabling them to take proactive measures for customer retention and financial planning. The visualizations further aid in understanding the data and model results, making the insights more accessible and actionable. This comprehensive solution demonstrates the power of combining machine learning with modern web development frameworks to address real-world business challenges.
