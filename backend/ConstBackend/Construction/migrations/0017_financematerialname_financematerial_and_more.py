# Generated by Django 5.1.1 on 2025-03-27 14:34

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Construction', '0016_financetransactionsno_financetransaction_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FinanceMaterialname',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FinanceMaterial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('QuantityNeeded', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('pricePerQuantity', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('TotalAmount', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('generated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('projectName', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
       
    ]
