from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import zipfile
import uvicorn
import os
import json
import analysis.chat as chat

app = FastAPI()


TEMP_DIR = "/tmp/uploads"

class ChatDataResponse(BaseModel):
    people: list
    words: dict
    time: dict

@app.post("/upload-zip/", response_model=ChatDataResponse)
async def upload_zip(file: UploadFile = File(...)):
    
    os.makedirs(TEMP_DIR, exist_ok=True)
    
    # Save uploaded zip file to a temporary location
    zip_path = os.path.join(TEMP_DIR, file.filename)
    with open(zip_path, "wb") as buffer:
        buffer.write(await file.read())

    new_chat = chat.Chat(zip_path)
    new_chat.read()
    new_chat.analyse()
    new_chat.saveFile()  
    os.remove(zip_path)  

    # Return the processed data in JSON format
    return JSONResponse(content=new_chat.getJSON())

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
