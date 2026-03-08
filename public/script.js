// Variables globales
let isTransitioning = false;
let heartClickCount = 0;

console.log('Script cargado correctamente ✓');

// Función principal para iniciar la experiencia
function startMainExperience() {
    console.log('🎉 Iniciando experiencia de cumpleaños para Angela...');
    
    if (isTransitioning) {
        console.log('⚠️ Ya en transición');
        return;
    }
    
    isTransitioning = true;
    
    const initialScreen = document.getElementById('initial-screen');
    const mainScreen = document.getElementById('main-screen');
    
    if (!initialScreen || !mainScreen) {
        console.error('❌ Pantallas no encontradas');
        console.log('initialScreen:', initialScreen);
        console.log('mainScreen:', mainScreen);
        return;
    }
    
    console.log('✓ Pantallas encontradas, iniciando transición...');
    
    // Ocultar pantalla inicial
    initialScreen.style.transition = 'all 0.8s ease';
    initialScreen.style.transform = 'scale(0.8)';
    initialScreen.style.opacity = '0';
    
    // Mostrar pantalla principal
    setTimeout(() => {
        initialScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
        mainScreen.classList.add('active');
        
        console.log('✓ Transición completada');
        
        // Iniciar efectos
        startEffects();
    }, 800);
}

// Iniciar efectos de la pantalla principal
function startEffects() {
    console.log('Iniciando efectos médicos...');
    
    // Crear partículas flotantes
    setTimeout(() => createParticlesEffect(), 500);
    
    // Animar mensaje
    setTimeout(() => animateMessage(), 1000);
    
    // Agregar interactividad al corazón
    setTimeout(() => setupHeartInteraction(), 2000);
    
    // Mostrar pista de interacción
    setTimeout(() => showInteractionHint(), 8000);
}

// Crear efecto de partículas médicas
function createParticlesEffect() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    setInterval(() => {
        createSingleParticle();
    }, 400);
    
    // Crear algunas partículas iniciales
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createSingleParticle(), i * 150);
    }
}

// Crear una partícula individual
function createSingleParticle() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const icons = ['💙', '✨', '🎈', '🎉', '🌟', '💗'];
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = icons[Math.floor(Math.random() * icons.length)];
    
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '-50px';
    particle.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
    particle.style.opacity = Math.random() * 0.6 + 0.3;
    particle.style.animation = `particleFloat ${Math.random() * 2 + 3}s ease-out forwards`;
    particle.style.pointerEvents = 'none';
    
    container.appendChild(particle);
    
    // Remover después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 5000);
}

// Animar mensaje línea por línea
function animateMessage() {
    const messageLines = document.querySelectorAll('.message-line');
    
    messageLines.forEach((line, index) => {
        const delay = parseInt(line.getAttribute('data-delay') || index);
        setTimeout(() => {
            line.classList.add('show');
            
            // Efecto especial para la línea final
            if (line.classList.contains('final')) {
                setTimeout(() => {
                    createCelebrationEffect();
                }, 500);
            }
        }, delay * 1200);
    });
}

// Crear efecto de celebración
function createCelebrationEffect() {
    const emojis = ['🎉', '🎊', '✨', '🎂', '🎈'];
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '80%';
            emoji.style.fontSize = '2rem';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '1000';
            emoji.style.animation = 'loveFloat 3s ease-out forwards';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, 3000);
        }, i * 150);
    }
}

// Configurar interactividad del corazón
function setupHeartInteraction() {
    const heartIcon = document.querySelector('.heart-icon');
    if (!heartIcon) return;
    
    heartIcon.style.cursor = 'pointer';
    heartIcon.addEventListener('click', handleHeartClick);
    heartIcon.addEventListener('touchstart', handleHeartClick, { passive: true });
}

