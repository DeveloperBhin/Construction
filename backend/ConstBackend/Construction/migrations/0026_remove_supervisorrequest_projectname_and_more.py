# Generated by Django 5.1.1 on 2025-04-03 14:53

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Construction', '0025_rename_numfields_supervisorrequest_amount_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='supervisorrequest',
            name='ProjectName',
        ),
        migrations.RemoveField(
            model_name='supervisorrequest',
            name='name',
        ),
     
    ]
