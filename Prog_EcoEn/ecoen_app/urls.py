from django.urls import path
from . import views
from django.urls import path, include


urlpatterns = [
    path('', views.index, name='index'),
    path("registro/", views.registro, name="registro"),
    path("login/", views.iniciar_sesion, name="login"),
    path("logout/", views.cerrar_sesion, name="logout"),
    path("productos/", views.productos, name="productos"),
    path('accounts/', include('allauth.urls')),

]
