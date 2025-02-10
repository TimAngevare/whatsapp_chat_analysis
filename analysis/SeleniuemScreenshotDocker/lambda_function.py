from selenium import webdriver
from tempfile import mkdtemp
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from io import BytesIO
import base64
from PIL import Image

def handler(event, context=None):
    url = event['url']
    watermark = True
    try:
        if event['watermark'] == 'False':
            print('hello')
            watermark = False
    except:
        pass

    options = webdriver.ChromeOptions()
    service = webdriver.ChromeService("/opt/chromedriver")

    options.binary_location = '/opt/chrome/chrome'
    options.add_argument("--headless")
    options.add_argument('--no-sandbox')
    options.add_argument("--disable-gpu")
    options.add_argument("--single-process")
    options.add_argument("--hide-scrollbars")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-dev-tools")
    options.add_argument("--no-zygote")
    options.add_argument(f"--user-data-dir={mkdtemp()}")
    options.add_argument(f"--data-path={mkdtemp()}")
    options.add_argument(f"--disk-cache-dir={mkdtemp()}")
    options.add_argument("--window-size=1280x3057")
    options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36")

    driver = webdriver.Chrome(options=options, service=service)
    screenshot = take_screenshot(driver, url, "title", 10)
    driver.quit()
    if watermark:
        return add_watermark(screenshot)
    else:
        return base64.b64encode(screenshot)

def add_watermark(screenshot):
    buffered = BytesIO()
    image = Image.open(BytesIO(screenshot))
    watermark = Image.open('Watermark.png')

# Initialize the drawing context with the image as background
    watermark_size = (1280, 3057)
    watermark = watermark.resize(watermark_size)

# Paste the watermark onto the image
    transparent = Image.new('RGBA', image.size)
    transparent.paste(image, (0, 0))
    transparent.paste(watermark, (0,0), mask=watermark)
    transparent = transparent.convert('RGB')
    transparent.save(buffered, format="PNG")

    return base64.b64encode(buffered.getvalue())

def take_screenshot(driver, url, element_id, timeout):
    
    driver.get(url)
     
    WebDriverWait(driver, timeout).until(EC.presence_of_element_located((By.ID, element_id)))
    driver.set_window_size(1280, 3057)
    return driver.get_screenshot_as_png()
