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
from django.utils.timezone import now
     


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
    
    
    def get(self, request):
        clients = RegisterIntoExistingProject.objects.all()
        serializer = RegisterIntoExistingProjectSerializer(clients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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

    
    def get(self, request):
        number = get_object_or_404(FinanceExpnumber)
        serializer = FinanceExpnumberSerializer(number)
        return Response(serializer.data)
 

     

        
             
    
    
    
class FinanceExpenditureView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        number = FinanceExpenditure.objects.all()
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
                   
           

class FinanceBudgetNoView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):  
        Budget = FinanceBudgetNo.objects.all()
        Budgetserializer = FinanceBudgetNoSerializer(Budget, many=True)
        return Response(Budgetserializer.data)


  
    def post(self,request):
        bug = FinanceBudgetNoSerializer(data=request.data)
        if bug.is_valid():
           bug.save()
           return Response(bug.data,status=status.HTTP_201_CREATED)
        
        return Response(bug.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class FinanceBudgetNodetails(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    
    def get(self, request):  
        Budget = FinanceBudgetNo.objects.all()
        Budgetserializer = FinanceBudgetNoSerializer(Budget, many=True)
        return Response(Budgetserializer.data)



     

        
             
    
    
    
class FinanceBudgetView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        number = FinanceBudget.objects.all()
        serial = FinanceBudgetSerializer(number,many=True)
        return Response(serial.data)
 
    def post(self,request):
        budgetform = request.data.get("budgetform", [])  # Get list of reports
        if not isinstance(budgetform, list):  
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)
        
        projectName = get_object_or_404(User)

        bugdetserial = FinanceBudgetSerializer(data=budgetform, many=True)  # Serialize multiple reports
        if bugdetserial.is_valid():
            bugdetserial.save(projectName=request.user)
            return Response(bugdetserial.data, status=status.HTTP_201_CREATED)

        return Response(bugdetserial.errors, status=status.HTTP_400_BAD_REQUEST)
     
class FinanceBudgetdetails(APIView):
     permission_classes = [IsAuthenticated]
     def get(self, request):  
        categories = FinanceCategories.objects.all()
        serializer = FinanceCategoryserializer(categories, many=True)
        return Response(serializer.data)

     
                   
           
class FinanceTransactionNoView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):  
        Transaction = FinanceTransactionsNo.objects.all()
        Transactionserializer = FinanceTransactionNoSerializer(Transaction, many=True)
        return Response(Transactionserializer.data)


  
    def post(self,request):
        Trans = FinanceTransactionNoSerializer(data=request.data)
        if Trans.is_valid():
           Trans.save()
           return Response(Trans.data,status=status.HTTP_201_CREATED)
        
        return Response(Trans.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class FinanceTransactionNodetails(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    
    def get(self, request):
        number = get_object_or_404(FinanceTransactionsNo)
        serializer = FinanceTransactionNoSerializer(number, many=True)
        return Response(serializer.data)
 

     

        
             
    
    
    
class FinanceTransactionView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        number = FinanceTransaction.objects.all()
        serial = FinanceTransactionSerializer(number, many=True)
        return Response(serial.data)
 
    def post(self,request):
        Transform = request.data.get("Transform", [])  # Get list of reports
        if not isinstance(Transform, list):  
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)
        
        projectName = get_object_or_404(User)
        

        Transserial = FinanceTransactionSerializer(data=Transform, many=True)  
        if Transserial.is_valid():
            Transserial.save(projectName=request.user)
            return Response(Transserial.data, status=status.HTTP_201_CREATED)

        return Response(Transserial.errors, status=status.HTTP_400_BAD_REQUEST)
     
class FinanceTransactiondetails(APIView):
     permission_classes = [IsAuthenticated]
     def get(self,request,pk):
         try:
             form = FinanceTransaction.objects.get(pk=pk)
             
         except FinanceTransaction.DoesNotExist():
             return Response({'message':'Report does not exists'},status=status.HTTP_404_NOT_FOUND)   
         
         Report = FinanceTransactiondetails(form.data)
            
         return Response(Report.data)      
                   
           

         
   
    

     

        
             
    
    
    
class FinanceMaterialView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
     materials = FinanceMaterial.objects.all()  # Retrieve all materials
     serializer = FinanceMaterialSerializer(materials, many=True)  # Use many=True
     return Response(serializer.data)
 
    def post(self,request):
        materialform = request.data.get("materialform", [])  
        print("Incoming materialform:", materialform)

        if not isinstance(materialform, list):  
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        

        materserial = FinanceMaterialSerializer(data=materialform, many=True) 
       
        user = request.user
        material = RegisterIntoExistingProject.objects.filter(user=user).first()

        if materserial.is_valid():
            materserial.save(user=user,worker=material)
            return Response(materserial.data, status=status.HTTP_201_CREATED)
        print("Serializer errors:", materserial.errors)
       
        return Response(materserial.errors, status=status.HTTP_400_BAD_REQUEST)
     
class FinanceMaterialdetails(APIView):
     permission_classes = [IsAuthenticated]
     def get(self,request,pk):
         try:
             form = FinanceMaterial.objects.get(pk=pk)
             
         except FinanceMaterial.DoesNotExist():
             return Response({'message':'Report does not exists'},status=status.HTTP_404_NOT_FOUND)   
         
         Report = FinanceMaterialdetails(form.data)
            
         return Response(Report.data)     
      
       
class WorkerAttendanceView(APIView):

    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        worker = WorkerAttendance.objects.all()
        serializer = workerAtendanceSerializer(worker, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def post(self,request):
        

        workerserializer = workerAtendanceSerializer(data=request.data)
        project = get_object_or_404(User)

        if workerserializer.is_valid():
            workerserializer.save(project=request.user)
            return Response ( workerserializer.data, status=status.HTTP_201_CREATED)
        print("Validation Errors:", workerserializer.errors)
        
        return Response(workerserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class WorkerAttendancedetails(APIView):
    def get(self, request, pk):
        worker = get_object_or_404(WorkerAttendance, pk=pk)
        serializer = workerAtendanceSerializer(worker)
        return Response(serializer.data)
    
   
class WorkerMaterialUsageView(APIView):

    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        material = WorkerMaterialUsage.objects.all()
        serializer = workerMaterialUsageSerializer(material, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def post(self,request):
        

        materialserializer = workerMaterialUsageSerializer(data=request.data)
        worker = WorkerAttendance.objects.filter(id=request.user.id).first()


        if materialserializer.is_valid():
            materialserializer.save(worker=worker)
            return Response ( materialserializer.data, status=status.HTTP_201_CREATED)
        print("Validation Errors:", materialserializer.errors)
        
        return Response(materialserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class WorkerMaterialUsagedetails(APIView):
    def get(self, request, pk):
        worker = get_object_or_404(WorkerMaterialUsage, pk=pk)
        serializer = workerMaterialUsageSerializer(worker)
        return Response(serializer.data)
    
    
class QualityAssuranceStatusView(APIView):

    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        quality = QualityAssuranceStatus.objects.all()
        serializer = QualityAssuranceSerializer(quality, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def post(self,request):
        
        materialform = request.data.get("materialform",[])
        if not isinstance(materialform, list):
            return Response({"error":"Invalid data format"})
        qualityserializer = QualityAssuranceSerializer(data=materialform, many=True)
        worker = RegisterIntoExistingProject.objects.filter(user=request.user).first()

        

        if qualityserializer.is_valid():
            qualityserializer.save(worker=worker)
            return Response ( qualityserializer.data, status=status.HTTP_201_CREATED)
        print("Validation Errors:", qualityserializer.errors)
        
        return Response(qualityserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class QualityAssurancedetails(APIView):
    def get(self, request, pk):
        quality = get_object_or_404(QualityAssuranceStatus, pk=pk)
        serializer = QualityAssuranceSerializer(quality)
        return Response(serializer.data)
    


  
class SupplierReportView(APIView):

    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        worker =SupplierReport.objects.all()
        serializer = SupplierReportSerializer(worker,many=True)
        return Response(serializer.data)
        
   
    
    def post(self,request):
         supplierform = request.data.get("supplierform",[])
         if not isinstance(supplierform, list):
            return Response({"error":"Invalid data format"})
        

        
         user = get_object_or_404(User)

        
        
         supplierserializer = SupplierReportSerializer(data=supplierform, many=True)

         if supplierserializer.is_valid():
            
            supplierserializer.save(user=user)  
            return Response(supplierserializer.data, status=status.HTTP_201_CREATED)

         return Response(supplierserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SupplierReportdetails(APIView):
    def get(self, request):
        worker = get_object_or_404(SupplierReport, many=True)
        serializer = SupplierReportSerializer(worker)
        return Response(serializer.data)
        
class SupervisorProjectView(APIView):

    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        supervisor = get_object_or_404(supervisorProject)
        serializer = SupplierReportSerializer(supervisor, many=True)
        return Response(serializer.data)
        

   
    
    def post(self,request):
       

         supevisorserializer = supevisorProjectSerializer(data=request.data )
         print("supervisorserializer error:")
        
         user = request.user

   
         project = RegisterIntoExistingProject.objects.filter(user=user).first()
        
         if supevisorserializer.is_valid():
       
            supevisorserializer.save(ProjectName=user,name=project)  
            return Response(supevisorserializer.data, status=status.HTTP_201_CREATED)

         return Response(supevisorserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class supervisorProjectdetails(APIView):
    def get(self, request, pk):
        supervisor = get_object_or_404(supervisorProject, pk=pk)
        serializer = SupplierReportSerializer(supervisor)
        return Response(serializer.data)
        
 
class SupervisorrequestView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requests = Supervisorrequest.objects.all()
        serializer = SupevisorrequestSerializer(requests, many=True)
        return Response(serializer.data)

    def post(self, request):
        supervisorform = request.data.get("supervisorform", [])
        if not isinstance(supervisorform, list):
            return Response({"error": "Invalid data format"})

        serializer = SupevisorrequestSerializer(data=supervisorform, many=True)

        user = request.user
        project = RegisterIntoExistingProject.objects.filter(user=user).first()

        if serializer.is_valid():
            saved_objects = []
            for item in serializer.validated_data:
                obj = Supervisorrequest.objects.create(
                    **item,
                    ProjectName=user,
                    Supervisor=project
                )
                saved_objects.append(obj)

            response_serializer = SupevisorrequestSerializer(saved_objects, many=True)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class supervisorrequestdetails(APIView):
    def get(self, request, pk):
        request = get_object_or_404(Supervisorrequest, pk=pk)
        serializer = SupplierReportSerializer(request)
        return Response(serializer.data)
        
  
    
class FinanceBudgetApprovalView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        Approve = FinanceBudgetApproval.objects.all()
        serial = BudgetApprovalSerializer(Approve,many=True)
        return Response(serial.data)
 
    def post(self,request):
        Approveform = request.data.get("Approveform", [])  # Get list of reports
        if not isinstance(Approveform, list):  
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)
        
        projectName = get_object_or_404(User)

        bugdetserial = BudgetApprovalSerializer(data=Approveform, many=True)  
        if bugdetserial.is_valid():
            bugdetserial.save(projectName=request.user)
            return Response(bugdetserial.data, status=status.HTTP_201_CREATED)

        return Response(bugdetserial.errors, status=status.HTTP_400_BAD_REQUEST)       

    

  
    
class FinalReportView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        Final = FinalReport.objects.all()
        serial = FinalReportSerializer(Final,many=True)
        return Response(serial.data)
 
    def post(self,request):
        Finalform = request.data.get("Finalform", [])  # Get list of reports
        if not isinstance(Finalform, list):  
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = get_object_or_404(User)

        bugdetserial = FinalReportSerializer(data=Finalform, many=True)  
        if bugdetserial.is_valid():
            bugdetserial.save(user=request.user)
            return Response(bugdetserial.data, status=status.HTTP_201_CREATED)

        return Response(bugdetserial.errors, status=status.HTTP_400_BAD_REQUEST)       

    


     