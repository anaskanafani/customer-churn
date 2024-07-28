from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pickle
import pandas as pd
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://customer-churn-interface.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

with open("total_charges_correlation.json", "r") as file:
    total_charges_data = json.load(file)
    
with open("churn_correlation.json", "r") as file:
    churn_data = json.load(file)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/total_charges_correlation")
async def total_charges_correlation():
    return JSONResponse(content=total_charges_data)

@app.get("/churn_correlation")
async def churn_correlation():
    return JSONResponse(content=churn_data)

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
