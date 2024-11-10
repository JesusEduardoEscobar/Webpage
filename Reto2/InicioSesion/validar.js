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
    $.post('/consulta.php', {
        user: $('#user').val(),
        nombre: $('#nombre').val(),
        contra: $('#contra').val(),
        codigo: $('#codigo').val()
    }).done(function(response) {
        console.log("Datos enviados exitosamente:", response);
        if (response.success) {
            document.getElementById('userForm').reset();
            document.getElementById('userForm_mensaje-exito').classList.add('userForm_mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('userForm_mensaje-exito').classList.remove('userForm_mensaje-exito-activo');
            }, 5000);
        } else {
            console.error("Error en la respuesta del servidor:", response.message);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud:", textStatus, errorThrown);
    });
});
