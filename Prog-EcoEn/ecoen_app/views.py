from django.shortcuts import render

# Create your views here.
# views.py

from django.shortcuts import render
from .mongo_config import db  

def index(request):
    opiniones = list(db.opiniones.find())  # Trae todas las opiniones desde MongoDB
    return render(request, "index.html", {"opiniones": opiniones})
