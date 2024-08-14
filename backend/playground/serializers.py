from rest_framework import serializers
from .models import Templates

class TemplatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Templates
        fields = ['id_template', 'date_created', 'id_user', 'description', 'link_template']
