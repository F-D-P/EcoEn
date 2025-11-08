from django.shortcuts import render
from .models import Opinion

def index(request):
    opiniones = Opinion.objects.all().order_by('-fecha')  # últimas primero
    return render(request, "index.html", {"opiniones": opiniones})