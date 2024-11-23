let graficoTemperatura;
let graficoHumedad;

// Arrays para almacenar datos dinámicamente
let datosTemperatura = [];
let etiquetasTemperatura = [];

let datosHumedad = [];
let etiquetasHumedad = [];

// Inicializar gráficos con Chart.js
function inicializarGraficas() {
    // Gráfico de temperatura
    const ctxTemp = document.getElementById('graficoTemperatura').getContext('2d');
    graficoTemperatura = new Chart(ctxTemp, {
        type: 'line',
        data: {
            labels: etiquetasTemperatura,
            datasets: [{
                label: 'Temperatura (°C)',
                data: datosTemperatura,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Tiempo' },
                ticks: {display: false }  },
                y: { title: { display: true, text: 'Temperatura (°C)' } }
            }
        }
    });

    // Gráfico de humedad
    const ctxHum = document.getElementById('graficoHumedad').getContext('2d');
    graficoHumedad = new Chart(ctxHum, {
        type: 'line',
        data: {
            labels: etiquetasHumedad,
            datasets: [{
                label: 'Humedad (%)',
                data: datosHumedad,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Tiempo' },
                ticks: {display: false }  },
                y: { title: { display: true, text: 'Humedad (%)' } }
            }
        }
    });
}

// Actualizar gráficos con datos históricos
function actualizarGraficos() {
    fetch('/obtener_historico')
        .then(response => response.json())
        .then(data => {
            const temperaturas = data.temperaturas.map(d => d.valor);
            const humedades = data.humedades.map(d => d.valor);

            // Crear un array de índices para las etiquetas
            const indicesTemp = Array.from({ length: temperaturas.length }, (_, i) => i + 1);
            const indicesHum = Array.from({ length: humedades.length }, (_, i) => i + 1);

            // Actualizar datos del gráfico de temperatura
            graficoTemperatura.data.labels = indicesTemp; // Usar índices en lugar de timestamps
            graficoTemperatura.data.datasets[0].data = temperaturas;
            graficoTemperatura.update();

            // Actualizar datos del gráfico de humedad
            graficoHumedad.data.labels = indicesHum; // Usar índices en lugar de timestamps
            graficoHumedad.data.datasets[0].data = humedades;
            graficoHumedad.update();
        })
        .catch(error => console.error("Error al actualizar gráficos:", error));
}

// Cambiar el estado del relé
function cambiarEstadoRele(nuevoEstado) {
    fetch('/cambiar_estado_rele', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: nuevoEstado })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error("Error al cambiar el estado del relé:", error);
        });
}

// Función para encender el humidificador
function encenderHumidificador() {
    alert("Función para encender humidificador no implementada.");
}

// Actualizar datos en tiempo real
function actualizarDatos() {
    fetch('/obtener_datos')
        .then(response => response.json())
        .then(data => {
            // Actualizar datos de temperatura
            if (data.temperature !== null && data.timestamp_temp !== null) {
                datosTemperatura.push(data.temperature);
                etiquetasTemperatura.push(data.timestamp_temp);

                if (datosTemperatura.length > 50) {
                    datosTemperatura.shift();
                    etiquetasTemperatura.shift();
                }
                graficoTemperatura.update();
            }

            // Actualizar datos de humedad
            if (data.humidity !== null && data.timestamp_hum !== null) {
                datosHumedad.push(data.humidity);
                etiquetasHumedad.push(data.timestamp_hum);

                if (datosHumedad.length > 50) {
                    datosHumedad.shift();
                    etiquetasHumedad.shift();
                }
                graficoHumedad.update();
            }

            // Actualizar texto en la página
            document.getElementById('temperatura').innerText = data.temperature !== null ? data.temperature + '°C' : 'No disponible';
            document.getElementById('timestamp_temp').innerText = data.timestamp_temp !== null ? 'Timestamp: ' + data.timestamp_temp : 'No disponible';
            document.getElementById('humedad').innerText = data.humidity !== null ? data.humidity + '%' : 'No disponible';
            document.getElementById('timestamp_hum').innerText = data.timestamp_hum !== null ? 'Timestamp: ' + data.timestamp_hum : 'No disponible';
        })
        .catch(error => console.error("Error al obtener datos:", error));
}

// Inicializar gráficos al cargar la página
inicializarGraficas();

// Actualizar gráficos cada 5 segundos con datos históricos
setInterval(actualizarGraficos, 5000);

// Actualizar datos en tiempo real cada 5 segundos
setInterval(actualizarDatos, 5000);

// Llamar a las funciones iniciales al cargar la página
actualizarGraficos();
actualizarDatos();
