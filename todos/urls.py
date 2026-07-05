from django.urls import path
from .views import TodoListCreateView,TodoDetailView
from .views_auth import register

urlpatterns = [
    path('todos/', TodoListCreateView.as_view()),
    path('todos/<int:pk>/', TodoDetailView.as_view()),
    path('register/', register),
    
]