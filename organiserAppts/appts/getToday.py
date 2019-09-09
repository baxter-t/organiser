import os
from boto3.dynamodb.conditions import Attr
import json
import datetime as dt

from appts import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')


def getToday(event, context):

    print()
    print(event)
    print()

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
    
    stamp = int(event['pathParameters']['today'])

    # Filter for in a range - unix timestamps
    result = table.scan(
        FilterExpression=Attr('start').between(stamp, stamp + 86400)
    )

    response = {
        "statusCode": 200,
        "body": json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder),
        "headers": {"Access-Control-Allow-Origin": "*"}
    }

    return response



