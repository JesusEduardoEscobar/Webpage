<?php
// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Recibir los datos del formulario
$usuario = isset($_POST['user']) ? trim($_POST['user']) : '';
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$contrasena = isset($_POST['contra']) ? trim($_POST['contra']) : '';
$codigo = isset($_POST['codigo']) ? trim($_POST['codigo']) : '';

// Validar que los campos requeridos no estén vacíos
if (empty($usuario) || empty($nombre) || empty($contrasena)) {
    echo json_encode(["success" => false, "message" => "Por favor, complete todos los campos requeridos."]);
    exit();
}

// Configuración de la base de datos
$host = 'raspberrypi-mariadb.at.remote.it'; // Hostname
$port = 33000; // Port
$user = 'admin'; // Username
$password = 'admin'; // Password
$database = 'INVERNADERO'; // Database name

// Crear conexión a la base de datos
$conn = new mysqli($host, $user, $password, $database, $port);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
}

// Determinar el tipo de usuario y establecer valores para acceso y control
if ($usuario === 'Admin') {
    $control_actuador = '1';
    $acceso_visualizacion = '1';
} else if ($usuario === 'User') {
    $control_actuador = '0';
    $acceso_visualizacion = '0';
} else {
    echo json_encode(["success" => false, "message" => "Tipo de usuario no válido"]);
    exit();
}

// Preparar la consulta para insertar datos en la base de datos
$stmt = $conn->prepare("INSERT INTO usuarios (nombre_usuario, contrasena, tipo_usuario, acceso_visualizacion, control_actuador, codigo_admin) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $nombre, $contrasena, $usuario, $acceso_visualizacion, $control_actuador, $codigo);

// Ejecutar la consulta e insertar en la base de datos
if ($stmt->execute()) {
    // Redirigir según el tipo de usuario después de la inserción exitosa
    if ($usuario === "Admin") {
        echo json_encode(["success" => true, "redirect" => "http://127.0.0.1:5000/"]);
    } else if ($usuario === "User") {
        echo json_encode(["success" => true, "redirect" => "http://127.0.0.1:3000/"]);
    }
} else {
    // Si la ejecución falla, mostrar mensaje de error
    echo json_encode(["success" => false, "message" => "Error al insertar en la base de datos: " . $stmt->error]);
}

// Cerrar la declaración y la conexión
$stmt->close();
$conn->close();
?>