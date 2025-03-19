from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from django.contrib.auth import authenticate
from .models import *
from .Serializers import *
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
# Create your views here.


def get_tokens_for_user(user):
    """Generate JWT tokens for a user."""
    refresh = Token.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
User = get_user_model()

class Register(APIView):
    def get(self, request): 
        return Response({"message": "Send a POST request to register a user."})

    def post(self,request):
        username = request.data.get ('username')
        password = request.data.get ('password')
       
     
        UName=request.data.get('UName')
        Workers=request.data.get('Workers')
        
        
        if User.objects.filter(username=username).exists():
            return Response({'message':'user already exists'},status=status.HTTP_400_BAD_REQUEST)
        
        
        user = User.objects.create_user(username=username,password=password)
       
        
        user.UName=UName
        user.Workers=Workers
        user.save()
        print(get_user_model()) 
       
        return Response({'message':'User register succesfully'},status=status.HTTP_201_CREATED)
    
    
    


class Login(APIView):
   
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            return Response({'message':'Invalid username or password'},status=status.HTTP_400_BAD_REQUEST)
        
        if user:
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


      
class ClientView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     client = Clientmodel.objects.all()       
     serializer = Clientserializer(client,many=True)
     return Response(serializer.data)
 
    def post(self,request):
        serializer = Clientserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response ( serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Clientdetails(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request, pk):
         try:
            client = Clientmodel.objects.get(pk=pk) 
         except Clientmodel.DoesNotExist: 
            return Response ({'error':'Client Not Found'},status=status.HTTP_404_NOT_FOUND)
         serializer = Clientserializer(client)
         return Response (serializer.data)
     
     
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

User = get_user_model()  # Ensure correct user model

class RegisterIntoExistingProjectView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        print("Received username:", username)

        # Debug: Print all existing usernames
        all_users = list(User.objects.values_list('username', flat=True))
        print("Existing usernames in DB:", all_users)

        # Find user or return 404 error
        user = get_object_or_404(User, username=username)

        print("User found:", user.username)

        if not user.check_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate and save registration data
        serializer = RegisterIntoExistingProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)  # Save the data with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterIntoExistingProjectdetails(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,pk):
         try:
             user=RegisterIntoExistingProject.get(pk=pk)
         except RegisterIntoExistingProject.DoesNotExist():
             return Response({'errors':'User Not Found'}, status=status.HTTP_404_NOT_FOUND)
         Regserializer = RegisterIntoExistingProjectSerializer(user)
         
         return Response(Regserializer.data)
          
          

class LoginIntoExistingProject(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            return Response({'message':'Invalid username or password'},status=status.HTTP_400_BAD_REQUEST)
        
        if user:
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

