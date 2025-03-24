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
from rest_framework.authentication import TokenAuthentication,SessionAuthentication
     


def get_tokens_for_user(user):
    token, _ = Token.objects.get_or_create(user=user)
    return {
        'token': str(token),
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
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'message': 'Login successful', 'token': token.key}, status=status.HTTP_200_OK)
        


      
class ClientView(APIView):

    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        clients = Clientmodel.objects.all()
        serializer = Clientserializer(clients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def post(self,request):
        

        serializer = Clientserializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response ( serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Clientdetails(APIView):
    def get(self, request, pk):
        client = get_object_or_404(Clientmodel, pk=pk)
        serializer = Clientserializer(client)
        return Response(serializer.data)

     




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

       
        serializer = RegisterIntoExistingProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)  
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

class FinancecategoryView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):  
        categories = FinanceCategories.objects.all()
        serializer = FinanceCategoryserializer(categories, many=True)
        return Response(serializer.data)


  
    def post(self,request):
        cat = FinanceCategoryserializer(data=request.data)
        if cat.is_valid():
           cat.save()
           return Response(cat.data,status=status.HTTP_201_CREATED)
        
        return Response(cat.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class Financecategorydetails(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    
    def get(self, request, pk):
        category = get_object_or_404(FinanceCategories, pk=pk)
        serializer = FinanceCategoryserializer(category)
        return Response(serializer.data)
 

     

        
             
    
    
    
class FinanceReportView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        category = get_object_or_404(FinanceReport, pk=pk)
        serializer = FinanceReportserializer(category)
        return Response(serializer.data)
 

  
  
       
    
    def post(self,request):
        reports = request.data.get("reports", [])  # Get list of reports
        if not isinstance(reports, list):  
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FinanceReportserializer(data=reports, many=True)  # Serialize multiple reports
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
class FinanceReportdetails(APIView):
     permission_classes = [IsAuthenticated]
     def get(self,request,pk):
         try:
             Report = FinanceReport.objects.get(pk=pk)
             
         except FinanceReport.DoesNotExist():
             return Response({'message':'Report does not exists'},status=status.HTTP_404_NOT_FOUND)   
         
         Repo = FinanceReportdetails(Report.data)
            
         return Response(Repo.data)      
                   
           


class FinanceExpnumberView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):  
        categories = FinanceExpnumber.objects.all()
        serializer = FinanceExpnumberSerializer(categories, many=True)
        return Response(serializer.data)


  
    def post(self,request):
        num = FinanceExpnumberSerializer(data=request.data)
        if num.is_valid():
           num.save()
           return Response(num.data,status=status.HTTP_201_CREATED)
        
        return Response(num.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class FinanceExpnumberdetails(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    
    def get(self, request, pk):
        number = get_object_or_404(FinanceExpnumber, pk=pk)
        serializer = FinanceExpnumberSerializer(number)
        return Response(serializer.data)
 

     

        
             
    
    
    
class FinanceExpenditureView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        number = get_object_or_404(FinanceExpenditure, pk=pk)
        serial = FinanceReportserializer(number)
        return Response(serial.data)
 

  
  
       
    
    def post(self,request):
        form = request.data.get("form", [])  # Get list of reports
        if not isinstance(form, list):  
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)

        serial = FinanceExpenditureserializer(data=form, many=True)  # Serialize multiple reports
        if serial.is_valid():
            serial.save()
            return Response(serial.data, status=status.HTTP_201_CREATED)

        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)
     
class FinanceExpendituredetails(APIView):
     permission_classes = [IsAuthenticated]
     def get(self,request,pk):
         try:
             form = FinanceExpenditure.objects.get(pk=pk)
             
         except FinanceExpenditure.DoesNotExist():
             return Response({'message':'Report does not exists'},status=status.HTTP_404_NOT_FOUND)   
         
         Report = FinanceExpendituredetails(form.data)
            
         return Response(Report.data)      
                   
           

