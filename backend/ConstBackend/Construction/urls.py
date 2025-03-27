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
    path('FinanceExpnumber/<int:pk>/',FinanceExpnumberdetails.as_view(),name='FinanceExpnumber'),
    path('FinanceBudgetNo/',FinanceBudgetNoView.as_view(),name='FinanceBudgetNo'),
    path('FinanceBudgetNo/<int:pk>/',FinanceBudgetNodetails.as_view(),name='FinanceBudgetNo'),
    path('FinanceBudget/',FinanceBudgetView.as_view(),name='FinanceBudget'),
    path('FinanceBudget/<int:pk>/',FinanceBudgetdetails.as_view(),name='FinanceBudget'),
    path('FinanceTransactionNo/',FinanceTransactionNoView.as_view(),name='FinanceTransactionNo'),
    path('FinanceTransactionNo/<int:pk>/',FinanceTransactionNodetails.as_view(),name='FinanceTransactionNo'),
    path('FinanceTransaction/',FinanceTransactionView.as_view(),name='FinanceTransaction'),
    path('FinanceTransaction/<int:pk>/',FinanceTransactiondetails.as_view(),name='FinanceTransaction'),
   path('FinanceMaterialname/',FinanceMaterialNameView.as_view(),name='FinanceMaterialname'),
    path('FinanceMaterialname/<int:pk>/',FinanceMaterialNamedetails.as_view(),name='FinanceMaterialname'),
    path('FinanceMaterial/',FinanceMaterialView.as_view(),name='FinanceMaterial'),
    path('FinanceMaterial/<int:pk>/',FinanceMaterialdetails.as_view(),name='FinanceMaterial'),

]
