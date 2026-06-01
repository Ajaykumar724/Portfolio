from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow requests from the Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactPayload(BaseModel):
    name: str
    email: str
    message: str


@app.get("/")
def root():
    return {"message": "Ajay Portfolio Backend"}


@app.get("/api/profile")
def profile():
    return {"name": "Ajay Kumar", "role": "Backend Engineer"}


@app.post("/api/contact")
def contact(payload: ContactPayload):
    # Here you could send an email, save to DB, or forward to an external service.
    # For now, echo back the received payload and a success message.
    return {"status": "ok", "received": payload.dict()}