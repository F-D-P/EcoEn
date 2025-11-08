from django.db import models

class Opinion(models.Model):
    nombre = models.CharField(max_length=100)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre}: {self.mensaje[:30]}..."