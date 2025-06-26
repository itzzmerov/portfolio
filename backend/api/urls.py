from django.urls import path
from .views import ProjectList, HeroSectionView, AboutMeView

urlpatterns = [
    path('projects/', ProjectList.as_view(), name='project-list'),
    path('hero/', HeroSectionView.as_view(), name='hero-section'),
    path('about/', AboutMeView.as_view(), name='about-section'),
]