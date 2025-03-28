# Generated by Django 5.1.1 on 2025-03-18 23:25

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Clientmodel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Task', models.CharField(max_length=250)),
                ('Status', models.CharField(choices=[('Not Started', 'Not Started'), ('In Process', 'In Process'), ('Completed', 'Completed'), ('Closed', 'Closed')], default='Not Started', max_length=20)),
                ('Assignees', models.CharField(blank=True, max_length=255, null=True)),
                ('DueDate', models.DateField(default=None)),
                ('Tags', models.CharField(choices=[('High priority', 'High priority'), ('Medium priority', 'Medium priority'), ('Low priority', 'Low priority')], default='Medium Priority', max_length=20)),
                ('File', models.FileField(blank=True, null=True, upload_to='static/files')),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('UName', models.CharField(blank=True, max_length=255, null=True)),
                ('Workers', models.CharField(choices=[('0-50', '0-50'), ('50-150', '50-150'), ('150-300', '150-300'), ('300-Above', '300-Above')], default='0-50', max_length=255)),
                ('is_verified', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, related_name='customeruser_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='customeruser_Permissions_set', to='auth.permission')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='RegisterIntoExistingProject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.EmailField(default=None, max_length=254)),
                ('phone', models.BigIntegerField()),
                ('TypeOfWork', models.CharField(choices=[('Clients', 'Clients'), ('Finance', 'Finance'), ('Worker', 'Worker'), ('Q.Assurance', 'Q.Assurance'), ('Supplier', 'Supplier'), ('Site Supervisor', 'Site Supervisor')], default='Clients', max_length=20)),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
