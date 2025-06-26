
from django.contrib import admin
from .models import Project, HeroSection, HeroTypingText

admin.site.register(Project)

class HeroTypingTextInline(admin.TabularInline):
    model = HeroTypingText
    extra = 1

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    inlines = [HeroTypingTextInline]
    list_display = ['name']