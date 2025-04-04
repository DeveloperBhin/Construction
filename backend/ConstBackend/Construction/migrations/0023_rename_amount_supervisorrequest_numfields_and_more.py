# Generated by Django 5.1.1 on 2025-04-03 13:08

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Construction', '0022_rename_supervisor_supervisorproject_name_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='supervisorrequest',
            old_name='Amount',
            new_name='numFields',
        ),
        migrations.RenameField(
            model_name='supervisorrequest',
            old_name='material',
            new_name='values',
        ),
  ]
