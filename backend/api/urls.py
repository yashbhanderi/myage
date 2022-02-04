from . import views
from django.urls import path

urlpatterns = [
    path('get-age/', views.get_age, name="get_age"),
]