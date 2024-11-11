<?php
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
    if ($usuario === "User") {
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
        echo json_encode(["success" => false, "message" => "Tipo de usuario no valido"]);
        exit();
    }

    // Ejecutar la consulta
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar si la consulta devolvió un resultado
    if ($result->num_rows > 0) {
        if ($usuario === "User") {
            header("Location: Usuario/"); // Redirigir a la página de usuario
            echo json_encode(["success" => true, $redirectUrl = header("Location: Usuario/index.html")]);
        } else if ($usuario === "Admin") {
            header("Location: administrador/templates/index.html"); // Redirigir a la página de administrador
        }
    } else {
        // Autenticación fallida, mostrar mensaje de error
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas o usuario no encontrado"]);
    }

// Cerrar la conexión
    $stmt->close();
    $conn->close();
?>