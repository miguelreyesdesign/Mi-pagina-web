// Configuración general
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const speed = 0.4; // Velocidad de la lluvia (más alto = más rápido)
const density = 1; // Densidad de la lluvia (0.1 es baja, 1 es alta)
const containers = ['container1', 'container2'];
const canvases = ['canvas1', 'canvas2'];

let isAnimating = true;
const animations = [];


// Función para inicializar la animación en un canvas específico
function initializeAnimation(containerId, canvasId) {
    const container = document.getElementById(containerId);
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    let columns, drops;

    // Ajustar el tamaño del canvas
    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        columns = canvas.width / fontSize;
        initializeDrops();
    }

    // Inicializar las gotas en posiciones aleatorias
    function initializeDrops() {
        drops = Array(Math.floor(columns * density)).fill(0).map(() => Math.random() * canvas.height / fontSize);
    }

    // Llamar a resizeCanvas cuando la ventana cambia de tamaño
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Inicializar el tamaño del canvas

    // Función para dibujar la lluvia
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i] += speed; // Ajusta la velocidad
        }
    }

    // Animar la lluvia
    function animate() {
        if (isAnimating) {
            draw();
            requestAnimationFrame(animate);
        }
    }

    return animate;
}

// Inicializar las animaciones
containers.forEach((containerId, index) => {
    animations.push(initializeAnimation(containerId, canvases[index]));
});

// Controlar la animación
function toggleAnimation() {
    isAnimating = !isAnimating;
    if (isAnimating) {
        document.getElementById('toggleButton').textContent = 'Detener animación';
        animations.forEach(animate => requestAnimationFrame(animate));
    } else {
        document.getElementById('toggleButton').textContent = 'Iniciar animación';
    }
}

// Iniciar la animación
document.getElementById('toggleButton').addEventListener('click', toggleAnimation);
toggleAnimation(); // Iniciar la animación al cargar la página
