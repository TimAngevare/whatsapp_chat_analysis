import sys
import analysis.chat as chat
from playwright.sync_api import sync_playwright
import os

chat = chat.Chat(sys.argv[1])
chat.read()
chat.analyse()
chat.saveFile()

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:9000/")
    screenshot_path = "infographic.png"
    page.wait_for_timeout(3000)
    page.screenshot(path=screenshot_path, full_page=True)
    browser.close()