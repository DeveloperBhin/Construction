from django.db import models

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
class Clientmodel(models.Model):
    
    Task = models.CharField (max_length=250)
    Status =models.name = models.CharField(max_length=20,choices=STATUS_CHOICES,default='Not Started')
    Assignees = models.CharField(max_length=255, blank=True, null=True)
    DueDate = models.DateField(default=None)
    Tags = models.name = models.CharField(max_length= 20 ,choices=TAGS_CHOICES,default='Medium Priority')
    File = models.FileField(upload_to='static/files',null=True,blank=True)
    
    def __str__(self):
        return self.Task()
    
class RegisterIntoExistingProject(models.Model):
    Pname = models.CharField (max_length=250)
    Pcode = models.CharField(max_length=255)
    Name= models.CharField(max_length=255, blank=True, null=True)
    Email = models.EmailField(default=None)
    Phone = models.BigIntegerField()
    TypeOfWork =models.CharField(max_length= 20 ,choices=WORKS_CHOICES,default='Clients')
    
    def __str__(self):
        return self.Pname()    