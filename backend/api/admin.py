
from django.contrib import admin
from .models import Project, HeroSection, HeroTypingText, AboutMe, Service

admin.site.register(Project)
admin.site.register(Service)

class HeroTypingTextInline(admin.TabularInline):
    model = HeroTypingText
    extra = 1

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    inlines = [HeroTypingTextInline]
    list_display = ['name']

admin.site.register(AboutMe)