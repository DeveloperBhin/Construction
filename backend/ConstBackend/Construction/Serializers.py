from rest_framework import serializers
from .models import *


class Clientserializer(serializers.ModelSerializer):
    class Meta:
        model=Clientmodel
        fields= '__all__'
        
class RegisterIntoExistingProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterIntoExistingProject
        fields = '__all__'      