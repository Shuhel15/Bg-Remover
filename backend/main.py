import os
from io import BytesIO

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from PIL import Image
from rembg import remove, new_session

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

session = None


def get_session():
    global session

    if session is None:
        session = new_session("u2netp")

    return session


@app.get("/")
def root():
    return {
        "message": "BG Removal API is running"
    }


@app.post("/remove-background")
async def remove_background(file: UploadFile = File(...)):
    try:
        input_data = await file.read()

        image = Image.open(BytesIO(input_data))

        max_size = 1500

        if max(image.size) > max_size:
            image.thumbnail((max_size, max_size))

        buffer = BytesIO()
        image.save(buffer, format="PNG")

        output_image = remove(
            buffer.getvalue(),
            session=get_session()
        )

        return Response(
            content=output_image,
            media_type="image/png"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )