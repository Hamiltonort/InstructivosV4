document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const workerId = document.getElementById('workerId').value.trim();
    const workerName = document.getElementById('workerName').value.trim();
    const errorAlert = document.getElementById('errorAlert');

    if (workerId === "" || workerName.length < 3) {
        errorAlert.style.display = 'block';
        return;
    }

    // Guardamos la sesión localmente en el navegador
    localStorage.setItem('workerId', workerId);
    localStorage.setItem('workerName', workerName);

    // Redirigimos al menú principal de máquinas
    window.location.href = 'menu.html';
});