# urls.py
from django.urls import path
from .views import chatgpt_api

urlpatterns = [
    path('api/chatgpt/', chatgpt_api, name='chatgpt_api'),
]
