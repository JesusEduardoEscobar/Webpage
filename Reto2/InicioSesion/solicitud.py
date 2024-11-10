from flask import Flask, request, jsonify
from solicitud import solicitud #Asegúrate de que el archivo anterior esté guardado como solicitud.py

app = Flask(__name__)

@app.route('/validar', methods=['POST'])
def validar():
    data = request.json
    user_type = data.get('userType')
    username = data.get('username')
    password = data.get('password')
    admin_code = data.get('adminCode')

    if solicitud(user_type, username, password, admin_code):
        return jsonify({"success": True, "message": "Usuario validado correctamente"})
    else:
        return jsonify({"success": False, "message": "Credenciales incorrectas"})

if __name__ == '__main__':
    app.run(debug=True)
