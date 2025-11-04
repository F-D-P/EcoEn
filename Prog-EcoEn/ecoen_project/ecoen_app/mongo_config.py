# mongo_config.py

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# URI de conexión con tu usuario y contraseña reales
uri = "mongodb+srv://dbEcoEn:EcoEn2025@cluster0.zltefmh.mongodb.net/?retryWrites=true&w=majority"

# Crear el cliente y conectar al servidor
client = MongoClient(uri, server_api=ServerApi('1'))

# Referencia directa a tu base de datos "EcoEn"
db = client["EcoEn"]

# Confirmar conexión con un ping
try:
    client.admin.command('ping')
    print("Conexión exitosa a MongoDB Atlas.")
except Exception as e:
    print("Error al conectar con MongoDB:", e)
