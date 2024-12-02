const userForm = document.getElementById('userForm');
const inputs = document.querySelectorAll('#userForm input, #userForm select');

const expresiones = {
    user: /^[a-zA-Z0-9\_\-\?]{4,16}$/, // Letras, numeros, guion_bajo y guion, cantidad
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    contra: /^.{5,20}$/, // 5 a 20 caracteres.
    codigo: /^[A-Z]{3}[0-9]{2}-[a-z]{2}[A-Z][0-9]$/ // Formato del código
}

const campos = {
    user: false,
    nombre: false,
    contra: false,
    contra2: false,
    codigo: false
}

function mostrar(select) {
    const adminCode = document.getElementById("group_codigo");
    if (select.value === 'Admin') {
        adminCode.classList.add('visible');
        campos['codigo'] = false; // Resetear el estado del campo código
    } else if(select.value === 'User') {
        adminCode.classList.remove('visible');
        campos['codigo'] = true; // Marcar como válido si no es Admin
        document.getElementById('codigo').value = ''; // Limpiar el campo código
    }
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "user":
            validacionCampos(expresiones.user, e.target, 'user');
            if (e.target.value === "Admin") {
                campos['codigo'] = false; // Si es Admin, no se valida el código
            } 
            if(e.target.value === 'User') {
                campos['codigo'] = true; // Si no es Admin, se marca como válido
            }
            break;

        case "nombre":
            validacionCampos(expresiones.nombre, e.target, 'nombre');
            break;

        case "contra":
            validacionCampos(expresiones.contra, e.target, 'contra');
            break;

        case "contra2":
            validarContra();
            break;

        case "codigo":
            if (document.getElementById("group_codigo").classList.contains('visible')) {
                validacionCampos(expresiones.codigo, e.target, 'codigo');
            }
            break;
    }
}

const validacionCampos = (expresiones, input, campo) => {
    if (expresiones.test(input.value)) {
        document.getElementById(`group_${campo}`).classList.remove('userForm_group-incorrecto');
        document.getElementById(`group_${campo}`).classList.add('userForm_group-correcto');
        document.querySelector(`#group_${campo} i`).classList.add('fa-check');
        document.querySelector(`#group_${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group_${campo} .userForm_input-error`).classList.remove('userForm_input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`group_${campo}`).classList.add('userForm_group-incorrecto');
        document.getElementById(`group_${campo}`).classList.remove('userForm_group-correcto');
        document.querySelector(`#group_${campo} i`).classList.remove('fa-check');
        document.querySelector(`#group_${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#group_${campo} .userForm_input-error`).classList.add('userForm_input-error-activo');
        campos[campo] = false;
    }
}

const validarContra = () => {
    const password = document.getElementById('contra');
    const password2 = document.getElementById('contra2');

    if (password.value !== password2.value) {
        document.getElementById('group_contra2').classList.add('userForm_group-incorrecto');
        document.getElementById('group_contra2').classList.remove('userForm_group-correcto');
        document.querySelector('#group_contra2 i').classList.remove('fa-check');
        document.querySelector('#group_contra2 i').classList.add('fa-times-circle');
        document.querySelector('#group_contra2 .userForm_input-error').classList.add('userForm_input-error-activo');
        campos['contra'] = false;
        campos['contra2'] = false;
    } else {
        document.getElementById('group_contra2').classList.remove('userForm_group-incorrecto');
        document.getElementById('group_contra2').classList.add('userForm_group-correcto');
        document.querySelector('#group_contra2 i').classList.add('fa-check');
        document.querySelector('#group_contra2 i').classList.remove('fa-times-circle');
        document.querySelector('#group_contra2 .userForm_input-error').classList.remove('userForm_input-error-activo');
        campos['contra'] = true;
        campos['contra2'] = true;
    }
}

function redirigir() { 
    const tipoUsuario = document.getElementById('user').value; 
    setTimeout(() => { 
        if (tipoUsuario === 'Admin') { 
            location.href = 'http://127.0.0.1:5000/'; 
        } else if (tipoUsuario === 'User') { 
            location.href = 'http://127.0.0.1:3000/'; 
        } else { 
            console.error('Tipo de usuario no válido.'); 
        } 
    }, 2000);
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
});

userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    $.post('send.php', {
        user: $('#user').val(),
        nombre: $('#nombre').val(),
        contra: $('#contra').val(),
        codigo: $('#codigo').val()
    }, function(response) {
       // Manejar la respuesta del servidor aquí si es necesario
       const jsonResponse = JSON.parse(response);
       if (jsonResponse.success) {
           userForm.reset();
           redirigir(); // Llamar a la función para redirigir después de un envío exitoso
           document.getElementById('userForm_mensaje-exito').classList.add('userForm_mensaje-exito-activo');

           setTimeout(() => {
               document.getElementById('userForm_mensaje-exito').classList.remove('userForm_mensaje-exito-activo');
           }, 2000);
       } else {
           // Mostrar mensaje de error si la respuesta no fue exitosa
           alert(jsonResponse.message);
       }
   });

   if (!campos.user || !campos.nombre || !campos.contra || !campos.contra2 || !campos.codigo) {
       document.getElementById('userForm_mensaje').classList.add('userForm_mensaje-activo');
       setTimeout(() => {
           document.getElementById('userForm_mensaje').classList.remove('userForm_mensaje-activo');
       }, 2000);
   }
});