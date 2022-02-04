import io
from datetime import date
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt


# Convert raw data into python object
def get_parsed_data(data):
    json_data = data
    stream = io.BytesIO(json_data)
    parsed_data = JSONParser().parse(stream)
    return parsed_data

@csrf_exempt
def get_age(request):
    if request.method == 'POST':

        data = get_parsed_data(request.body)
        today = date.today()

        dob = None
        try:
            dob = date(int(data["year"]), int(data["month"]), int(data["day"]))
            try:
                birthday = dob.replace(year = today.year)
        
            # If current is not leap year and date is February 29
            except ValueError:
                birthday = dob.replace(year = today.year, month = dob.month + 1, day = 1) # Basically 29 Feb to 01 March

            age = 0
            if birthday > today:
                age = today.year - dob.year - 1
            else:
                age = today.year - dob.year
                
            return JsonResponse({"msg": "You are " + str(age) + " years old."})

        except ValueError:
            return JsonResponse({"msg": "Please enter valid data!"}, status=404)
    else:
        return JsonResponse({"msg": "Some error occured!"}, status=404)