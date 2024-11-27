<?php
    // Habilitar la visualización de errores para depuración
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $host = 'raspberrypi-mariadb.at.remote.it'; // Hostname
    $port = 33000; // Port
    $user = 'admin'; // Username
    $password = 'admin'; // Password
    $database = 'INVERNADERO'; // Database name

    // Create connection
    $conn = new mysqli($host, $user, $password, $database, $port);

    // Verifica la conexión
    if ($conn->connect_error) {
        die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
    }

    // Recibir los datos del formulario
    $usuario = isset($_POST['user']) ? trim($_POST['user']) : '';
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $contra = isset($_POST['contra']) ? trim($_POST['contra']) : '';
    $adminCode = isset($_POST['codigo']) ? trim($_POST['codigo']) : '';

    // Añadir mensajes de depuración
    error_log("Datos recibidos: Usuario - $usuario, Nombre - $nombre, Contraseña - $contra, Código Admin - $adminCode");

    // Verificar que los campos requeridos no estén vacíos
    if (empty($usuario) || empty($nombre) || empty($contra)) {
        echo json_encode(["success" => false, "message" => "Por favor, complete todos los campos requeridos."]);
        exit();
    }

    // Verificar los datos dependiendo del tipo de usuario
    if ($usuario === "User") {
        $control_actuador = '0';
        $acceso_visualizacion = '0';

        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasena = ? AND tipo_usuario = ? AND acceso_visualizacion = ? AND control_actuador = ?");
        $stmt->bind_param("sssss", $nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador);
    } else if ($usuario === "Admin") {
        $control_actuador = '1';
        $acceso_visualizacion = '1';

        // Verificar que el código de administrador esté presente para el tipo Admin
        if (empty($adminCode)) {
            echo json_encode(["success" => false, "message" => "El código de administrador es requerido para el tipo Admin."]);
            exit();
        }

        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasena = ? AND tipo_usuario = ? AND acceso_visualizacion = ? AND control_actuador = ? AND codigo_admin = ?");
        $stmt->bind_param("ssssss", $nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador, $adminCode);
    } else {
        echo json_encode(["success" => false, "message" => "Tipo de usuario no válido"]);
        exit();
    }

    // Ejecutar la consulta
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        // Verificar si la consulta devolvió un resultado
        if ($result->num_rows > 0) {
            if ($usuario === "User") {
                echo json_encode(["success" => true, "redirect" => "http://127.0.0.1:3000/"]);
            } else if ($usuario === "Admin") {
                echo json_encode(["success" => true, "redirect" => "http://127.0.0.1:5000/"]);
            }
        } else {
            // Autenticación fallida, mostrar mensaje de error
            echo json_encode(["success" => false, "message" => "Credenciales incorrectas o usuario no encontrado"]);
        }
    } else {
        // Si la ejecución falla, mostrar mensaje de error
        error_log("Error en la ejecución de la consulta: " . $stmt->error);
        echo json_encode(["success" => false, "message" => "Error en la ejecución de la consulta"]);
    }

    // Cerrar la conexión
    $stmt->close();
    $conn->close();
?>