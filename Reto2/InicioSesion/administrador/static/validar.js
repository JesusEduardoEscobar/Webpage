    let graficoTemperatura;
    let graficoTemperaturaSuelo;
    let graficoHumedad;
    let graficoHumedadSuelo;
    let graficoIntensidadLuz;
    let graficoPH;

    // Inicializar gráficos con Chart.js
    function inicializarGraficas() {
        const ctxTemp = document.getElementById('graficoTemperatura').getContext('2d');
        graficoTemperatura = new Chart(ctxTemp, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Temperatura Aire (°C)',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Tiempo' } },
                    y: { title: { display: true, text: 'Temperatura (°C)' } }
                }
            }
        });

        // Gráfico de temperatura del suelo
        const ctxTempSuelo = document.getElementById('graficoTemperaturaSuelo').getContext('2d');
        graficoTemperaturaSuelo = new Chart(ctxTempSuelo, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Temperatura Suelo (°C)',
                    data: [],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x:{ title:{display:true,text:'Tiempo'}},
                    y:{ title:{display:true,text:'Temperatura (°C)'}}
                }
            }
        });

        // Gráfico de humedad del aire
        const ctxHum = document.getElementById('graficoHumedad').getContext('2d');
        graficoHumedad = new Chart(ctxHum, {
            type:'line',
            data:{
            labels : [],
            datasets:[{
                label:'Humedad Aire (%)',
                data : [],
                borderColor : "rgba(75,192,192,1)",
                backgroundColor : "rgba(75,192,192,0.2)",
                borderWidth : 1 
            }]
        },
        options:{
            responsive:true,
            scales:{
                x:{ title:{display:true,text:'Tiempo'}},
                y:{ title:{display:true,text:'Humedad (%)'}}
            }
        }
    });

    // Gráfico de humedad del suelo
    const ctxHumSuelo = document.getElementById('graficoHumedadSuelo').getContext('2d');
    graficoHumedadSuelo = new Chart(ctxHumSuelo,{
        type:'line',
        data:{
            labels : [],
            datasets:[{
                label:'Humedad Suelo (%)',
                data : [],
                borderColor : "rgba(153,102,255,1)",
                backgroundColor : "rgba(153,102,255,0.2)",
                borderWidth : 1 
            }]
        },
        options:{
            responsive:true,
            scales:{
                x:{ title:{display:true,text:'Tiempo'}},
                y:{ title:{display:true,text:'Humedad (%)'}}
            }
        }
    });

    // Gráfico de intensidad de luz
    const ctxIntensidad = document.getElementById('graficoIntensidadLuz').getContext('2d');
    graficoIntensidadLuz = new Chart(ctxIntensidad,{
        type:'line',
        data:{
            labels : [],
            datasets:[{
                label:'Intensidad Luz (Lux)',
                data : [],
                borderColor : "rgba(255 ,205 ,86 ,1)",
                backgroundColor : "rgba(255 ,205 ,86 ,0.2)",
                borderWidth : 1 
            }]
        },
        options:{
            responsive:true,
            scales:{
                x:{ title:{display:true,text:'Tiempo'}},
                y:{ title:{display:true,text:'Intensidad (Lux)'}}
            }
        }
    });

    // Gráfico de pH del suelo
    const ctxPH = document.getElementById('graficoPH').getContext('2d');
    graficoPH = new Chart(ctxPH,{
        type:'line',
        data:{
            labels : [],
            datasets:[{
                label:'pH Suelo',
                data : [],
                borderColor : "rgba(255 ,99 ,132 ,1)",
                backgroundColor : "rgba(255 ,99 ,132 ,0.2)",
                borderWidth : 1 
            }]
        },
        options:{
            responsive:true,
            scales:{
                x:{ title:{display:true,text:'Tiempo'}},
                y:{ title:{display:true,text:'pH'}}
            }
        }
    });
    }

    // Actualizar gráficos con datos históricos
    function actualizarGraficos() {
        fetch('/obtener_datos')
            .then(response => response.json())
            .then(data => {
                const MAX_DATA_POINTS = 50; // Número máximo de puntos en la gráfica

                // Función para limitar los datos en las gráficas
                function limitarDatos(grafico) {
                    if (grafico.data.labels.length > MAX_DATA_POINTS) {
                        grafico.data.labels.shift(); // Elimina la primera etiqueta
                        grafico.data.datasets[0].data.shift(); // Elimina el primer dato
                    }
                }

                // Actualizar gráfico de temperatura del aire
                if (data.temperaturaAire !== null) {
                    const nowTempAire = new Date().toLocaleTimeString();
                    graficoTemperatura.data.labels.push(nowTempAire);
                    graficoTemperatura.data.datasets[0].data.push(data.temperaturaAire);
                    limitarDatos(graficoTemperatura); // Limitar datos a 50
                    graficoTemperatura.update();
                    
                    document.getElementById('temperatura').innerText = data.temperaturaAire + '°C';
                    document.getElementById('timestamp_temp').innerText = 'Timestamp: ' + nowTempAire;
                }

                // Actualizar gráfico de temperatura del suelo
                if (data.temperaturaSuelo !== null) {
                    const nowTempSuelo = new Date().toLocaleTimeString();
                    graficoTemperaturaSuelo.data.labels.push(nowTempSuelo);
                    graficoTemperaturaSuelo.data.datasets[0].data.push(data.temperaturaSuelo);
                    limitarDatos(graficoTemperaturaSuelo); // Limitar datos a 50
                    graficoTemperaturaSuelo.update();
                    
                    document.getElementById('temperatura_suelo').innerText = data.temperaturaSuelo + '°C';
                    document.getElementById('timestamp_temp_suelo').innerText = 'Timestamp: ' + nowTempSuelo;
                }

                // Actualizar gráfico de humedad del aire
                if (data.humedadAire !== null) {
                    const nowHumAire = new Date().toLocaleTimeString();
                    graficoHumedad.data.labels.push(nowHumAire);
                    graficoHumedad.data.datasets[0].data.push(data.humedadAire);
                    limitarDatos(graficoHumedad); // Limitar datos a 50
                    graficoHumedad.update();
                    
                    document.getElementById('humedad').innerText = data.humedadAire + '%';
                    document.getElementById('timestamp_hum').innerText = 'Timestamp: ' + nowHumAire;
                }

                // Actualizar gráfico de humedad del suelo
                if (data.humedadSuelo !== null) {
                    const nowHumSuelo = new Date().toLocaleTimeString();
                    graficoHumedadSuelo.data.labels.push(nowHumSuelo);
                    graficoHumedadSuelo.data.datasets[0].data.push(data.humedadSuelo);
                    limitarDatos(graficoHumedadSuelo); // Limitar datos a 50
                    graficoHumedadSuelo.update();
                    
                    document.getElementById('humedad_suelo').innerText = data.humedadSuelo + '%';
                    document.getElementById('timestamp_hum_suelo').innerText = 'Timestamp: ' + nowHumSuelo;
                }

                // Actualizar gráfico de pH del suelo
                if (data.ph_suelo !== null) {
                    const nowPHSuelo = new Date().toLocaleTimeString();
                    graficoPH.data.labels.push(nowPHSuelo);
                    graficoPH.data.datasets[0].data.push(data.ph_suelo);
                    limitarDatos(graficoPH); // Limitar datos a 50
                    graficoPH.update();
                    
                    document.getElementById('phSuelo').innerText = data.ph_suelo;
                    document.getElementById('timestamp_ph').innerText = 'Timestamp: ' + nowPHSuelo;
                }

                // Actualizar gráfico de intensidad de luz
                if (data.intensidad_luz !== null) {
                    const nowIntensidadLuz = new Date().toLocaleTimeString();
                    graficoIntensidadLuz.data.labels.push(nowIntensidadLuz);
                    graficoIntensidadLuz.data.datasets[0].data.push(data.intensidad_luz);
                    limitarDatos(graficoIntensidadLuz); // Limitar datos a 50
                    graficoIntensidadLuz.update();
                    
                    document.getElementById('intensidad_luz').innerText = data.intensidad_luz + ' Lux';
                    document.getElementById('timestamp_intensidad').innerText = 'Timestamp: ' + nowIntensidadLuz;
                }
            })
            .catch(error => console.error("Error al obtener datos:", error));
    }

    // Cambiar el estado del relé
    function cambiarEstadoRele1(nuevoEstado) {
        fetch('/cambiar_estado_rele1', {
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

    function cambiarEstadoRele2(nuevoEstado){
        fetch('/cambiar_estado_rele2', {
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

    function cambiarEstadoRele3(nuevoEstado){
        fetch('/cambiar_estado_rele3', {
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

    function cambiarEstadoReleRiego(nuevoEstado){
        fetch('/cambiar_estado_riego', {
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

    async function obtenerDatos() {
        try {
            const response = await fetch('/obtener_datos'); // Ruta del servidor Flask
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            
            const data = await response.json();
            console.log(data); // Verifica que los datos se están recibiendo
    
            // Actualizar el contenido de la página con los nuevos datos
            document.getElementById('gdd').innerText = data.gdd || "No disponible";
            document.getElementById('gdd_dias').innerText = data.gdd_dias || "No disponible";
            document.getElementById('dias').innerText = data.dias || "No disponible";
            
        } catch (error) {
            console.error('Error:', error);
        }   
    }
    

    // Inicializar gráficos al cargar la página
    inicializarGraficas();

    // Actualizar gráficos cada 2 segundos con datos históricos
    setInterval(actualizarGraficos ,5000); // Cambiado a cada segundos

    // Llamar a las funciones iniciales al cargar la página
    actualizarGraficos();