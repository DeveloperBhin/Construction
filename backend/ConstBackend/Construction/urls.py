from django.urls import path
from .views import *

urlpatterns = [
    path('register/',Register.as_view(),name='register'),
    path('Login/',Login.as_view(),name='Login'),
    path('Clients/',ClientView.as_view(),name='clientView'),
    path('Clients/<int:pk>/',Clientdetails.as_view(),name='clientdetails'),
    path('RegisterIntoExistingProject/',RegisterIntoExistingProjectView.as_view(),name='RegisterIntoExistingProject'),
    path('LoginIntoExistingProject/',LoginIntoExistingProject.as_view(),name='LoginIntoExistingProject'),

]