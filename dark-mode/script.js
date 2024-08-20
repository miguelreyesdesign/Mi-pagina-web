const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Cambiar el texto del botón basado en el modo
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☾'; // Cambia el texto a 'Modo Claro' en modo oscuro
    } else {
        darkModeToggle.textContent = '☼'; // Cambia el texto a 'Dark Mode' en modo claro
    }
});
