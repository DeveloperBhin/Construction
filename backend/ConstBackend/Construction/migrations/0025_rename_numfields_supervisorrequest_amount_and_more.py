# Generated by Django 5.1.1 on 2025-04-03 14:25

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Construction', '0024_rename_supervisor_supervisorrequest_name_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='supervisorrequest',
            old_name='numFields',
            new_name='amount',
        ),
        migrations.RenameField(
            model_name='supervisorrequest',
            old_name='values',
            new_name='material',
        ),
     
    ]
