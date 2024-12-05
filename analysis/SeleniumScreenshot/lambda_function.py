import json 
from headless_chrome import create_driver
#from PIL import Image
import io
from time import sleep

def lambda_handler(_event, _context):
    """ Sample handle about how to use the imported the layer """

    driver = create_driver()
    driver.get("https://whatsapp-chat-infographic.s3.eu-west-2.amazonaws.com/index.html")
     
    sleep(5)
    
    total_height = driver.execute_script("return document.body.parentNode.scrollHeight")
    total_width = driver.execute_script("return document.body.parentNode.scrollWidth")
    driver.set_window_size(total_width, total_height)
        
        # Take screenshot
    screenshot = driver.get_screenshot_as_png()
        
        # Convert screenshot to PDF
    #image = Image.open(io.BytesIO(screenshot))
    #pdf_buffer = io.BytesIO()
    #image.convert('RGB').save(pdf_buffer, format='PDF')
    #pdf_content = pdf_buffer.getvalue()

    driver.quit()
        
    return screenshot
