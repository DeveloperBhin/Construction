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