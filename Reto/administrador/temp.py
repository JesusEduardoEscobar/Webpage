from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

# Ruta para obtener la temperatura de la base de datos
@app.route('/')
def index():
    # Configura los datos de conexión
    db_config = {
        'host': 'localhost',
        'user': 'root',
        'password': '',
        'database': 'invernadero',
    }
    
    # Conexión a la base de datos
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    # Consulta para obtener la última lectura de temperatura
    cursor.execute("SELECT * FROM temp_sensor ORDER BY timestamp DESC LIMIT 1")
    last_reading = cursor.fetchone()

    # Cierra la conexión
    cursor.close()
    connection.close()

    # Pasamos los datos al template
    if last_reading:
        temperature = last_reading[1]  # Ajusta el índice según tu tabla
        timestamp = last_reading[0]
    else:
        temperature = "N/A"
        timestamp = "N/A"

    return render_template('index.html', temperature=temperature, timestamp=timestamp)

if __name__ == '__main__':
    app.run(debug=True)
