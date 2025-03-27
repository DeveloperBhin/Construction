from rest_framework import serializers
from .models import *


class Clientserializer(serializers.ModelSerializer):
    class Meta:
        model=Clientmodel
        fields= '__all__'
        extra_kwargs = {'user':{'read_only':True}}
        
class RegisterIntoExistingProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterIntoExistingProject
        fields = '__all__'    
        extra_kwargs = {'user': {'read_only': True}} 
        
class FinanceCategoryserializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceCategories
        fields = '__all__'
        
class FinanceReportserializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceReport
        fields = '__all__'
        
class FinanceExpnumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceExpnumber
        fields = '__all__'
        
class FinanceExpenditureserializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceExpenditure
        fields = '__all__'
  
class FinanceBudgetNoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceBudgetNo
        fields = '__all__'
        
class FinanceBudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceBudget
        fields = '__all__'
        
class FinanceTransactionNoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceTransactionsNo
        fields = '__all__'

class FinanceTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceTransaction
        fields = '__all__'        
     
class FinanceMaterialNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceMaterialname
        fields = '__all__'

class FinanceMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceMaterial
        fields = '__all__'        
                     
          
    