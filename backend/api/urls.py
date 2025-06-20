from django.urls import path
from .views import ProjectList

urlpatterns = [
    path('projects/', ProjectList.as_view(), name='project-list'),
]