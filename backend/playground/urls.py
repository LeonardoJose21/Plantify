# urls.py
from django.urls import path
from .views import chatgpt_api, downloadTemplate, execute_code, generate_code, get_templates

urlpatterns = [
    path('api/chatgpt/', chatgpt_api, name='chatgpt_api'),
    path('api/generate_code/', generate_code, name='generate_code'),
    path('api/execute-code/', execute_code, name='execute-code'),
    path('api/templates/', get_templates, name='get_templates'),
    path('api/download', downloadTemplate, name='download_template'),
]
