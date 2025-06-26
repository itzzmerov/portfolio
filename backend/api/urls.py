from django.urls import path
from .views import ProjectList, HeroSectionView

urlpatterns = [
    path('projects/', ProjectList.as_view(), name='project-list'),
    path('hero/', HeroSectionView.as_view(), name='hero-section'),
]