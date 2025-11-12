from django.urls import path, include
from .views import CustomLoginView, CustomSignupView
from Prog_EcoEn.ecoen_app import views

urlpatterns = [
    path('', views.index, name='index'),
    path("registro/", views.registro, name="registro"),
    path("login/", CustomLoginView.as_view(), name="account_login"),
    path("signup/", CustomSignupView.as_view(), name="account_signup"),
    path("logout/", views.cerrar_sesion, name="logout"),
    path("productos/", views.productos, name="productos"),
    path("producto/<int:id>/", views.producto_detalle, name="producto_detalle"),
    path("perfil/", views.mi_perfil, name="mi_perfil"),
    path("perfil/editar/", views.editar_perfil, name="editar_perfil"),

    # 🔑 Esto es lo que falta
    path("accounts/", include("allauth.urls")),
]
