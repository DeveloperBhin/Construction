# Generated by Django 5.1.1 on 2025-04-07 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Construction', '0003_remove_supplierreport_material_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='supplierreport',
            name='SupplierStatus',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending', max_length=20),
        ),
    ]
