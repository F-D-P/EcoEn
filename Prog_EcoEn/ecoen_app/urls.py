# ecoen_app/urls.py (Opción sin Allauth)
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.iniciar_sesion, name="custom_login"),
    path("signup/", views.registro, name="custom_signup"),
    path("logout/", views.cerrar_sesion, name="custom_logout"),

    path("productos/", views.productos, name="productos"),
    path("producto/<int:id>/", views.producto_detalle, name="detalle_producto"),
    path("crear-producto/", views.crear_producto, name="crear_producto"),

    path("perfil/", views.mi_perfil, name="mi_perfil"),
    path("perfil/editar/", views.editar_perfil, name="editar_perfil"),

    path("chat/", views.chatbot_view, name="chatbot"),
    path("carrito/", views.carrito, name="carrito"),
    path("confirmar/<str:metodo>/", views.confirmar_pago, name="confirmar_pago"),
    path("resumen/", views.resumen_compra, name="resumen_compra"),
    path("opinion/", views.opinion_view, name="opinion"),
]