// Manejar clic en la foto
function handlePhotoClick() {
    console.log('Foto clickeada! 📸');
    
    const photo = document.querySelector('.angela-photo');
    if (!photo) return;
    
    // Efecto de brillo en la foto (escala reducida para evitar desbordamiento)
    photo.style.transform = 'scale(1.05)';
    photo.style.filter = 'brightness(1.15) saturate(1.2)';
    
    setTimeout(() => {
        photo.style.transform = '';
        photo.style.filter = 'brightness(1.05)';
    }, 500);
    
    // Crear efecto de corazones alrededor de la foto
    createPhotoHearts();
}

// Crear corazones alrededor de la foto
function createPhotoHearts() {
    const photo = document.querySelector('.photo-container');
    if (!photo) return;
    
    const rect = photo.getBoundingClientRect();
    const icons = ['💙', '💗', '✨', '🎈', '🎉'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = icons[Math.floor(Math.random() * icons.length)];
            heart.style.position = 'fixed';
            heart.style.left = rect.left + rect.width / 2 + 'px';
            heart.style.top = rect.top + rect.height / 2 + 'px';
            heart.style.fontSize = '1.5rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            // Dirección aleatoria
            const angle = (Math.PI * 2 * i) / 8;
            const distance = 80 + Math.random() * 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            heart.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(1.5)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            });
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1500);
        }, i * 80);
    }
}

// Manejar clic en el corazón
function handleHeartClick(event) {
    // Prevenir que el evento se dispare múltiples veces en touch
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    
    heartClickCount++;
    
    // Efecto visual en el corazón
    const heart = event.target;
    heart.style.transform = 'scale(1.3)';
    setTimeout(() => {
        heart.style.transform = '';
    }, 300);
    
    // Crear partículas de amor
    createLoveParticles(event);
    
    // Ocultar pista después del primer clic
    if (heartClickCount === 1) {
        hideInteractionHint();
    }
    
    // Mensajes especiales según número de clics
    if (heartClickCount === 5) {
        showSpecialMessage('Angela, guárdame cheesecake 🍰');
    } else if (heartClickCount === 10) {
        showSpecialMessage('¡Qué chevere conocerte! ✨');
    } else if (heartClickCount === 15) {
        showSpecialMessage('¡Que cumplas todos tus sueños! 🎉');
    }
}

// Crear partículas de amor al hacer clic
function createLoveParticles(event) {
    const icons = ['💙', '💗', '💖', '✨', '🎈', '🌟'];
    
    // Obtener la posición del objetivo
    const target = event.target || event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'love-particle';
            particle.textContent = icons[Math.floor(Math.random() * icons.length)];
            
            particle.style.position = 'fixed';
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            // Dirección aleatoria
            const angle = (Math.PI * 2 * i) / 6;
            const distance = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }, i * 50);
    }
}

// Mostrar pista de interacción
function showInteractionHint() {
    const hint = document.getElementById('interaction-hint');
    if (!hint) return;
    
    hint.style.display = 'block';
}

// Ocultar pista de interacción
function hideInteractionHint() {
    const hint = document.getElementById('interaction-hint');
    if (!hint) return;
    
    hint.classList.add('hidden');
    setTimeout(() => {
        hint.style.display = 'none';
    }, 500);
}

// Mostrar mensaje especial
function showSpecialMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'linear-gradient(135deg, #4A90E2, #2E5C8A)';
    message.style.color = 'white';
    message.style.padding = '1.5rem 2.5rem';
    message.style.borderRadius = '20px';
    message.style.fontSize = '1.5rem';
    message.style.fontFamily = "'Dancing Script', cursive";
    message.style.fontWeight = '700';
    message.style.zIndex = '10000';
    message.style.boxShadow = '0 10px 40px rgba(74, 144, 226, 0.5)';
    message.style.animation = 'messageAppear 0.5s ease-out';
    message.style.pointerEvents = 'none';
    message.style.textAlign = 'center';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'hintFadeOut 0.5s ease forwards';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 500);
    }, 2500);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('Tarjeta de cumpleaños lista para Angela 💙');
    
    // Asegurar que la pantalla inicial esté visible
    const initialScreen = document.getElementById('initial-screen');
    if (initialScreen) {
        initialScreen.classList.add('active');
    }
});
function startPetalRain() {
    // Crear pétalos continuamente
    setInterval(createPetal, 300);
    
    // Crear ráfaga inicial
    for (let i = 0; i < CONFIG.petalCount; i++) {
        setTimeout(() => createPetal(), i * 100);
    }
}

