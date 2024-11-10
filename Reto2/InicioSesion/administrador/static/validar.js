// Cambia el estado del relé al hacer clic en el botón
function cambiarEstadoRele(nuevoEstado) {
    fetch('/cambiar_estado_rele', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: nuevoEstado }) // Enviar el nuevo estado
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json(); // Convertir la respuesta a JSON
    })
    .then(data => {
        alert(data.message); // Muestra un mensaje con el estado del relé
    })
    .catch(error => {
        console.error("Error al cambiar el estado del relé:", error);
    });
}

// Función para encender el humidificador (implementación pendiente)
function encenderHumidificador() {
    // Implementar lógica para encender humidificador aquí.
    alert("Función para encender humidificador no implementada.");
}

// Función para actualizar temperatura y humedad
function actualizarDatos() {
    fetch('/obtener_datos')
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperatura').innerText = data.temperature !== null ? data.temperature + '°C' : 'No disponible';
            document.getElementById('timestamp_temp').innerText = data.timestamp_temp !== null ? 'Timestamp: ' + data.timestamp_temp : 'No disponible';
            document.getElementById('humedad').innerText = data.humidity !== null ? data.humidity + '%' : 'No disponible';
            document.getElementById('timestamp_hum').innerText = data.timestamp_hum !== null ? 'Timestamp: ' + data.timestamp_hum : 'No disponible';
        })
        .catch(error => console.error("Error al obtener datos:", error));
}

// Actualizar cada segundo
setInterval(actualizarDatos, 1000);

// Llamar a la función una vez al cargar la página
actualizarDatos();