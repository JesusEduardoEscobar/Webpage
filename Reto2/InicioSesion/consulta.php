<?php
/* Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "invernadero");

// Recibir los datos del formulario
$usuario = $_POST['user'];
$nombre = $_POST['nombre'];
$contra = $_POST['contra'];
$adminCode = isset($_POST['codigo']) ? $_POST['codigo'] : '';

// Verificar los datos dependiendo del tipo de usuario
if ($usuario === "Usuario") {
    $control_actuador = '0';
    $acceso_visualizacion = '0';

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasena = ? AND tipo_usuario = ?  AND acceso_visualizacion = ? AND control_actuador = ?");
    $stmt->bind_param("ss", $nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador);
} else if ($usuario === "Admin") {
    $control_actuador = '1';
    $acceso_visualizacion = '1';

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasena = ? AND tipo_usuario = ? AND acceso_visualizacion = ? AND control_actuador = ? AND codigo_admin = ?");
    $stmt->bind_param("sss", $nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador, $adminCode);
} else {
    echo json_encode(["success" => false, "message" => "Tipo de usuario no válido"]);
    exit();
}

// Ejecutar la consulta
$stmt->execute();
$result = $stmt->get_result();

// Verificar si la consulta devolvió un resultado
if ($result->num_rows > 0) {
    // Usuario autenticado correctamente
    if ($usuario === "User") {
        header("Location: Usuario/index.html"); // Redirigir a la página de usuario
    } else if ($usuario === "Admin") {
        header("Location: administrador/index.html"); // Redirigir a la página de administrador
    }
} else {
    // Autenticación fallida, mostrar mensaje de error
    echo json_encode(["success" => false, "message" => "Credenciales incorrectas o usuario no encontrado"]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();*/

    // Conexión a la base de datos
    $conn = new mysqli("localhost", "root", "", "invernadero");

    // Verifica la conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Recibir los datos del formulario
    $usuario = $_POST['user'];
    $nombre = $_POST['nombre'];
    $contra = $_POST['contra'];
    $adminCode = isset($_POST['codigo']) ? $_POST['codigo'] : '';

    // Verificar los datos dependiendo del tipo de usuario
    if ($usuario === "Usuario") {
        $control_actuador = '0';
        $acceso_visualizacion = '0';

        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasena = ? AND tipo_usuario = ? AND acceso_visualizacion = ? AND control_actuador = ?");
        $stmt->bind_param("sssss", $nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador);
    } else if ($usuario === "Admin") {
        $control_actuador = '1';
        $acceso_visualizacion = '1';

        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasena = ? AND tipo_usuario = ? AND acceso_visualizacion = ? AND control_actuador = ?   AND codigo_admin = ?");
        $stmt->bind_param("ssssss", $nombre, $contra, $usuario, $acceso_visualizacion, $control_actuador, $adminCode);
    } else {
        echo json_encode(["success" => false, "message" => "Tipo de usuario no válido"]);
        exit();
    }

    // Ejecutar la consulta
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar si la consulta devolvió un resultado
    if ($result->num_rows > 0) {
        // Usuario autenticado correctamente
        $redirectUrl = ($usuario === "Usuario") ? "Usuario/index.html" : "administrador/index.html";
        echo json_encode(["success" => true, "redirect" => $redirectUrl]);
    } else {
        // Autenticación fallida, mostrar mensaje de error
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas o usuario no encontrado"]);
    }

// Cerrar la conexión
    $stmt->close();
    $conn->close();
?>
