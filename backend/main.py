from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from rembg import remove

app = FastAPI()


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