function cambiarEstadoLED() {
    fetch('/modificar_led', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Muestra un mensaje de éxito o error
    })
    .catch(error => console.error('Error:', error));
}