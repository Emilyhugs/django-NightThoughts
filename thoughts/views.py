from django.shortcuts import render
from django.http import HttpResponse

def my_thoughts(request):
   return HttpResponse("Hello, this is my first thought!")

# Create your views here.
