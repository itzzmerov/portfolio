from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HeroSectionViewSet, AboutMeViewSet, ProjectViewSet, ServiceViewSet, CustomAuthToken

router = DefaultRouter()
router.register(r'herosection', HeroSectionViewSet, basename='herosection')
router.register(r'aboutme', AboutMeViewSet, basename='aboutme')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'services', ServiceViewSet, basename='service')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomAuthToken.as_view(), name='api-login'),
]