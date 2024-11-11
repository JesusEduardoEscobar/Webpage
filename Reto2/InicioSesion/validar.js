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

    $.post('/consulta.php', {
        user: $('#user').val(),
        nombre: $('#nombre').val(),
        contra: $('#contra').val(),
        codigo: $('#codigo').val()
    }, function(response) {
        console.log("Datos enviados exitosamente:", response);

        if (response.success) {
            // Redirect the user to the specified URL
            window.location.href = response.redirect;
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
