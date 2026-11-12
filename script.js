/**
 * ==========================================================================
 * Dulzura para tu Navidad - Mousses Navideños Artesanales
 * Archivo de JavaScript (script.js)
 * ==========================================================================
 */

// 1. Configuración de Tailwind CSS con paleta y tipografías personalizadas
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    navidad: {
                        rojo: '#B22222',
                        rojoVivo: '#D32F2F',
                        rojoOscuro: '#7A0C0C',
                        verde: '#1B5E20',
                        verdeClaro: '#2E7D32',
                        verdeOscuro: '#0D3311',
                        amarillo: '#FBC02D',
                        dorado: '#D4AF37',
                        doradoClaro: '#FFF1A8',
                        crema: '#FFFDF7'
                    }
                },
                fontFamily: {
                    script: ['"Great Vibes"', 'cursive'],
                    display: ['"Cinzel Decorative"', 'serif'],
                    sans: ['"Montserrat"', 'sans-serif']
                }
            }
        }
    };
}

// 2. Función global para pedir un producto específico por WhatsApp (Número: 968994343)
function pedirWhatsApp(nombreProducto, precio) {
    const telefono = '51968994343';
    const mensaje = `¡Hola *Dulzura para tu Navidad*! 🎄✨\n\nMe gustaría pedir:\n🍮 *Producto:* ${nombreProducto}\n💰 *Precio:* ${precio}\n\n¿Me confirman disponibilidad y horario de entrega? ¡Muchas gracias! 🎅`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Asegurar disponibilidad global para las llamadas en onclick del HTML
window.pedirWhatsApp = pedirWhatsApp;

// 3. Inicialización de componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    // --- A. Menú Móvil Responsivo ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Cerrar menú móvil al hacer clic en un enlace de navegación
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- B. Formulario de Pedido Personalizado hacia WhatsApp ---
    const orderForm = document.getElementById('whatsapp-order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('client-name')?.value.trim() || '';
            const producto = document.getElementById('mousse-choice')?.value || '';
            const cantidad = document.getElementById('order-qty')?.value || '';
            const fecha = document.getElementById('order-date')?.value || '';
            const notas = document.getElementById('order-notes')?.value.trim() || '';

            let mensaje = `¡Hola *Dulzura para tu Navidad*! 🎄🎅\n\nQuiero realizar el siguiente pedido:\n👤 *Nombre:* ${nombre}\n🍮 *Pedido:* ${producto}\n🔢 *Cantidad:* ${cantidad}\n`;
            if (fecha) mensaje += `📅 *Fecha deseada:* ${fecha}\n`;
            if (notas) mensaje += `📝 *Notas / Dedicatoria:* ${notas}\n`;
            mensaje += `\n¡Quedo atento(a) para coordinar! ✨`;

            const url = `https://wa.me/51968994343?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }

    // --- C. Previsualizador de Fotos Propias del Emprendimiento ---
    const photoInput = document.getElementById('custom-photos-input');
    const resetBtn = document.getElementById('reset-photos-btn');
    const feedbackBox = document.getElementById('photo-upload-feedback');
    const heroImg = document.getElementById('hero-img');
    const replaceableImages = document.querySelectorAll('.replaceable-photo');

    if (photoInput && resetBtn && feedbackBox && heroImg) {
        // Guardar URLs originales para poder restaurarlas
        const originalHeroSrc = heroImg.src;
        const originalSources = Array.from(replaceableImages).map(img => img.src);

        photoInput.addEventListener('change', function(event) {
            const files = Array.from(event.target.files);
            if (!files.length) return;

            const objectUrls = files.map(file => URL.createObjectURL(file));

            // Reemplazar foto principal con la primera foto subida
            heroImg.src = objectUrls[0];

            // Distribuir las fotos subidas en las tarjetas de catálogo y galería
            replaceableImages.forEach((img, index) => {
                const fotoElegida = objectUrls[index % objectUrls.length];
                img.src = fotoElegida;
            });

            resetBtn.classList.remove('hidden');
            feedbackBox.classList.remove('hidden');
            feedbackBox.textContent = `✨ ¡Listo! Se han aplicado ${files.length} foto(s) tuya(s) en la portada, catálogo y galería.`;
        });

        resetBtn.addEventListener('click', function() {
            heroImg.src = originalHeroSrc;
            replaceableImages.forEach((img, index) => {
                img.src = originalSources[index];
            });
            photoInput.value = '';
            resetBtn.classList.add('hidden');
            feedbackBox.classList.add('hidden');
        });
    }

    // --- D. Efecto de Copos de Nieve Animados en Canvas ---
    initSnowEffect();
});

// 4. Función del Efecto de Nieve Cayendo en Canvas
function initSnowEffect() {
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const numFlakes = Math.min(65, Math.floor(width / 20));
    const flakes = [];

    for (let i = 0; i < numFlakes; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3.5 + 1.5,
            d: Math.random() * numFlakes,
            speedY: Math.random() * 1.1 + 0.4,
            isGold: Math.random() > 0.72 // Algunos copos son destellos dorados
        });
    }

    let angle = 0;

    function drawSnow() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < flakes.length; i++) {
            const f = flakes[i];
            ctx.beginPath();
            ctx.fillStyle = f.isGold ? 'rgba(255, 223, 100, 0.75)' : 'rgba(255, 255, 255, 0.8)';
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
            ctx.fill();
        }

        updateSnow();
        requestAnimationFrame(drawSnow);
    }

    function updateSnow() {
        angle += 0.008;
        for (let i = 0; i < flakes.length; i++) {
            const f = flakes[i];
            f.y += f.speedY;
            f.x += Math.sin(angle + f.d) * 0.6;

            if (f.y > height) {
                flakes[i] = {
                    x: Math.random() * width,
                    y: -10,
                    r: f.r,
                    d: f.d,
                    speedY: f.speedY,
                    isGold: f.isGold
                };
            }
        }
    }

    drawSnow();
}

