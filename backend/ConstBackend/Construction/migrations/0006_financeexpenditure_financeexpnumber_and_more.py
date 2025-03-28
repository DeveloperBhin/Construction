# Generated by Django 5.1.1 on 2025-03-24 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Construction', '0005_financereport_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='FinanceExpenditure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.DecimalField(blank=True, decimal_places=0, max_digits=3, null=True)),
                ('Material', models.CharField(blank=True, max_length=255, null=True)),
                ('plannedQuantity', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('usedQuantity', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('remainingQuantity', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('comments', models.CharField(blank=True, max_length=255, null=True)),
                ('Remark', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FinanceExpnumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.DecimalField(blank=True, decimal_places=0, max_digits=3, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='financereport',
            name='comments',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
