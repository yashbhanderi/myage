import json
import requests

URL = "http://127.0.0.1:8000/api/get-age/"

# Input from the user
day = input("Enter the date in dd: ")
month = input("Enter the date in mm: ")
year = input("Enter the date in yyyy: ")

data = {
    "day": day,
    "month": month,
    "year": year
}

# Python local object to JSON
data = json.dumps(data)

# HTTP POST Request
get_age = requests.post(url = URL, data = data)

# Response Object
response = json.loads(get_age.content)["msg"]

print(response)

