# Generated by Django 5.1.1 on 2025-03-26 10:06

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Construction', '0009_financereport_generated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='financereport',
            name='generated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
