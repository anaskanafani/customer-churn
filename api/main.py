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
    
with open('classifier.pkl', 'rb') as file:
    classifier = pickle.load(file)
    

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/classify-churn")
async def predict(customer: Customer):
    customer = pd.DataFrame([customer.dict()])
    prediction = classifier.predict(customer)
    
    if prediction[0] == 0:
        customer = "Not churn"
    else:
        customer = "Churn"
    return {"prediction": customer}