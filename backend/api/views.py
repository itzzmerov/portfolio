from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project, HeroSection
from .serializers import ProjectSerializer, HeroSectionSerializer

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