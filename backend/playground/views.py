# views.py
import traceback
import requests
import io
import sys
from rest_framework import status
import pandas as pd
from django.http import JsonResponse
import os
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .serializers import TemplatesSerializer 
from rest_framework.permissions import AllowAny
import json
from rest_framework.decorators import api_view, permission_classes
from .models import Templates

@csrf_exempt
def chatgpt_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('input', '')

        # Make a request to the ChatGPT API
        api_key = 'sk-None-mUXDSszrSuqh2qzUc4NST3BlbkFJSfCYy4zdWIzFg1b594eV'
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        payload = {
            'model': 'gpt-3.5-turbo',
            'messages': [{'role': 'user', 'content': user_input}],
        }

        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)
        result = response.json()

        return JsonResponse(result)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def generate_code(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('input', '')

        # Make a request to the ChatGPT API
        api_key = 'sk-None-mUXDSszrSuqh2qzUc4NST3BlbkFJSfCYy4zdWIzFg1b594eV'
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        payload = {
            'model': 'gpt-4o',
            'messages': [{'role': 'user', 'content': user_input}],
            'max_tokens': 4000  # Adjust this value based on your needs and the model's token limit
        }

        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)
        
        # Check for API errors
        if response.status_code != 200:
            return JsonResponse({'error': 'Error from OpenAI API'}, status=response.status_code)
        
        result = response.json()

        return JsonResponse(result)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def execute_code(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        code = data.get('code')
        user = data.get('user')

        if not code or not user:
                return JsonResponse({'error': 'Missing code or user'}, status=400)
            

        try:
            # Redirect stdout to capture print statements if needed
            old_stdout = sys.stdout
            sys.stdout = io.StringIO()

            # Execute the code
            exec(code, {'pd': pd})

            # Reset stdout
            sys.stdout = old_stdout

                    
            fs = FileSystemStorage() 
            backend_dir = fs.base_location
            excel_files = [f for f in os.listdir(backend_dir) if f.endswith('.xlsx')]

            
            if not excel_files:
                return JsonResponse({'error': 'No Excel file generated'+backend_dir}, status=400)

 
            # Save the template info to the database
            Templates.objects.create(
                id_user=user,
                link_template=backend_dir
            )

            return JsonResponse({'message': 'All is OK'})

        except Exception as e:
            trace = str(traceback.print_exc())
            return JsonResponse({'error': str(e) + ". Traceback: " +trace }, status=400)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_templates(request):

    try:
        user_id = request.query_params.get('userId')

        if not user_id:
            return Response({'error': 'userId parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch templates associated with the user
        templates = Templates.objects.filter(id_user=user_id).order_by('-date_created')
        
        if not templates.exists():
            return Response({'message': 'No templates found for the given user'}, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize the templates
        serializer = TemplatesSerializer(templates, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)