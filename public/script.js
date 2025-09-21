// Variables globales
let isTransitioning = false;

// Función principal para iniciar la experiencia
function startMainExperience() {
    console.log('Botón presionado!');
    
    if (isTransitioning) {
        console.log('Ya en transición');
        return;
    }
    
    isTransitioning = true;
    
    const initialScreen = document.getElementById('initial-screen');
    const mainScreen = document.getElementById('main-screen');
    
    if (!initialScreen || !mainScreen) {
        console.error('Pantallas no encontradas');
        return;
    }
    
    console.log('Iniciando transición...');
    
    // Ocultar pantalla inicial
    initialScreen.style.transition = 'all 0.8s ease';
    initialScreen.style.transform = 'scale(0.8)';
    initialScreen.style.opacity = '0';
    
    // Mostrar pantalla principal después de un momento
    setTimeout(() => {
        initialScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
        mainScreen.classList.add('active');
        
        console.log('Transición completada');
        
        // Iniciar efectos después de la transición
        startEffects();
    }, 800);
}

// Función para iniciar los efectos de la pantalla principal
function startEffects() {
    console.log('Iniciando efectos...');
    
    // Iniciar lluvia de pétalos
    setTimeout(() => createPetalsEffect(), 500);
    
    // Iniciar animación del mensaje
    setTimeout(() => animateMessage(), 1000);
    
    // Mostrar pista de interactividad
    setTimeout(() => showInteractionHint(), 6000);
}

// Crear efecto de pétalos
function createPetalsEffect() {
    const petalsContainer = document.getElementById('petals-container');
    if (!petalsContainer) return;
    
    setInterval(() => {
        createSinglePetal();
    }, 300);
    
    // Crear algunos pétalos iniciales
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createSinglePetal(), i * 100);
    }
}

// Crear un pétalo individual
function createSinglePetal() {
    const petalsContainer = document.getElementById('petals-container');
    if (!petalsContainer) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = Math.random() > 0.5 ? '🌼' : '🌻';
    
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
    petal.style.fontSize = (Math.random() * 0.5 + 1) + 'rem';
    
    petalsContainer.appendChild(petal);
    
    // Remover después de la animación
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 7000);
}

// Animar el mensaje línea por línea
function animateMessage() {
    const messageLines = document.querySelectorAll('.message-line');
    
    messageLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            
            // Efecto especial para la línea final
            if (line.classList.contains('final-line')) {
                setTimeout(() => {
                    createHeartEffect();
                }, 500);
            }
        }, index * 1500);
    });
}

// Crear efecto de corazones
function createHeartEffect() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💛';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '80%';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100';
            heart.style.animation = 'heartFloat 3s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 200);
    }
}

// Mostrar pista de interactividad
function showInteractionHint() {
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
    hint.style.color = '#333';
    hint.style.zIndex = '1000';
    hint.style.animation = 'pulse 2s infinite';
    hint.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
    
    document.body.appendChild(hint);
    
    setTimeout(() => {
        if (hint.parentNode) {
            hint.style.animation = 'fadeOut 1s forwards';
            setTimeout(() => {
                if (hint.parentNode) {
                    hint.parentNode.removeChild(hint);
                }
            }, 1000);
        }
    }, 5000);
}

// Manejar interacción con la imagen
function handleImageClick() {
    const image = document.querySelector('.evonny-image');
    if (!image) return;
    
    // Efecto de brillo
    image.style.filter = 'brightness(1.3) saturate(1.5) drop-shadow(0 0 30px #FFD700)';
    image.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        image.style.filter = '';
        image.style.transform = '';
    }, 1000);
    
    // Crear flores mágicas
    createMagicFlowers();
}

// Crear flores mágicas al tocar
function createMagicFlowers() {
    const image = document.querySelector('.evonny-image');
    if (!image) return;
    
    const rect = image.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.textContent = ['🌼', '🌻', '🌸', '💐'][Math.floor(Math.random() * 4)];
            flower.style.position = 'fixed';
            flower.style.left = rect.left + rect.width/2 + 'px';
            flower.style.top = rect.top + rect.height/2 + 'px';
            flower.style.fontSize = '1.5rem';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '999';
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            const endX = rect.left + rect.width/2 + Math.cos(angle) * distance;
            const endY = rect.top + rect.height/2 + Math.sin(angle) * distance;
            
            flower.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${endX - (rect.left + rect.width/2)}px, ${endY - (rect.top + rect.height/2)}px) scale(1.5)`, opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out'
            });
            
            document.body.appendChild(flower);
            
            setTimeout(() => {
                if (flower.parentNode) {
                    flower.parentNode.removeChild(flower);
                }
            }, 2000);
        }, i * 100);
    }
}

// Inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento cargado');
    
    // Configurar evento de la imagen si existe
    setTimeout(() => {
        const image = document.querySelector('.evonny-image');
        if (image) {
            image.addEventListener('click', handleImageClick);
            image.addEventListener('touchstart', handleImageClick);
            image.style.cursor = 'pointer';
        }
    }, 1000);
});

// Hacer función global para el onclick del HTML
window.startMainExperience = startMainExperience;

// Secuencia principal de animaciones
function startMainSequence() {
    // Iniciar lluvia de pétalos
    setTimeout(() => startPetalRain(), 1000);
    
    // Iniciar animación del mensaje
    setTimeout(() => startMessageAnimation(), 1500);
    
    // Iniciar efectos de brillo
    setTimeout(() => startSparkleEffects(), 2000);
    
    // Habilitar interactividad después del mensaje
    setTimeout(() => {
        messageAnimationComplete = true;
        showTouchHint();
    }, 8000);
}

// Iniciar lluvia de pétalos
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