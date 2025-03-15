from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import *
from .Serializers import *
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


def get_tokens_for_user(user):
    """Generate JWT tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

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
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            tokens = get_tokens_for_user(user)
            return Response({'message': 'Login successful', 'tokens': tokens}, status=status.HTTP_200_OK)
        
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


      
class ClientView(APIView):
    def get(self,request):
     client = Clientmodel.objects.all()       
     serializer = Clientserializer(client,many=True)
     return Response(serializer.data)
 
    def post(self,request):
        serializer = Clientserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response ( serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Clientdetails(APIView):
    def get(self,request, pk):
         try:
            client = Clientmodel.objects.get(pk=pk) 
         except Clientmodel.DoesnotExist: 
            return Response ({'error':'Client Not Found'},status=status.HTTP_404_NOT_FOUND)
         serializer = Clientserializer(client)
         return Response (serializer.data)
     
     
class RegisterIntoExistingProjectView(APIView):
     def get(self,request):
         user = RegisterIntoExistingProject.objects.all()
         Regserializer = RegisterIntoExistingProjectSerializer(user,many=True)    
         
         return Response(Regserializer.data)
     
     def post(self,request):
         Regserializer = RegisterIntoExistingProjectSerializer(data=request.data)
         if Regserializer.is_valid():
             Regserializer.save() 
             return Response (Regserializer.data, status=status.HTTP_201_CREATED)
        
         return Response (Regserializer.errors,status=status.HTTP_400_BAD_REQUEST)


class RegisterIntoExistingProjectdetails(APIView):
    def get(self,request,pk):
         try:
             user=RegisterIntoExistingProject.get(pk=pk)
         except RegisterIntoExistingProject.DoesNotExist():
             return Response({'errors':'User Not Found'}, status=status.HTTP_404_NOT_FOUND)
         Regserializer = RegisterIntoExistingProjectSerializer(user)
         
         return Response(Regserializer.data)
          
          
class LoginIntoExisting(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            tokens = get_tokens_for_user(user)
            return Response({'message': 'Login successful', 'tokens': tokens}, status=status.HTTP_200_OK)
        
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

          
          
            
             