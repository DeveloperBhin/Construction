from django.urls import path
from .views import *

urlpatterns = [
    path('register/',Register.as_view(),name='register'),
    path('Login/',Login.as_view(),name='Login'),
    path('Clients/',ClientView.as_view(),name='clientView'),
    path('Clients/<int:pk>/',Clientdetails.as_view(),name='clientdetails'),
    path('register-into-existing-project/', RegisterIntoExistingProjectView.as_view(), name='register-into-existing-project'),
    path('LoginIntoExistingProject/',LoginIntoExistingProject.as_view(),name='LoginIntoExistingProject'),
    path('finance/',FinancecategoryView.as_view(),name='finance'),
    path('finance/<int:pk>/',Financecategorydetails.as_view(),name='finance_details'),
    path('financereport/',FinanceReportView.as_view(),name='finance-report-view'),
    path('financereport/<int:pk>/',FinanceReportdetails.as_view(),name='finance-report-details'),
    path('FinanceExpenditure/',FinanceExpenditureView.as_view(),name='FinanceExpenditure'),
    path('FinanceExpenditure/<int:pk>',FinanceExpendituredetails.as_view(),name='FinanceExpenditure'),
    path('FinanceExpnumber/',FinanceExpnumberView.as_view(),name='FinanceExpnumber'),
    path('FinanceExpnumber/',FinanceExpnumberdetails.as_view(),name='FinanceExpnumber')
]