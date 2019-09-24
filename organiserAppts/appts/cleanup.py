import os
from boto3.dynamodb.conditions import Attr
import json
import datetime as dt

from appts import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')


def cleanup(event, context):

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    today = dt.datetime.now()
    today = today.replace(hour=0, minute=0, second=0)
    stamp = today.timestamp()

    # Filter for in a range - unix timestamps
    result = table.scan(
        FilterExpression=Attr('start').between(stamp, stamp + 86400)
    )

    for r in result['Items']:
        print(r)

    response = {
        "statusCode": 200,
        "body": json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder),
        "headers": {"Access-Control-Allow-Origin": "*"}
    }

    return response

