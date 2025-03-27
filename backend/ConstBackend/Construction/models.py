from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.utils.timezone import now

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
TransactionTypeChoice = [
    ('Income','Income'),
    ('Expenses','Expenses'),
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
    Reportname = models.CharField(max_length=255,blank=True,null=True) 
    
    def __str__(self):
        return self.name
       
class FinanceReport(models.Model):    
      Reportname = models.CharField(max_length=255,blank=True,null=True) 
    
      TotalBudget=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      Totalexpenses = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      variance=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      Notes=models.CharField(max_length=255,blank=True,null=True)
      Remark = models.CharField(max_length=255,blank=True,null=True)
      generated_at=models.DateTimeField(default=now)
      
      def save(self, *args, **kwargs):
        """Automatically calculate variance before saving."""
        if self.TotalBudget and self.Totalexpenses:
            self.variance = self.TotalBudget - self.Totalexpenses
            
        super().save(*args, **kwargs)

      def __str__(self):
        return f"{self.category} - Budget: {self.TotalBudget}, Actual: {self.Totalexpenses}"
    
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
    
    
class FinanceBudgetNo(models.Model):
    number = models.DecimalField(decimal_places=0,max_digits=3,blank=True,null=True) 
    
    def __str__(self):
        return self.number
    
           
class FinanceBudget(models.Model):    
      projectName = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
      BudgetName = models.CharField(max_length=255,default=None)
      Totalbudget=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True) 
      AmountSpent = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      remainingbudget=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      comments=models.CharField(max_length=255,blank=True,null=True)
      generated_at=models.DateTimeField(default=now)
      
      
      def save(self, *args, **kwargs):
        """Automatically calculate variance before saving."""
        if self.Totalbudget and self.AmountSpent:
            self.remainingbudget = self.Totalbudget - self.AmountSpent
            
        super().save(*args, **kwargs)

      def __str__(self):
        return f"{self.number} - Tbudget: {self.Totalbudget}, Aspent: {self.AmountSpent}"
    
class FinanceTransactionsNo(models.Model):
    number = models.DecimalField(decimal_places=0,max_digits=3,blank=True,null=True) 
    
    def __str__(self):
        return self.number
    
           
class FinanceTransaction(models.Model):    
      projectName = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
      TransactionType = models.CharField(max_length=255,choices=TransactionTypeChoice,default='Income')
      Amount = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      description=models.CharField(max_length=255,blank=True,null=True)
      date=models.DateField(default=None,blank=True,null=True)
      generated_at=models.DateTimeField(default=now)
      
      
      

      def __str__(self):
        return self.name 
    
class FinanceMaterialname(models.Model):
    name = models.CharField(max_length=255,blank=True,null=True) 
    
    def __str__(self):
        return self.name
    
           
class FinanceMaterial(models.Model):    
      projectName = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
      QuantityNeeded = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      pricePerQuantity = models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      TotalAmount=models.DecimalField(decimal_places=2,max_digits=12,blank=True,null=True)
      
      generated_at=models.DateTimeField(default=now)
      
      
      

      def __str__(self):
        return self.name 
def save(self, *args, **kwargs):
        """Automatically calculate variance before saving."""
        if self.QuantityNeeded and self.pricePerQuantity:
            self.TotalAmount = self.QuantityNeeded * self.pricePerQuantity
            
        super().save(*args, **kwargs)

def __str__(self):
        return f"{self.number} - Tbudget: {self.QuantityNeeded}, Aspent: {self.pricePerQuantity}"
    
 