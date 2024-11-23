<?php
// Configuración de la base de datos
$host = "192.168.100.85";  // Dirección IP del servidor
$user = "admin";           // Usuario de la base de datos
$password = "admin";       // Contraseña de la base de datos
$database = "INVERNADERO"; // Nombre de la base de datos

// Crear la conexión
$conn = new mysqli($host, $user, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
}

// Recibir los datos del formulario
$usuario = $_POST['user'];
$nombre = $_POST['nombre'];
$contra = $_POST['contra'];
$adminCode = isset($_POST['codigo']) ? $_POST['codigo'] : '';

// Añadir mensajes de depuración
error_log("Datos recibidos: Usuario - $usuario, Nombre - $nombre, Contraseña - $contra, Código Admin - $adminCode");

// Preparar la consulta dependiendo del tipo de usuario
if ($usuario === "User") {
    $control_actuador = '0';
    $acceso_visualizacion = '0';

    $stmt = $conn->prepare("SELECT * FROM usuarios 
                            WHERE nombre_usuario = ? 
                              AND contrasena = ? 
                              AND tipo_usuario = ? 
                              AND acceso_visualizacion = ? 
                              AND control_actuador = ?");
    $stmt->bind_param("sssss", $nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador);

} else if ($usuario === "Admin") {
    $control_actuador = '1';
    $acceso_visualizacion = '1';

    $stmt = $conn->prepare("SELECT * FROM usuarios 
                            WHERE nombre_usuario = ? 
                              AND contrasena = ? 
                              AND tipo_usuario = ? 
                              AND acceso_visualizacion = ? 
                              AND control_actuador = ? 
                              AND codigo_admin = ?");
    $stmt->bind_param("ssssss", $nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador, $adminCode);

} else {
    // Tipo de usuario no válido
    echo json_encode(["success" => false, "message" => "Tipo de usuario no válido"]);
    exit();
}

// Ejecutar la consulta
if ($stmt->execute()) {
    $result = $stmt->get_result();

    // Verificar si se encontró algún usuario
    if ($result->num_rows > 0) {
        if ($usuario === "User") {
            echo json_encode(["success" => true, "redirect" => "Usuario/index.html"]);
        } else if ($usuario === "Admin") {
            echo json_encode(["success" => true, "redirect" => "http://127.0.0.1:5000"]);
        }
    } else {
        // Usuario no encontrado o credenciales incorrectas
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas o usuario no encontrado"]);
    }
} else {
    // Error en la ejecución de la consulta
    echo json_encode(["success" => false, "message" => "Error en la ejecución de la consulta: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
