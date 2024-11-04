<?php
// Obtener datos del formulario
$usuario = $_POST['user'];
$nombre = $_POST['nombre'];
$contrasena = password_hash($_POST['contra'], PASSWORD_DEFAULT);  // Hashea la contraseña
$codigp = $_POST['codigo'];
// Crear conexión
$conn = mysqli_connect("localhost", "root", "", "invernadero");

// Consulta SQL para insertar los datos en la tabla
$sql = "INSERT INTO usuarios (nombre_usuario, contrasena, tipo_usuario, codigo) 
        VALUES ('$nomnbre', '$contrasena','$usuario', '$codigo')";

    // Ejecutar la consulta
    mysqli_query($conn, $sql);

    mysqli_close($conn);
?>