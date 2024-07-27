from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

class Customer(BaseModel):
    SeniorCitizen: int
    Partner: int
    Dependents: int
    tenure: int
    OnlineSecurity: int
    OnlineBackup: int
    DeviceProtection: int
    TechSupport: int
    Contract: int
    PaperlessBilling: int
    PaymentMethod: int
    MonthlyCharges: float
    TotalCharges: float
    
class RegressorCustomer(BaseModel):
    SeniorCitizen: int
    Partner: int
    tenure: int
    PhoneService: int
    MultipleLines: int
    InternetService: int
    OnlineSecurity: int
    OnlineBackup: int
    DeviceProtection: int
    TechSupport: int
    StreamingTV: int
    StreamingMovies: int
    Contract: int
    PaperlessBilling: int
    PaymentMethod: int
    MonthlyCharges: float
    Churn: int
    
with open('classifier.pkl', 'rb') as file:
    classifier = pickle.load(file)
    
with open('regressor.pkl', 'rb') as file:
    regressor = pickle.load(file)
    

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/classify-churn")
async def predict(customer: Customer):
    customer = pd.DataFrame([customer.model_dump()])
    prediction = classifier.predict(customer)
    
    if prediction[0] == 0:
        customer = "Not churn"
    else:
        customer = "Churn"
    return {"prediction": customer}

@app.post("/predict-total-charges")
async def predict_total_charges(customer: RegressorCustomer):
    customer = pd.DataFrame([customer.model_dump()])
    prediction = regressor.predict(customer)
    
    return {"prediction": prediction[0]}