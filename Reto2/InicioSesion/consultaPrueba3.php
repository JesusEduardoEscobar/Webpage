<?php
// Configuración de las bases de datos
$db1_config = [
    "host" => "192.168.100.85",  // IP del servidor 1
    "user" => "admin",           // Usuario de la base de datos 1
    "password" => "admin",       // Contraseña de la base de datos 1
    "database" => "INVERNADERO"  // Nombre de la base de datos 1
];

$db2_config = [
    "host" => "localhost",       // IP del servidor 2 (local)
    "user" => "root",            // Usuario de la base de datos 2
    "password" => "",            // Contraseña de la base de datos 2
    "database" => "INVERNADERO"  // Nombre de la base de datos 2
];

// Función para conectar a la base de datos
function conectarBaseDeDatos($config) {
    $conn = new mysqli($config['host'], $config['user'], $config['password'], $config['database']);
    if ($conn->connect_error) {
        die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
    }
    return $conn;
}

// Conexión a las dos bases de datos
$conn1 = conectarBaseDeDatos($db1_config);
$conn2 = conectarBaseDeDatos($db2_config);

// Recibir los datos del formulario
$usuario = $_POST['user'];
$nombre = $_POST['nombre'];
$contra = $_POST['contra'];
$adminCode = isset($_POST['codigo']) ? $_POST['codigo'] : '';

// Añadir mensajes de depuración
error_log("Datos recibidos: Usuario - $usuario, Nombre - $nombre, Contraseña - $contra, Código Admin - $adminCode");

// Crear consultas para ambos tipos de usuarios
if ($usuario === "User") {
    $control_actuador = '0';
    $acceso_visualizacion = '0';

    $consulta = "SELECT * FROM usuarios 
                 WHERE nombre_usuario = ? 
                   AND contrasena = ? 
                   AND tipo_usuario = ? 
                   AND acceso_visualizacion = ? 
                   AND control_actuador = ?";
    $params = [$nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador];

} else if ($usuario === "Admin") {
    $control_actuador = '1';
    $acceso_visualizacion = '1';

    $consulta = "SELECT * FROM usuarios 
                 WHERE nombre_usuario = ? 
                   AND contrasena = ? 
                   AND tipo_usuario = ? 
                   AND acceso_visualizacion = ? 
                   AND control_actuador = ? 
                   AND codigo_admin = ?";
    $params = [$nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador, $adminCode];

} else {
    echo json_encode(["success" => false, "message" => "Tipo de usuario no válido"]);
    exit();
}

// Función para ejecutar una consulta en una base de datos
function validarUsuario($conn, $consulta, $params) {
    $stmt = $conn->prepare($consulta);
    if ($usuario === "Admin") {
        $stmt->bind_param("ssssss", ...$params);
    } else {
        $stmt->bind_param("sssss", ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->num_rows > 0; // Retorna true si se encontró el usuario
}

// Validar en ambas bases de datos
$validado_db1 = validarUsuario($conn1, $consulta, $params);
$validado_db2 = validarUsuario($conn2, $consulta, $params);

if ($validado_db1 || $validado_db2) {
    if ($usuario === "User") {
        echo json_encode(["success" => true, "redirect" => "Usuario/index.html"]);
    } else if ($usuario === "Admin") {
        echo json_encode(["success" => true, "redirect" => "http://127.0.0.1:5000"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Credenciales incorrectas o usuario no encontrado"]);
}

// Cerrar las conexiones
$conn1->close();
$conn2->close();
?>
