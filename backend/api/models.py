
from django.db import models

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    demo_url = models.URLField(blank=True)
    code_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class HeroSection(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='hero_images/')
    
    def __str__(self):
        return self.name

class HeroTypingText(models.Model):
    hero = models.ForeignKey(HeroSection, related_name='typing_texts', on_delete=models.CASCADE)
    text = models.CharField(max_length=100)

    def __str__(self):
        return self.text
    
class AboutMe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    facebook = models.CharField(max_length=200)
    instagram = models.CharField(max_length=200)
    twitter = models.CharField(max_length=200)
    linkedin = models.CharField(max_length=200)
    messenger = models.CharField(max_length=200)
    youtube = models.CharField(max_length=200)
    github = models.CharField(max_length=200)
    image = models.ImageField(upload_to='about_images/')

    def __str__(self):
        return self.title