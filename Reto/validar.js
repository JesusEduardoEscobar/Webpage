// Selecciona los elementos del DOM
const userTypeSelect = document.getElementById('userType');
const userForm = document.getElementById('userForm');
const adminCodeField = document.getElementById('adminCodeField');

// Mostrar formulario y campo de código de administrador si es necesario
userTypeSelect.addEventListener('change', () => {
  const isSelected = userTypeSelect.value !== 'Seleccionar';
  userForm.style.display = isSelected ? 'block' : 'none';
  const isAdmin = userTypeSelect.value === 'Admin';
  adminCodeField.style.display = isAdmin ? 'block' : 'none'
});

// Manejar el envío del formulario
userForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita el envío real del formulario

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const adminCode = document.getElementById('adminCode').value;
  const isAdmin = userTypeSelect.value === 'Admin';

  console.log('Datos enviados:', {
    username,
    password,
    adminCode: isAdmin ? adminCode : 'N/A',
  });

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
});
