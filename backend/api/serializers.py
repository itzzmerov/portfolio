from rest_framework import serializers
from .models import Project, HeroSection, HeroTypingText

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class HeroTypingTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroTypingText
        fields = ['text']

class HeroSectionSerializer(serializers.ModelSerializer):
    typing_texts = HeroTypingTextSerializer(many=True, read_only=True)

    class Meta:
        model = HeroSection
        fields = ['id', 'name', 'description', 'image', 'typing_texts']