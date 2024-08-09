# views.py
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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
            'max_tokens': 150
        }

        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)
        result = response.json()

        return JsonResponse(result)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

