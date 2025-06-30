from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HeroSectionViewSet, AboutMeViewSet, ProjectViewSet, CustomAuthToken

router = DefaultRouter()
router.register(r'herosection', HeroSectionViewSet, basename='herosection')
router.register(r'aboutme', AboutMeViewSet, basename='aboutme')
router.register(r'projects', ProjectViewSet, basename='projects')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomAuthToken.as_view(), name='api-login'),
]