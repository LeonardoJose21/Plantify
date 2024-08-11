# urls.py
from django.urls import path
from .views import chatgpt_api, generate_code

urlpatterns = [
    path('api/chatgpt/', chatgpt_api, name='chatgpt_api'),
    path('api/generate_code/', generate_code, name='generate_code'),
]
