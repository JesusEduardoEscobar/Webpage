from flask import Flask, render_template, jsonify, request
import mysql.connector
from datetime import datetime

app = Flask(__name__)

# Configuración de la base de datos
db_config = {
    'host': '10.43.100.223',  # Por ejemplo: '192.168.1.100'
    'user': 'admin',
    'password': 'admin',
    'database': 'INVERNADERO'
}

def conectar_base_datos():
    """Establece conexión con la base de datos"""
    try:
        conexion = mysql.connector.connect(**db_config)
        return conexion
    except mysql.connector.Error as err:
        print(f"Error conectando a la base de datos: {err}")
        return None

def obtener_ultima_temperatura():
    """
    Obtiene la última temperatura registrada en la base de datos
    Retorna: 
        - valor de temperatura (float)
        - fecha_hora de la lectura (datetime)
        - None, None si hay error
    """
    try:
        conexion = conectar_base_datos()
        if conexion is None:
            return None, None
        
        cursor = conexion.cursor(dictionary=True)
        
        # Consulta para obtener la última temperatura registrada en la zona 1
        consulta = """
            SELECT valor, fecha_hora 
            FROM sensor_temperatura 
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 1
        """
        cursor.execute(consulta)
        
        resultado = cursor.fetchone()
        if resultado:
            return resultado['valor'], resultado['fecha_hora']
        
        print("No se encontraron registros de temperatura")
        return None, None
        
    except mysql.connector.Error as err:
        print(f"Error consultando temperatura: {err}")
        return None, None
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()

def obtener_ultima_humedad():
    """
    Obtiene la última humedad del aire registrada en la base de datos
    Retorna: 
        - valor de humedad (float)
        - fecha_hora de la lectura (datetime)
        - None, None si hay error
    """
    try:
        conexion = conectar_base_datos()
        if conexion is None:
            return None, None
        
        cursor = conexion.cursor(dictionary=True)
        
        # Consulta para obtener la última humedad registrada en la zona 1
        consulta = """
            SELECT valor, fecha_hora 
            FROM sensor_humedad_aire 
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 1
        """
        cursor.execute(consulta)
        
        resultado = cursor.fetchone()
        if resultado:
            return resultado['valor'], resultado['fecha_hora']
        
        print("No se encontraron registros de humedad")
        return None, None
        
    except mysql.connector.Error as err:
        print(f"Error consultando humedad: {err}")
        return None, None
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()

def cambiar_estado_rele(nuevo_estado):
    """
    Cambia el estado del relé en la base de datos
    Parámetros:
        nuevo_estado: True para encender, False para apagar
    """
    try:
        conexion = conectar_base_datos()
        if conexion is None:
            return False
        
        cursor = conexion.cursor()
        
        # Insertar nuevo estado del relé
        consulta = """
            INSERT INTO actuador_rele1 
            (nombre, id_zona, fecha_hora, estado) 
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(consulta, ('Rele1_Lampara_Z1', 1, datetime.now(), nuevo_estado))
        
        conexion.commit()
        print(f"Relé {'ENCENDIDO' if nuevo_estado else 'APAGADO'} exitosamente")
        return True
        
    except mysql.connector.Error as err:
        print(f"Error cambiando estado del relé: {err}")
        return False
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cambiar_estado_rele', methods=['POST'])
def cambiar_estado():
    estado = request.json.get('estado')
    exito = cambiar_estado_rele(estado)
    mensaje = "Estado cambiado exitosamente" if exito else "Error al cambiar el estado"
    return jsonify({'exito': exito, 'message': mensaje})

@app.route('/obtener_datos', methods=['GET'])
def obtener_datos():
    temperatura, timestamp_temp = obtener_ultima_temperatura()
    humedad, timestamp_hum = obtener_ultima_humedad()
    
    # Devolver tanto temperatura como humedad
    return jsonify({
        'temperature': temperatura,
        'timestamp_temp': timestamp_temp,
        'humidity': humedad,
        'timestamp_hum': timestamp_hum
    })

if __name__ == '__main__':
    app.run(debug=True)