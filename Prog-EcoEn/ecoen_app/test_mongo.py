from mongo_config import db

# Crear un documento de prueba
prueba = {
    "nombre": "Prueba",
    "mensaje": "Este es un test de conexión"
}

# Insertar en la colección "opiniones"
resultado = db.opiniones.insert_one(prueba)

# Mostrar el ID insertado
print("Documento insertado con ID:", resultado.inserted_id)
