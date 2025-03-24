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
    
class FinanceCategories(models.Model):
    name = models.CharField(max_length=255,blank=True,null=True) 
    
    def __str__(self):
        return self.name
       
class FinanceReport(models.Model):    
      name = models.CharField(max_length=255,blank=True,null=True) 
    
      budget=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      actual_expenses = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      variance=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      comments=models.CharField(max_length=255,blank=True,null=True)
      Remark = models.CharField(max_length=255,blank=True,null=True)
      
      def save(self, *args, **kwargs):
        """Automatically calculate variance before saving."""
        if self.budget and self.actual_expenses:
            self.variance = self.budget - self.actual_expenses
            
        super().save(*args, **kwargs)

      def __str__(self):
        return f"{self.category} - Budget: {self.budget}, Actual: {self.actual_expenses}"
    
class FinanceExpnumber(models.Model):
    number = models.DecimalField(decimal_places=0,max_digits=3,blank=True,null=True) 
    
    def __str__(self):
        return self.number
    
           
class FinanceExpenditure(models.Model):    
      number = models.DecimalField(decimal_places=0,max_digits=3,blank=True,null=True) 
    
      material=models.CharField(max_length=255,blank=True,null=True)
      plannedQuantity = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      usedQuantity=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      remainingQuantity=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      comments=models.CharField(max_length=255,blank=True,null=True)
      Remark = models.CharField(max_length=255,blank=True,null=True)
      
      def save(self, *args, **kwargs):
        """Automatically calculate variance before saving."""
        if self.plannedQuantity and self.usedQuantity:
            self.remainingQuantity = self.plannedQuantity - self.usedQuantity
            
        super().save(*args, **kwargs)

      def __str__(self):
        return f"{self.number} - plannedQuantity: {self.plannedQuantity}, usedQuantity: {self.usedQuantity}"