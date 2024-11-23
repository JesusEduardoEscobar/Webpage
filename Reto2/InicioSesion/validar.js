function mostrar(select) {
    var adminCode = document.getElementById("group_codigo");
    if (select.value === 'Admin') {
        adminCode.style.display = 'block';
    } else {
        adminCode.style.display = 'none';
        document.getElementById('codigo').value = '';
    }
}

document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Validación de formulario
    var user = $('#user').val();
    var nombre = $('#nombre').val();
    var contra = $('#contra').val();
    var codigo = $('#codigo').val();
    var errorMessage = '';

    if (!user || !nombre || !contra || (user === 'Admin' && !codigo)) {
        errorMessage = 'Por favor, complete todos los campos requeridos.';
    }

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    $.post('/consulta.php', {
        user: user,
        nombre: nombre,
        contra: contra,
        codigo: codigo
    }, function(response) {
        console.log("Datos enviados exitosamente:", response);

        if (response.success) {
            // Redirect the user to the specified URL
            window.location.replace(response.redirect);
        } else {
            // Show an error message if login failed
            alert(response.message);
        }
    }, 'json') // Specify that the response is JSON so it is parsed automatically
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud:", textStatus, errorThrown);
        alert("Hubo un error al enviar los datos. Inténtalo de nuevo.");
    });
});
