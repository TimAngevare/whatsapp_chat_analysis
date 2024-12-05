import json
import base64
import io
from time import sleep
from analysis.chatAnalysis.chat import Chat
import boto3

bucket_name = 'whatsapp-chat-infographic'

def analyze_chat (zip_bytes):
    new_chat = Chat(zip_bytes)
    new_chat.read()
    new_chat.analyse()
    return new_chat.getJSON()

def lambda_handler(event, context):
    s3_client = boto3.client("s3")
    lambda_client = boto3.client('lambda')
    print('## EVENT')
    print(event)
    body = {}
    statusCode = 200
    headers = {
        "Content-Type": "application/json"
    }

    try:
        if event['resource'] == "/analyze-chat" and event['httpMethod'] == "POST":
            if 'isBase64Encoded' in event and event['isBase64Encoded']:
            # Handle base64 encoded body
                binary_body = base64.b64decode(event['body'])
            else:
                # Handle binary body
                binary_body = event['body'].encode('utf-8') if isinstance(event['body'], str) else event['body']
            zip_bytes = io.BytesIO(binary_body)

            json_export = analyze_chat(zip_bytes)

            response_s3 = s3_client.put_object(Bucket=bucket_name, Key='data.json', Body=json_export)
            
            response_lambda = lambda_client.invoke(
                FunctionName='SeleniumScreenshot',
                InvocationType='RequestResponse',  # or 'Event' for async invocation
                Payload=''
            )
            base64_image = base64.b64encode(response_lambda['Payload'].read()).decode('utf-8')
            #encoded_file = take_screenshot()
            body = json.dumps({'image' : base64_image})
        else:
            body = "Unsupported route or method: " + event['path']       
    except KeyError:
        statusCode = 400
        body = 'Unsupported route: ' + event['path']
    body = json.dumps(body)
    res = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": body
    }
    return res