// Crear un pétalo individual
function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Posición aleatoria en el ancho de la pantalla
    const startX = Math.random() * window.innerWidth;
    petal.style.left = startX + 'px';
    
    // Duración aleatoria de caída
    const duration = Math.random() * 
        (CONFIG.petalFallDuration.max - CONFIG.petalFallDuration.min) + 
        CONFIG.petalFallDuration.min;
    
    petal.style.animationDuration = duration + 'ms';
    
    // Tamaño aleatorio
    const size = Math.random() * 6 + 8;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    // Color aleatorio de amarillos
    const yellowColors = ['#FFD700', '#FFFF99', '#FFA500', '#FFEB3B'];
    petal.style.background = yellowColors[Math.floor(Math.random() * yellowColors.length)];
    
    petalsContainer.appendChild(petal);
    
    // Remover el pétalo después de la animación
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, duration + 1000);
}

// Animar el mensaje línea por línea
function startMessageAnimation() {
    const messageLines = document.querySelectorAll('.message-line');
    
    messageLines.forEach((line, index) => {
        const delay = parseInt(line.getAttribute('data-delay')) || (index * 1500);
        
        setTimeout(() => {
            line.classList.add('show');
            
            // Efectos especiales para la línea final
            if (line.classList.contains('final-line')) {
                setTimeout(() => {
                    line.style.animation = 'heartbeat 0.8s ease-in-out 3';
                    
                    // Crear corazones flotantes para la línea final
                    createFloatingHearts();
                }, 500);
            }
        }, delay);
    });
    
    // Agregar animación heartbeat
    if (!document.querySelector('#heartbeat-animation')) {
        const style = document.createElement('style');
        style.id = 'heartbeat-animation';
        style.textContent = `
            @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.15); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Crear corazones flotantes para el mensaje final
function createFloatingHearts() {
    // Proteger el mensaje final
    const finalLine = document.querySelector('.final-line');
    if (finalLine) {
        finalLine.style.zIndex = '100';
        finalLine.style.position = 'relative';
        finalLine.style.background = 'rgba(255, 255, 255, 0.95)';
        finalLine.style.backdropFilter = 'blur(10px)';
        finalLine.style.border = '2px solid rgba(255, 215, 0, 0.5)';
        finalLine.style.borderRadius = '20px';
        finalLine.style.padding = '1rem 1.5rem';
        finalLine.style.margin = '1.5rem auto';
        finalLine.style.display = 'inline-block';
        finalLine.style.boxShadow = '0 8px 32px rgba(255, 215, 0, 0.3)';
    }
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💛';
            heart.style.position = 'fixed';
            heart.style.fontSize = '1.8rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '95';
            
            // Posición aleatoria cerca del mensaje, pero no encima
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight * 0.8 + Math.random() * 100;
            
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            
            heart.animate([
                { transform: 'translateY(0px) scale(0)', opacity: 0 },
                { transform: 'translateY(-60px) scale(1.2)', opacity: 1 },
                { transform: 'translateY(-150px) scale(0.5)', opacity: 0 }
            ], {
                duration: 4000,
                easing: 'ease-out'
            });
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }, i * 300);
    }
}

// Efectos de brillo en la ilustración
function startSparkleEffects() {
    setInterval(createSparkle, CONFIG.sparkleInterval);
}

function createSparkle() {
    for (let i = 0; i < CONFIG.sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Posición aleatoria alrededor de la ilustración
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            
            sparkle.style.left = `calc(50% + ${x}px)`;
            sparkle.style.top = `calc(50% + ${y}px)`;
            
            sparkleEffect.appendChild(sparkle);
            
            // Remover después de la animación
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 200);
    }
}

// Manejar interacciones táctiles
function handleTouchInteraction(event) {
    if (!messageAnimationComplete) return;
    
    event.preventDefault();
    
    // Obtener coordenadas del toque
    let x, y;
    if (event.type === 'touchstart') {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    
    // Crear efectos en el punto de toque
    createTouchRipple(x, y);
    createInteractiveFlowers(x, y);
    createBurstEffect(x, y);
    
    // Efecto especial si toca la ilustración
    if (isTouchOnIllustration(x, y)) {
        triggerBouquetGlow();
    }
}

// Crear efecto de ondas en el toque
function createTouchRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = (x - 50) + 'px';
    ripple.style.top = (y - 50) + 'px';
    
    touchArea.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1000);
}

// Crear flores interactivas en el punto de toque
function createInteractiveFlowers(x, y) {
    const flowerEmojis = ['🌼', '🌻', '🌸', '💐', '🌺'];
    const flowerCount = Math.random() * 4 + 3;
    
    for (let i = 0; i < flowerCount; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'interactive-flower';
            flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            
            // Posición con dispersión aleatoria
            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;
            
            flower.style.left = (x + offsetX) + 'px';
            flower.style.top = (y + offsetY) + 'px';
            
            touchArea.appendChild(flower);
            
            // Remover después de la animación
            setTimeout(() => {
                if (flower.parentNode) {
                    flower.parentNode.removeChild(flower);
                }
            }, CONFIG.interactiveFlowerDuration);
        }, i * 100);
    }
}

// Crear efecto de explosión de pétalos
function createBurstEffect(x, y) {
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.position = 'absolute';
        petal.style.left = x + 'px';
        petal.style.top = y + 'px';
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '15';
        
        // Dirección aleatoria para la explosión
        const angle = (i / 12) * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        // Animar hacia la posición final
        petal.style.animation = 'none';
        petal.animate([
            { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${endX - x}px, ${endY - y}px) scale(1) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        touchArea.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 1000);
    }
}

// Verificar si el toque es sobre la imagen de Evonny
function isTouchOnIllustration(x, y) {
    const image = document.querySelector('.evonny-image');
    const rect = image.getBoundingClientRect();
    
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// Efecto especial de brillo en la imagen de Evonny
function triggerBouquetGlow() {
    const image = document.querySelector('.evonny-image');
    
    // Agregar efectos especiales a la imagen
    image.style.filter = 'drop-shadow(0 20px 40px rgba(255, 215, 0, 0.8)) brightness(1.2) saturate(1.3)';
    image.style.transform = 'scale(1.1)';
    image.style.transition = 'all 0.5s ease';
    
    // Crear un pulso de luz alrededor de la imagen
    const glowEffect = document.createElement('div');
    glowEffect.style.position = 'absolute';
    glowEffect.style.top = '50%';
    glowEffect.style.left = '50%';
    glowEffect.style.transform = 'translate(-50%, -50%)';
    glowEffect.style.width = '120%';
    glowEffect.style.height = '120%';
    glowEffect.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)';
    glowEffect.style.borderRadius = '50%';
    glowEffect.style.pointerEvents = 'none';
    glowEffect.style.zIndex = '-1';
    glowEffect.style.animation = 'pulse 1s ease-out';
    
    const container = document.querySelector('.illustration-container');
    container.appendChild(glowEffect);
    
    // Restaurar el estado original
    setTimeout(() => {
        image.style.filter = '';
        image.style.transform = '';
        if (glowEffect.parentNode) {
            glowEffect.parentNode.removeChild(glowEffect);
        }
    }, 1500);
    
    // Crear estrellas especiales alrededor de Evonny
    createEvonnyStars();
    
    // Crear pétalos especiales
    createBouquetPetals();
    
    // Agregar animación pulse si no existe
    if (!document.querySelector('#pulse-glow-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-glow-animation';
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Crear estrellas especiales alrededor de Evonny
function createEvonnyStars() {
    const image = document.querySelector('.evonny-image');
    const rect = image.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.textContent = '✨';
        star.style.position = 'absolute';
        star.style.fontSize = '1.5rem';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '20';
        
        // Posición alrededor de la imagen
        const angle = (i / 15) * Math.PI * 2;
        const radius = 80 + Math.random() * 40;
        const x = rect.left + rect.width / 2 + Math.cos(angle) * radius;
        const y = rect.top + rect.height / 2 + Math.sin(angle) * radius;
        
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        
        star.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'scale(1.3) rotate(180deg)', opacity: 1 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 2500,
            easing: 'ease-in-out',
            delay: i * 100
        });
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 2500 + i * 100);
    }
}

// Crear pétalos especiales que brotan de las flores en la imagen
function createBouquetPetals() {
    const image = document.querySelector('.evonny-image');
    const rect = image.getBoundingClientRect();
    
    // Posición aproximada de las flores en la imagen (área inferior central)
    const flowerAreaX = rect.left + rect.width * 0.5;
    const flowerAreaY = rect.top + rect.height * 0.75;
    
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        const flowers = ['🌼', '🌻', '🌸', '🌺'];
        petal.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        petal.style.position = 'absolute';
        petal.style.fontSize = '1.3rem';
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '15';
        
        // Posición inicial en el área de las flores
        const startX = flowerAreaX + (Math.random() - 0.5) * 50;
        const startY = flowerAreaY + (Math.random() - 0.5) * 30;
        
        petal.style.left = startX + 'px';
        petal.style.top = startY + 'px';
        
        // Dirección aleatoria hacia arriba y afuera
        const angle = (Math.random() - 0.5) * Math.PI + Math.PI;
        const distance = Math.random() * 120 + 80;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        petal.animate([
            { 
                transform: 'translate(0, 0) scale(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1.2) rotate(360deg)`, 
                opacity: 0.9 
            },
            { 
                transform: `translate(${endX - startX}px, ${endY - startY + 50}px) scale(0.3) rotate(720deg)`, 
                opacity: 0 
            }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: i * 150
        });
        
        document.body.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 3000 + i * 150);
    }
}

