from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
# Create your views here.

class Register(APIView):
    def post(self,request):
        username = request.data.get ('username')
        password = request.data.get ('password')
        
        if User.objects.filter(username=username).exists():
            return Response({'message':'user already exists'},status=status.HTTP_400_BAD_REQUEST)
        
        
        user = User.objects.create_user(username=username,password=password)
        
        user.save()
        return Response({'message':'User register succesfully'},status=status.HTTP_201_CREATED)
    
    
class Login(APIView):
      def post(self,request):  
          username = request.data.get('username')
          password = request.data.get('password')
          
          
          user = authenticate(username=username,password=password)
          if user:
              return Response({'message':'Login succesfull'},status=status.HTTP_200_OK)
          return Response({'message':'Invalid username or password'},status=status.HTTP_400_BAD_REQUEST)
        
        