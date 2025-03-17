from . import views
from django.urls import path
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('',login_required( views.ThoughtList.as_view()), name='home'),
    path("create/", views.CreateThought.as_view(), name="create_thought"),
    path("update/<int:thought_id>/", views.update_thought, name="update_thought"),
]