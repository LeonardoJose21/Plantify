# models.py
from django.db import models
from django.contrib.auth.models import User

class Templates(models.Model):
    id_template = models.AutoField(primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True)  # Automatically set the field to now when the object is first created
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)  # ForeignKey to User model

    def __str__(self):
        return f"{self.date_created} ({self.id_user})"
