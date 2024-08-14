# models.py
from django.db import models
from django.contrib.auth.models import User

class Templates(models.Model):
    id_template = models.AutoField(primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True)
    id_user = models.CharField(max_length=255)
    description = models.CharField(max_length=100)
    link_template = models.CharField(default="",max_length=255)

    def __str__(self):
        return f"{self.date_created} ({self.id_user})"
