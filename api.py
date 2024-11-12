from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
import os
import analysis.chat as chat
from playwright.async_api import async_playwright

app = FastAPI()

async def take_screenshot(url: str, output_path: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(url)
        await page.screenshot(path=output_path, full_page=True)
        await browser.close()

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

@app.get("/screenshot")
async def get_screenshot():
    url = "http://localhost:3000/"  
    output_path = "infographic.png"      

    # Call the asynchronous screenshot function
    await take_screenshot(url, output_path)

    return {"message": "Screenshot taken successfully", "path": output_path}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
