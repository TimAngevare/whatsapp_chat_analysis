import json
import base64
import io
from chat import Chat
import boto3

bucket_name = 'whatsapp-chat-infographic'

def lambda_handler(event, context):
    s3_client = boto3.client("s3")
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
        
            # Create a BytesIO object to work with the zip data
            zip_bytes = io.BytesIO(binary_body)
        
            # Process the chat
            new_chat = Chat(zip_bytes)
            new_chat.read()
            new_chat.analyse()
            json_export = new_chat.getJSON()

            print(json_export)
            response = s3_client.put_object(Bucket=bucket_name, Key='data.json', Body=json_export)
            # Return the analysis results
            body = json.dumps(response)
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