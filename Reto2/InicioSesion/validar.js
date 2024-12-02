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
    const user = $('#user').val();
    const nombre = $('#nombre').val();
    const contra = $('#contra').val();
    const codigo = $('#codigo').val();
    
    let errorMessage = ''; // Definir variable dentro del bloque para poder cambiarla.

    // Validar los campos
    if (!user || !nombre || !contra) {
        errorMessage = 'Por favor, complete todos los campos requeridos.';
    }

    // Validar el campo 'codigo' solo si el usuario es Admin
    if (user === 'Admin' && !codigo) {
        errorMessage = 'El código es requerido para los administradores.';
    }

    // Si hay un mensaje de error, mostrarlo y detener el envío
    if (errorMessage) {
        alert(errorMessage);
        return; // Detener el envío si hay error
    }

    // Si la validación pasa, enviar los datos a consulta.php
    $.post('consulta.php', {
        user: user,
        nombre: nombre,
        contra: contra,
        codigo: codigo
    }, function(response) {
        console.log("Datos enviados exitosamente:", response);

        if (response.success) {
            // Redirigir al usuario si la respuesta es exitosa
            window.location.replace(response.redirect);
        } else {
            // Mostrar mensaje de error si el inicio de sesión falla
            alert(response.message);
        }
    }, 'json') // Especificar que la respuesta es JSON para que se analice automáticamente
    .fail(function(jqXHR, textStatus, errorThrown) {
        //console.error("Error en la solicitud:", textStatus, errorThrown);
        alert("Hubo un error al enviar los datos. Inténtalo de nuevo.");
    });
});