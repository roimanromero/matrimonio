// 1. Manejo del Audio y el Overlay
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("audio-overlay");
    const startBtn = document.getElementById("start-btn");
    const bgMusic = document.getElementById("bg-music");

    // Los navegadores bloquean el autoplay, por lo que requerimos que el usuario haga clic para entrar
    startBtn.addEventListener("click", () => {
        // Reproducir música
        bgMusic.play().then(() => {
            console.log("Música iniciada");
        }).catch(err => {
            console.log("El autoplay del audio fue bloqueado o no se encontró el archivo:", err);
        });

        // Ocultar la pantalla de inicio con transición
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500); // 500ms debe coincidir con la transición en CSS
    });

    // 2. Lógica de la Cuenta Regresiva (Countdown)
    // Fecha de la boda: 6 de Noviembre de 2026 a las 19:00 (7:00 PM)
    const weddingDate = new Date("November 6, 2026 19:00:00").getTime();
    const countdownElement = document.getElementById("countdown");

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            countdownElement.innerHTML = "<h3 class='cormorant-text highlight'>¡Hoy es el gran día!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span>${days}</span>
                <small>Días</small>
            </div>
            <div class="countdown-item">
                <span>${hours}</span>
                <small>Hrs</small>
            </div>
            <div class="countdown-item">
                <span>${minutes}</span>
                <small>Min</small>
            </div>
            <div class="countdown-item">
                <span>${seconds}</span>
                <small>Seg</small>
            </div>
        `;
    }, 1000);

    // 3. Manejo simple del formulario RSVP para demostración (Evita recargar la página si no hay Action configurado)
    const form = document.getElementById("rsvp-form");
    form.addEventListener("submit", (e) => {
        // Si el formulario no está conectado a Formspree, prevenimos el envío real y mostramos alerta.
        if(form.getAttribute('action') === '#') {
            e.preventDefault();
            alert("¡Gracias por confirmar!\n(Nota para desarrollo: Conecta el atributo 'action' del formulario en el HTML a Formspree o un servicio similar para recibir los datos en tu correo).");
        }
    });
});
// 4. Animación al hacer scroll para las tarjetas de Nuestra Historia
    const cards = document.querySelectorAll('.fade-in-right');

    const observerOptions = {
        root: null,
        threshold: 0.2, // La animación se activa cuando el 20% de la tarjeta es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const storyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Si quieres que la animación vuelva a repetirse al subir/bajar, quita la siguiente línea:
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        storyObserver.observe(card);
    });