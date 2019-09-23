import os

import boto3
dynamodb = boto3.resource('dynamodb')


def delete(event, context):
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
    print("EVENT STARTS")
    print(event)
    print("EVENT ENDS")

    # delete the todo from the database
    table.delete_item(
        Key={
            'id': event['body']['id']
        }
    )

    # create a response
    response = {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps(item),
    }

    return response
