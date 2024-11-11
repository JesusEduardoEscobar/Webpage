const userForm = document.getElementById('userForm');
const inputs = document.querySelectorAll('#userForm input, #userForm select');

const expresiones = {
	user: /^[a-zA-Z0-9\_\-\?]{4,16}$/, // Letras, numeros, guion_bajo y guion, cantidad
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    contra: /^.{5,20}$/, // 4 a 12 digitos.
	codigo: /^[A-Z]{3}[0-9]{2}-[a-z]{2}[A-Z][0-9]$/ /* Esto hace que el codigo conste 10 digitos en los cuales    
                                                    los primero 3 deben ser letras mayusculas, los siguientes 
                                                    2 numeros, el siguiente un "-", los siguientes 2 letras minusculas, 
                                                    el siguiente una letra mayuscula y por ultimo un numero*/
}

const campos = {
    user: false,
    nombre: false,
    contra: false,
    contra2: false,
    codigo: false
}

function mostrar(select) {
    var adminCode = document.getElementById("group_codigo");
    if (select.value === 'Admin') {
        adminCode.style.display = 'block';
        campos['codigo'] = false;
    } else {
        adminCode.style.display = 'none';
        campos['codigo'] = true;
        document.getElementById('codigo').value = '';
    }
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "user":
            validacionCampos(expresiones.user, e.target, 'user');
            if(e.target.value === "Admin") {
                validacionCampos(expresiones.codigo, e.target, 'codigo');
            } else {
                campos['codigo'] = true;
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
            validacionCampos(expresiones.codigo, e.target, 'codigo');
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
    console.log(campos[campo]);
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
    setTimeout(() => {if (tipoUsuario === 'Admin') { 
        location.href = 'InicioSesion/administrador/templates/index.html'; 
    } else if (tipoUsuario === 'User') { 
        location.href = 'InicioSesion/Usuario/index.html'; 
    } else { 
        console.error('Tipo de usuario no válido.'); 
    } }, 2000)
}

inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario, validarContra);
    input.addEventListener('blur', validarFormulario, validarContra);
});

userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    $.post('send.php', {
        user: $('#user').val(),
        nombre: $('#nombre').val(),
        contra: $('#contra').val(),
        codigo: $('#codigo').val()
    });
    //console.log(campos.user + campos.nombre + campos.contra + campos.codigo);
    if (campos.user && campos.nombre && campos.contra && campos.contra2 && campos.codigo) {
        userForm.reset();
        document.getElementById('userForm_mensaje-exito').classList.add('userForm_mensaje-exito-activo');
        
        setTimeout(() => {
            document.getElementById('userForm_mensaje-exito').classList.remove('userForm_mensaje-exito-activo');
        }, 2000);
    } else {
        document.getElementById('userForm_mensaje').classList.add('userForm_mensaje-activo');
        setTimeout(() => {
            document.getElementById('userForm_mensaje').classList.remove('userForm_mensaje-activo');
        }, 2000);
    }
});