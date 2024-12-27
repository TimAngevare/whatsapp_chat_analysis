import json
import base64
import io
from chat import Chat
import boto3

bucket_name = 'whatsapp-chat-infographic'
lambda_name = 'SeleniumScreenshot'

def analyze_chat (zip_bytes):
    new_chat = Chat(zip_bytes)
    new_chat.read()
    new_chat.analyse()
    
    return new_chat.getJSON()

def process_request(event, s3_client, lambda_client):
    if 'isBase64Encoded' in event and event['isBase64Encoded']:
        # Handle base64 encoded body
        binary_body = base64.b64decode(event['body'])
    else:
            # Handle binary body
        binary_body = event['body'].encode('utf-8') if isinstance(event['body'], str) else event['body']
    zip_bytes = io.BytesIO(binary_body)
    print('start analyze')

    json_export = analyze_chat(zip_bytes)

    print('Json length: ' + str(len(json_export)))

    response_s3 = s3_client.put_object(Bucket=bucket_name, Key='data.json', Body=json_export)
            
    print('response s3: ' + str(response_s3))

    response_lambda = lambda_client.invoke(
        FunctionName=lambda_name,
        InvocationType='RequestResponse',  # or 'Event' for async invocation
        Payload='{ "url": "https://whatsapp-chat-infographic.s3.eu-west-2.amazonaws.com/index.html" }'
    )
    print('lambda response: ' + str(response_lambda))

    base64_image = base64.b64encode(response_lambda['Payload'].read()).decode('utf-8')
    size = len(base64_image) * 0.75
    print('Size picture: ' + str(size))
        
    return json.dumps({'image' : base64_image})

def lambda_handler(event, context):
    print('initializing function')
    s3_client = boto3.client("s3")
    lambda_client = boto3.client('lambda')
    body = {}
    statusCode = 200

    print(event['headers'])

    if 'https://chatalytics.nl' not in event['headers']['User-Agent']:
        body = 'Error, rest call not made from website'
        print(body)
        statusCode = 403
    elif event['resource'] != "/analyze-chat" or event['httpMethod'] != "POST":
        body = "Route or method not found: " + event['path']
        print(body)
        statusCode = 404 
    else:
        body = process_request(event, s3_client, lambda_client)       

    body = json.dumps(body)
    res = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": body
    }
    return res