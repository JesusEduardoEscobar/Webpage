<?php
$usuario = $_POST['user'];
$nombre = $_POST['nombre'];
$contrasena = $_POST['contra'];
$codigo = $_POST['codigo'];

$conn = mysqli_connect("localhost", "root", "", "invernadero");

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

mysqli_query($conn, $datos);

mysqli_close($conn);
?>