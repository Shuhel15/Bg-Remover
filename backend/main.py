import os
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from rembg import remove

load_dotenv()

app = FastAPI()

FRONTEND_URL = os.getenv("FRONTEND_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "BG Removal API is running"
    }


@app.post("/remove-background")
async def remove_background(file: UploadFile = File(...)):
    input_image = await file.read()

    output_image = remove(input_image)

    return Response(
        content=output_image,
        media_type="image/png"
    )