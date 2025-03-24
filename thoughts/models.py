from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Thought(models.Model):
    CATEGORY_CHOICES = [
        ('worry', 'Worry'),
        ('idea', 'Idea'),
        ('reminder', 'Reminder'),
        ('other', 'Other'),
        ('gratitude', 'Gratitude'),
    ]

    MOOD_CHOICES = [
        ('happy', 'Happy'),
        ('sad', 'Sad'),
        ('angry', 'Angry'),
        ('anxious', 'Anxious'),
        ('neutral', 'Neutral'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='thoughts')
    content = models.TextField()
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, blank=True, null=True)
    mood = models.CharField(max_length=10, choices=MOOD_CHOICES, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    class Meta: 
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username}: {self.content}..."
    