<?php
// database connection code
if(isset($_POST['username']))
{
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');
$con = mysqli_connect('localhost', 'root', '','Reto');

// get the post records

$userType= $_POST['userType'];
$username = $_POST['username'];
$password = $_POST['password'];
$adminCode = $_POST['adminCode'];

// database insert SQL code
$sql = "INSERT INTO `tbl_users` (`Id`, `flduserType`, `fldusername`, `fldpassword`, `fldadminCode`) VALUES ('0', '$userType', '$username', '$password', '$adminCode')";

// insert in database 
$rs = mysqli_query($con, $sql);
if($rs)
{
	echo "Registration Complete";
}
}
else
{
	echo "Are you a genuine visitor?";
	
}