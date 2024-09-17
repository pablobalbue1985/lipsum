// Configuración básica de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('galaxyBackground').appendChild(renderer.domElement);

// Función para crear estrellas
function createStar() {
    const geometry = new THREE.SphereGeometry(0.1, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

// Crear múltiples estrellas
Array(200).fill().forEach(createStar);

// Configurar la posición de la cámara
camera.position.z = 5;

// Función para animar la escena
function animate() {
    requestAnimationFrame(animate);

    // Rotar la cámara para un efecto de movimiento
    camera.rotation.x += 0.0005;
    camera.rotation.y += 0.0005;

    renderer.render(scene, camera);
}
animate();

// Ajustar el tamaño del renderizador al redimensionar la ventana
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Función para mostrar solo el juego de Genially y ocultar el resto
function startChallenge() {
    document.querySelectorAll('header, footer, main > :not(#video)').forEach(element => {
        element.style.display = 'none';
    });
    document.querySelector('#video').style.display = 'block';

    // Hacer que el iframe ocupe toda la pantalla y ocultar el scroll
    document.querySelector('.video-container iframe').style.width = '100vw';
    document.querySelector('.video-container iframe').style.height = '100vh';
    document.body.style.overflow = 'hidden';
}

// Configuración del audio de fondo
const musicaFondo = () => {
    var audio = document.getElementById("audio-player2");
    var audioControlButton = document.getElementById("audio-control");
    
    // Configurar volumen
    audio.volume = 0.05;

    // Inicializa el botón con el estado actual del audio
    audioControlButton.textContent = audio.paused ? '▶️ Reproducir musica de fondo' : '⏸ Pausar musica de fondo';

    // Añadir control de reproducción/pausa
    audioControlButton.addEventListener("click", function() {
        if (audio.paused) {
            audio.play();
            audioControlButton.textContent = '⏸ Pausar musica de fondo';
        } else {
            audio.pause();
            audioControlButton.textContent = '▶️ Reproducir musica de fondo';
        }
    });
}
musicaFondo();

// Añadir el listener que se ejecutará solo una vez al hacer clic en la página
document.addEventListener('click', function() {
    var audio = document.getElementById("audio-player2");
    var audioControlButton = document.getElementById("audio-control");
    if (audio.paused) {
        audio.play();
        audioControlButton.textContent = '⏸ Pausar musica Estelar';
    } else {
        audio.pause();
        audioControlButton.textContent = '▶️ Reproducir musica Estelar';
    }
}, { once: true });

// Script relacionado con el control de audio principal
document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.querySelector('.play-pause');
    const audioContainer = document.querySelector('.audio-container');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');

    playPauseButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = '⏸'; // Cambiar al icono de pausa
            audioContainer.classList.add('playing'); // Añade la animación de reproducción
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = '⏵'; // Cambiar al icono de play
            audioContainer.classList.remove('playing'); // Quita la animación de reproducción
        }
    });

    audioPlayer.addEventListener('timeupdate', function() {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percentage + '%';
    });

    audioPlayer.addEventListener('ended', function() {
        playPauseButton.textContent = '⏵'; // Vuelve al icono de play al terminar
        audioContainer.classList.remove('playing'); // Quita la animación de reproducción
    });

    progressBar.addEventListener('click', function(e) {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / progressBar.offsetWidth) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    });
});


