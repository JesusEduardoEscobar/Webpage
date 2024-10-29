const userForm = document.getElementById('userForm');
const inputs = document.querySelectorAll('#userForm input, #userForm select');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-\?]{4,16}$/, // Letras, numeros, guion_bajo y guion, cantidad
	password: /^.{5,20}$/, // 4 a 12 digitos.
	codigo: /^.{7,10}$/ // 7 a 14 digitos
}

const campos = {
    usuario: false,
    password: false,
    password2: false,
    codigo: false
}

function mostrar(select) {
    var adminCode = document.getElementById("adminCodeField");
    if (select.value === 'Admin') {
        adminCode.style.display = 'block';
        campos['codigo'] = false;
    } else {
        adminCode.style.display = 'none';
        campos['codigo'] = true;
        document.getElementById('adminCode').value = '';
    }
}

inputs.forEach((input) =>{
    input.addEventListener('keyup');
    input.addEventListener('blur');
});

userForm.addEventListener('submit', function (e) {
    e.preventDefault();
});