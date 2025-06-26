from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project, HeroSection, AboutMe
from .serializers import ProjectSerializer, HeroSectionSerializer, AboutMeSerializer

class ProjectList(APIView):
    def get(self, request):
        projects = Project.objects.all().order_by('-id')
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    
class HeroSectionView(APIView):
    def get(self, request):
        hero = HeroSection.objects.first()
        serializer = HeroSectionSerializer(hero)
        return Response(serializer.data)
    
class AboutMeView(APIView):
    def get(self, request):
        about = AboutMe.objects.first()
        serializer = AboutMeSerializer(about)
        return Response(serializer.data)