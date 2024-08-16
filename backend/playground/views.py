# views.py
import traceback
import requests
import io
import sys
from rest_framework import status
import pandas as pd
from django.http import  Http404, HttpResponse, JsonResponse
import os
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from secp import settings
from .serializers import TemplatesSerializer 
from rest_framework.permissions import AllowAny
import json
from rest_framework.decorators import api_view, permission_classes
from .models import Templates
from django.core.files import File

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
            'model': 'gpt-4',
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
        reqs = data.get('description')

        description = ''
        count = 0

        for char in reqs:
            if count < 90:
                description += char
                count += 1
            elif count == 90:
                description += "..."
                break
            else:
                break
            

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

            root = ''
            route_splitted = backend_dir.split('\\')
            for a in route_splitted:
                if a != route_splitted[-1] and a != route_splitted[0]:
                    root += '\\'+a
                elif a == route_splitted[0]:
                    root += a

            if excel_files:
                latest_file = max(excel_files, key=lambda f: os.path.getmtime(os.path.join(backend_dir, f)))
                relative_path = os.path.relpath(os.path.join(backend_dir, latest_file), backend_dir)

                Templates.objects.create(
                id_user=user,
                link_template= relative_path,
                description = description,
                )
            else:
                return JsonResponse({'error': 'No Excel file generated'+backend_dir}, status=400)
            
            excel_files_not_desired = [f for f in os.listdir(root) if f.endswith('.xlsx')]
            # delete all the not desired files
            for file in excel_files_not_desired:
                file_path = os.path.join(root, file)
                os.remove(file_path)

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

 
@api_view(['POST'])
@permission_classes([AllowAny])
def downloadTemplate(request):
    filename = request.data.get('filename')
   

    if not filename:
        print("Please provide a filename")
        return Response({"error": "Filename is required"}, status=400)

    # Safely join the media root and filename
    path_to_file = os.path.join(settings.MEDIA_ROOT, filename)

    print(path_to_file)

    if not os.path.exists(path_to_file):
        print("File does not exist")
        raise Http404("File does not exist")

    with open(path_to_file, 'rb') as f:
        response =  HttpResponse(f.read(), content_type="application/vnd.ms-excel")
        response['Content-Disposition'] = f'attachment; filename="{os.path.basename(path_to_file)}"'
        return response
    
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_template(request, id_template):
    try:
        # Fetch the template from the database
        template = Templates.objects.get(id_template=id_template)
        
        # Construct the full file path
        file_path = os.path.join(settings.MEDIA_ROOT, template.link_template)
        
        # Delete the file if it exists
        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            return Response({'error': 'File not found on the server.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Delete the template record from the database
        template.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Templates.DoesNotExist:
        return Response({'error': 'Template not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)