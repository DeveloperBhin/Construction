from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

# Create your models here.
STATUS_CHOICES= [
    ('Not Started', 'Not Started'),
    ('In Process', 'In Process'),
    ('Completed','Completed'),
    ('Closed', 'Closed'),
]

TAGS_CHOICES= [
    ('High priority', 'High priority'),
    ('Medium priority', 'Medium priority'),
    ('Low priority','Low priority'),
    
]
WORKS_CHOICES= [
    ('Clients', 'Clients'),
    ('Finance', 'Finance'),
    ('Worker','Worker'),
    ('Q.Assurance', 'Q.Assurance'),
    ('Supplier', 'Supplier'),
    ('Site Supervisor','Site Supervisor'),
    
]
WORKER_No= [
    ('0-50', '0-50'),
    ('50-150', '50-150'),
    ('150-300','150-300'),
    ('300-Above', '300-Above'),
    
    
]

class CustomerUser(AbstractUser):
   
    
    UName=models.CharField(max_length=255, blank=True, null=True)
    Workers=models.CharField(max_length=255,choices=WORKER_No,default='0-50')
    is_verified = models.BooleanField(default=False)
    
    groups = models.ManyToManyField('auth.group',related_name="customeruser_set",blank=True )
    user_permissions=models.ManyToManyField('auth.Permission',related_name="customeruser_Permissions_set",blank=True)

    
    def __str__(self):
        return self.username()
    
class Clientmodel(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    Task = models.CharField (max_length=250)
    Status =models.name = models.CharField(max_length=20,choices=STATUS_CHOICES,default='Not Started')
    Assignees = models.CharField(max_length=255, blank=True, null=True)
    DueDate = models.DateField(default=None)
    Tags = models.name = models.CharField(max_length= 20 ,choices=TAGS_CHOICES,default='Medium Priority')
    File = models.FileField(upload_to='static/files',null=True,blank=True)
    
    def __str__(self):
        return self.Task()
    
class RegisterIntoExistingProject(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(default=None)  
    phone = models.BigIntegerField()
    TypeOfWork = models.CharField(max_length=20, choices=WORKS_CHOICES, default='Clients')

    def __str__(self):
        return self.name    