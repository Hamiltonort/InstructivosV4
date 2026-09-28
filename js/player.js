document.addEventListener('DOMContentLoaded', () => {
    // 1. Capturar la máquina seleccionada desde la URL (trefiladora, cableadora o extrusora)
    const urlParams = new URLSearchParams(window.location.search);
    const maquina = urlParams.get('maquina') || 'trefiladora';

    const tituloElement = document.getElementById('tituloMaquina');
    const videoSource = document.getElementById('videoSource');
    const videoElement = document.getElementById('videoInstructivo');
    const btnInteractivo = document.getElementById('btnInteractivo');

    // Configuración de rutas y nombres de cada estación (REQ014, REQ015)
    const datosEstaciones = {
        trefiladora: {
            nombre: "Capacitación: Máquina Trefiladora",
            video: "assets/videos/trefiladora.mp4"
        },
        cableadora: {
            nombre: "Capacitación: Máquina Cableadora",
            video: "assets/videos/cableadora.mp4"
        },
        extrusora: {
            nombre: "Capacitación: Máquina Extrusora",
            video: "assets/videos/extrusora.mp4"
        }
    };

    const configuracion = datosEstaciones[maquina] || datosEstaciones.trefiladora;

    // 2. Cargar el título y la fuente del video local
    if (tituloElement) tituloElement.innerText = configuracion.nombre;
    if (videoSource) videoSource.src = configuracion.video;
    if (videoElement) videoElement.load();

    // 3. Control de marcas de tiempo para elementos interactivos superpuestos (REQ004, REQ007)
    if (videoElement && btnInteractivo) {
        videoElement.addEventListener('timeupdate', () => {
            const tiempoActual = videoElement.currentTime;

            // Muestra el botón flotante entre el segundo 5 y el 12 del video
            if (tiempoActual >= 5 && tiempoActual <= 12) {
                btnInteractivo.style.display = 'block';
            } else {
                btnInteractivo.style.display = 'none';
            }
        });
    }

    // 4. Registrar en almacenamiento local que este módulo fue consultado (REQ011)
    guardarProgresoLocal(maquina);
});

// Función ejecutada al hacer clic en el botón flotante (REQ008)
function mostrarAyuda() {
    const videoElement = document.getElementById('videoInstructivo');
    if (videoElement) videoElement.pause();

    alert("⚠️ TIP DE SEGURIDAD OPERATIVA:\n\nVerifique la alineación de las guías y asegúrese de contar con los EPP obligatorios antes de continuar la marcha.");

    if (videoElement) videoElement.play();
}

// Guardar historial de consulta en el navegador/sistema local
function guardarProgresoLocal(modulo) {
    let consultados = JSON.parse(localStorage.getItem('modulosConsultados')) || [];
    if (!consultados.includes(modulo)) {
        consultados.push(modulo);
        localStorage.setItem('modulosConsultados', JSON.stringify(consultados));
    }
}