// Mostrar pista visual para interactuar
function showTouchHint() {
    const hint = document.createElement('div');
    hint.innerHTML = '✨ Toca a Evo para más magia ✨';
    hint.style.position = 'fixed';
    hint.style.bottom = '20px';
    hint.style.left = '50%';
    hint.style.transform = 'translateX(-50%)';
    hint.style.background = 'rgba(255, 215, 0, 0.9)';
    hint.style.padding = '12px 24px';
    hint.style.borderRadius = '25px';
    hint.style.fontSize = '1rem';
    hint.style.fontFamily = 'Poppins, sans-serif';
    hint.style.color = '#333';
    hint.style.zIndex = '50';
    hint.style.animation = 'pulse 2s ease-in-out infinite';
    hint.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
    hint.style.fontWeight = '500';
    
    document.body.appendChild(hint);
    
    // Remover la pista después de unos segundos
    setTimeout(() => {
        hint.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 1000);
    }, 6000);
    
    // Agregar animación fadeOut si no existe
    if (!document.querySelector('#fadeout-animation')) {
        const style = document.createElement('style');
        style.id = 'fadeout-animation';
        style.textContent = `
            @keyframes fadeOut {
                to { opacity: 0; transform: translateX(-50%) translateY(20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Optimizaciones para rendimiento móvil
function optimizeForMobile() {
    // Limitar el número de elementos animados
    setInterval(() => {
        const petals = document.querySelectorAll('.petal');
        if (petals.length > 30) {
            for (let i = 0; i < 10; i++) {
                if (petals[i] && petals[i].parentNode) {
                    petals[i].parentNode.removeChild(petals[i]);
                }
            }
        }
    }, 5000);
}

// Inicializar optimizaciones
optimizeForMobile();