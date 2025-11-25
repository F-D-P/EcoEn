from django.urls import path
from . import views

urlpatterns = [
    path("", views.chatbot_home, name="chatbot"),  # ✅ usa la vista que sí existe
]
