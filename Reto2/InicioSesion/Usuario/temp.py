from flask import Flask, render_template, jsonify, request
import mysql.connector
from datetime import datetime

app = Flask(__name__)

# Configuración de la base de datos
db_config = {
    'host': 'raspberrypi-mariadb.at.remote.it',  # Por ejemplo: '192.168.1.100'
    'port': 33000,
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

def obtener_ultima_temperatura_aire():
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
        
        print("No se encontraron registros de temperatura del aire")
        return None, None
        
    except mysql.connector.Error as err:
        print(f"Error consultando temperatura: {err}")
        return None, None
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()

def obtener_ultima_temperatura_suelo():
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
            FROM sensor_temperatura_suelo 
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 1
        """
        cursor.execute(consulta)
        
        resultado = cursor.fetchone()
        if resultado:
            return resultado['valor'], resultado['fecha_hora']
        
        print("No se encontraron registros de temperatura del suelo")
        return None, None
        
    except mysql.connector.Error as err:
        print(f"Error consultando temperatura: {err}")
        return None, None
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()

def obtener_ultima_humedad_aire():
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
        
        print("No se encontraron registros de humedad del aire")
        return None, None
        
    except mysql.connector.Error as err:
        print(f"Error consultando humedad: {err}")
        return None, None
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()

def obtener_ultima_humedad_suelo():
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
        consulta ="""
            SELECT valor, fecha_hora 
            FROM sensor_humedad_suelo 
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 1
        """
        cursor.execute(consulta)
        resultado = cursor.fetchone()
        if resultado:
            return resultado['valor'], resultado['fecha_hora']
        print("No se encontraron registros de la humedad del suelo")
        return None, None
    except mysql.connector.Error as err:
        print(f"Error consultando humedad: {err}")
        return None, None
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()

def obtener_intensidad_luz():
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
        
        # Consulta para obtener la última temperatura registrada en la zona 1
        consulta = """
            SELECT valor, fecha_hora 
            FROM  sensor_intensidad_luz 
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 1
        """
        cursor.execute(consulta)
        
        resultado = cursor.fetchone()
        if resultado:
            return resultado['valor'], resultado['fecha_hora']
        
        print("No se encontraron registros de la intensidad de la luz")
        return None, None
        
    except mysql.connector.Error as err:
        print(f"Error consultando temperatura: {err}")
        return None, None
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()

def obtener_ph_suelo():
    """
    Obtiene el ultimo dato del ph del suelo registrada en la base de datos
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
        
        # Consulta para obtener la última temperatura registrada en la zona 1
        consulta = """
            SELECT valor, fecha_hora 
            FROM sensor_ph_suelo
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 1
        """
        cursor.execute(consulta)
        
        resultado = cursor.fetchone()
        if resultado:
            return resultado['valor'], resultado['fecha_hora']
        
        print("No se encontraron registros del ph del suelo")
        return None, None
        
    except mysql.connector.Error as err:
        print(f"Error consultando temperatura: {err}")
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

@app.route('/obtener_datos', methods=['GET'])
def obtener_datos():
    temperatura, timestamp_temp = obtener_ultima_temperatura_aire()
    temperatura_suelo, timestamp_temp_suelo = obtener_ultima_temperatura_suelo()
    humedad, timestamp_hum = obtener_ultima_humedad_aire()
    humedad_suelo, timestamp_hum_suelo = obtener_ultima_humedad_suelo()
    intensidad, timestamp_intensidad = obtener_intensidad_luz()
    ph, timestamp_ph = obtener_ph_suelo()

    # Asegurar que no se retornen valores nulos
    return jsonify({
        'temperaturaAire': temperatura or "No disponible",
        'timestamp_temp': timestamp_temp or "No disponible",
        'temperaturaSuelo': temperatura_suelo or "No disponible",
        'timestamp_temp_suelo': timestamp_temp_suelo or "No disponible",
        'humedadAire': humedad or "No disponible",
        'timestamp_hum': timestamp_hum or "No disponible",
        'humedadSuelo': humedad_suelo or "No disponible",
        'timestamp_hum_suelo': timestamp_hum_suelo or "No disponible",
        'intensidad_luz': intensidad or "No disponible",
        'timestamp_intensidad': timestamp_intensidad or "No disponible",
        'ph_suelo': ph or "No disponible",
        'timestamp_ph': timestamp_ph or "No disponible"
    })


if __name__ == '__main__':
    app.run(debug=True, port=3000)

@app.route('/obtener_historico', methods=['GET'])
def obtener_historico():
    """
    Obtiene los últimos 50 valores de temperatura y humedad de la base de datos.
    """
    try:
        conexion = conectar_base_datos()
        if conexion is None:
            return jsonify({'error': 'Error conectando a la base de datos'}), 500
        
        cursor = conexion.cursor(dictionary=True)
        
        # Consulta para los últimos 50 valores de temperatura del aire
        consulta_temp = """
            SELECT valor, fecha_hora 
            FROM sensor_temperatura 
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 50
        """
        cursor.execute(consulta_temp)
        temperaturaAire = cursor.fetchall()
        
        # Consulta para los últimos 50 valores de temperatura del suelo
        consulta_temp_suelo = """
            SELECT valor, fecha_hora 
            FROM sensor_temperatura_suelo
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 50
        """
        cursor.execute(consulta_temp_suelo)
        temperaturaSuelo = cursor.fetchall()

        # Consulta para los últimos 50 valores de humedad del aire
        consulta_hum_aire = """
            SELECT valor, fecha_hora 
            FROM sensor_humedad_aire 
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 50
        """
        cursor.execute(consulta_hum_aire)
        humedadAire = cursor.fetchall()

        # Consulta para los últimos 50 valores de humedad del suelo
        consulta_temp = """
            SELECT valor, fecha_hora 
            FROM sensor_humedad_suelo
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 50
        """
        cursor.execute(consulta_temp)
        humedadSuelo = cursor.fetchall()

        # Consulta para los últimos 50 valores de la intendidad de la luz
        consulta_temp = """
            SELECT valor, fecha_hora 
            FROM sensor_intesidad_luz
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 50
        """
        cursor.execute(consulta_temp)
        Luminosidad = cursor.fetchall()

        # Consulta para los últimos 50 valores del ph del suelo
        consulta_temp = """
            SELECT valor, fecha_hora 
            FROM sensor_ph_suelo
            WHERE id_zona = 1 
            ORDER BY fecha_hora DESC 
            LIMIT 50
        """
        cursor.execute(consulta_temp)
        ph_suelo = cursor.fetchall()
        
        return jsonify({
            'temperaturaAire': temperaturaAire[::-1],  # Invertir para mostrar en orden cronológico
            'temperaturaSuelo': temperaturaSuelo[::-1],  # Invert
            'humedadAire': humedadAire[::-1],
            'humedadSuelo': humedadSuelo[::-1],
            'Luminosidad': Luminosidad[::-1],
            'ph_suelo': ph_suelo[::-1],
        })
    except mysql.connector.Error as err:
        print(f"Error obteniendo datos históricos: {err}")
        return jsonify({'error': str(err)}), 500
    finally:
        if conexion and conexion.is_connected():
            cursor.close()
            conexion.close()