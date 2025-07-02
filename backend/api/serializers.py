from rest_framework import serializers
from .models import Project, HeroSection, HeroTypingText, AboutMe, Service

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

    positions = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = HeroSection
        fields = ['id', 'name', 'description', 'image', 'typing_texts', 'positions']

    def create(self, validated_data):
        positions_str = validated_data.pop('positions', '')
        hero = HeroSection.objects.create(**validated_data)
        if positions_str:
            positions_list = [p.strip() for p in positions_str.split(',') if p.strip()]
            for pos in positions_list:
                HeroTypingText.objects.create(hero_section=hero, text=pos)
        return hero

    def update(self, instance, validated_data):
        positions_str = validated_data.pop('positions', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if positions_str is not None:
            positions_list = [p.strip() for p in positions_str.split(',') if p.strip()]
            instance.typing_texts.all().delete()
            for pos in positions_list:
                HeroTypingText.objects.create(hero_section=instance, text=pos)

        return instance

class AboutMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutMe
        fields = '__all__'
        
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'