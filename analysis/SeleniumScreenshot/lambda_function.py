import json
from chromeheadless import create_driver, take_screenshot
import io
from time import sleep

def lambda_handler(_event, _context):

    driver = create_driver()
    screenshot = take_screenshot(driver, "https://whatsapp-chat-infographic.s3.eu-west-2.amazonaws.com/index.html", "title", 10)

    driver.quit()
        
    return screenshot
