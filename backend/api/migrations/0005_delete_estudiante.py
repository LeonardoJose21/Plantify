# Generated by Django 4.2.7 on 2024-08-09 03:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_estudiante_nivel_actual_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Estudiante',
        ),
    ]
