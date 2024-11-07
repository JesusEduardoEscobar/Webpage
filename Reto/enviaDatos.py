"""
Este módulo contiene una aplicación Flask que se conecta a una base de datos MySQL.
Define rutas para manejar solicitudes HTTP y funciones para interactuar con la base de datos.
"""
from flask import Flask, request
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Configuración de la conexión a la base de datos
def create_connection():
    return mysql.connector.connect(
        host="localhost",          # Cambia por el host de tu base de datos
        user="root",         # Cambia por tu usuario de MySQL
        password="",  # Cambia por tu contraseña de MySQL
        database="invernadero"
    )

# Ruta que maneja el formulario de envío
@app.route('/enviar', methods=['POST'])
def enviar():
    tipo_usuario = request.form.get("user")
    nombre_usuario = request.form.get("nombre")
    contrasena = request.form.get("contra")
    codigo_admin = request.form.get("codigo")

    # Verificación de conexión a la base de datos
    try:
        connection = create_connection()
        cursor = connection.cursor()

        # Inserta los datos en la tabla `usuarios`
        query = """
        INSERT INTO usuarios (tipo_usuario, nombre_usuario, contrasena, codigo_admin) 
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (tipo_usuario, nombre_usuario, contrasena, codigo_admin))
        connection.commit()

        return "Datos enviados exitosamente"
    except Error as e:
        print(f"Error al conectar con la base de datos: {e}")
        return "Error al enviar los datos"
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
