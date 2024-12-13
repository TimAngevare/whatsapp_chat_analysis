import json

from headless_chrome import create_driver, take_screenshot
import io
from time import sleep

def lambda_handler(_event, _context):
    """ Sample handle about how to use the imported the layer """

    driver = create_driver()
    screenshot = take_screenshot(driver, "https://whatsapp-chat-infographic.s3.eu-west-2.amazonaws.com/index.html", "title")

    driver.quit()
        
    return screenshot
