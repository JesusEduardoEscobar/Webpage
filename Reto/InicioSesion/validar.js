// Selecciona los elementos del DOM
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


const validacion = (e) => {
  switch(e.target.name) {}
}
const validar = (expresion, input,campo) => {}

// Mostrar formulario y campo de código de administrador si es necesario
/*userTypeSelect.addEventListener('change', () => {
  const isSelected = userTypeSelect.value !== 'Seleccionar';
  userForm.style.display = isSelected ? 'block' : 'none';
  const isAdmin = userTypeSelect.value === 'Admin';
  
  adminCodeField.style.display = isAdmin ? 'block' : 'none'});*/

inputs.forEach((input) =>{
  input.addEventListener('keyup');
  input.addEventListener('blur');
});

// Manejar el envío del formulario
userForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita el envío real del formulario
  /*if(campos.usuario && campos.password && campos.codigo){
    if (isAdmin && !adminCode) {
      alert('Por favor, ingrese el código de administrador.');
      return;
    }

    alert('Formulario enviado con éxito!');

    // Redirigir según el tipo de usuario
    if (isAdmin) {
      window.location.href = 'administrador/index.html';
    } else {
      window.location.href = 'Usuario/index.html';
    }
  }*/
});
