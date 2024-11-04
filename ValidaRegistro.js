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
    } else {
        document.getElementById('group_contra2').classList.remove('userForm_group-incorrecto');
        document.getElementById('group_contra2').classList.add('userForm_group-correcto');
        document.querySelector('#group_contra2 i').classList.add('fa-check');
        document.querySelector('#group_contra2 i').classList.remove('fa-times-circle');
        document.querySelector('#group_contra2 .userForm_input-error').classList.remove('userForm_input-error-activo');
        campos['contra'] = true;
    }
}
            

inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario, validarContra);
    input.addEventListener('blur', validarFormulario, validarContra);
});

userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    $.post('envioDatos.py', {
        user: document.getElementById('user').value,
        usuario: document.getElementById('nombre').value,
        password: document.getElementById('contra').value,
        codigo: document.getElementById('codigo').value
    }, function(response) {
        if (response.success) {
            userForm.reset();
            document.getElementById('userForm_mensaje-exito').classList.add('userForm_mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('userForm_mensaje-exito').classList.remove('userForm_mensaje-exito-activo');
            }, 5000);
        } else {
            document.getElementById('userForm_mensaje').classList.add('userForm_mensaje-activo');
            setTimeout(() => {
                document.getElementById('userForm_mensaje').classList.remove('userForm_mensaje-activo');
            }, 5000);
        }
    });

    if (campos.user && campos.nombre && campos.contra && campos.codigo) {
        // Aquí también podrías manejar la respuesta como en el callback
    } else {
        document.getElementById('userForm_mensaje').classList.add('userForm_mensaje-activo');
        setTimeout(() => {
            document.getElementById('userForm_mensaje').classList.remove('userForm_mensaje-activo');
        }, 5000);
    }
});