import json
import logging
import os
import time
import uuid
from datetime import datetime

import boto3
dynamodb = boto3.resource('dynamodb')


def create(event, context):
    data = json.loads(event['body'])
    print(data)
    if 'name' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")
    
    timestamp = str(datetime.utcnow().timestamp())

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    item = {
        'id': str(uuid.uuid1()),
        'name': data['name'],
        'start': data['start'],
        'end': data['end'],
    }

    # write the todo to the database
    table.put_item(Item=item)

    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps(item),
        "headers": {}
    }

    return response
