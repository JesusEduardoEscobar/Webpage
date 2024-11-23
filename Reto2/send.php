<?php
$usuario = $_POST['user'];
$nombre = $_POST['nombre'];
$contrasena = $_POST['contra'];
$codigo = $_POST['codigo'];

$conn1 = mysqli_connect("localhost", "root", "", "invernadero");

if ($usuario == 'Admin') {
    $control_actuador = '1';
    $acceso_visualizacion = '1';
    $usuario = 'Admin';
} else if($usuario == 'User') {
    $control_actuador = '0';
    $acceso_visualizacion = '0';
    $usuario = 'User';
}

$datos = ("INSERT INTO usuarios (nombre_usuario, contrasena, tipo_usuario, acceso_visualizacion, control_actuador, codigo_admin) VALUES ('$nombre', '$contrasena', '$usuario', '$acceso_visualizacion', '$control_actuador', '$codigo')");

// Insertar en la primera base de datos
if (!mysqli_query($conn1, $datos)) {
    die("Error al insertar en la base de datos 1: " . mysqli_error($conn1));
}

// Conexión a la segunda base de datos
$conn2 = mysqli_connect("localhost", "root", "", "otra_base");

// Validar la conexión a la segunda base de datos
if (!$conn2) {
    die("Error de conexión a la base de datos 2: " . mysqli_connect_error());
}

// Insertar los mismos datos en la segunda base de datos
if (!mysqli_query($conn2, $datos)) {
    die("Error al insertar en la base de datos 2: " . mysqli_error($conn2));
}

// Cerrar ambas conexiones
mysqli_close($conn1);
mysqli_close($conn2);

echo "Datos insertados correctamente en ambas bases de datos.";
?>