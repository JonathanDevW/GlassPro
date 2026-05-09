// ========== REALIDAD AUMENTADA - LIMPIEZA DE LENTES V5 (EFECTO VISIBLE) ==========

document.addEventListener('DOMContentLoaded', () => {
    initAR();
});

async function initAR() {
    const container = document.getElementById('arContainer');
    const canvas = document.getElementById('arCanvas');
    
    if (!container || !canvas) {
        console.log('Elementos AR no encontrados');
        return;
    }
    
    if (typeof THREE === 'undefined') {
        await loadThreeJS();
    }
    
    initThreeJS(container, canvas);
}

function loadThreeJS() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function initThreeJS(container, canvas) {
    let scene, camera, renderer;
    let glassesGroup;
    let leftLens, rightLens;
    let leftLensMaterial, rightLensMaterial;
    let cleanProgress = 0;
    let particleSystem;
    let time = 0;
    let cleaningSpots = [];
    
    const CLEAN_INTENSITY = 0.08;
    
    // Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a192f);
    scene.fog = new THREE.FogExp2(0x0a192f, 0.008);
    
    // Cámara
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Luces
    const ambientLight = new THREE.AmbientLight(0x505070);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(0, 1, 3);
    scene.add(mainLight);
    
    const fillLight = new THREE.PointLight(0x6688aa, 0.5);
    fillLight.position.set(-1, 1, 2);
    scene.add(fillLight);
    
    const fillLightRight = new THREE.PointLight(0x88aacc, 0.4);
    fillLightRight.position.set(1, 0.5, 2);
    scene.add(fillLightRight);
    
    // Crear texturas y materiales
    createMaterials();
    
    // Crear modelo de gafas
    createGlasses();
    
    // Crear partículas
    createParticles();
    
    // Event listeners
    setupEventListeners(container);
    
    // Animación
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        if (glassesGroup) {
            glassesGroup.position.y = Math.sin(time * 1.5) * 0.003;
        }
        
        if (particleSystem) {
            particleSystem.rotation.y = time * 0.02;
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
    
    function createMaterials() {
        // Canvas para textura LIMPIA (cristal transparente)
        const cleanCanvas = document.createElement('canvas');
        cleanCanvas.width = 512;
        cleanCanvas.height = 512;
        const cleanCtx = cleanCanvas.getContext('2d');
        
        // Fondo transparente
        cleanCtx.fillStyle = 'rgba(200, 220, 245, 0.1)';
        cleanCtx.fillRect(0, 0, 512, 512);
        
        // Gradiente de cristal
        const gradient = cleanCtx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, 'rgba(180, 210, 250, 0.2)');
        gradient.addColorStop(0.5, 'rgba(150, 190, 230, 0.15)');
        gradient.addColorStop(1, 'rgba(130, 170, 210, 0.1)');
        cleanCtx.fillStyle = gradient;
        cleanCtx.fillRect(0, 0, 512, 512);
        
        // Reflejo brillante
        cleanCtx.beginPath();
        cleanCtx.ellipse(180, 180, 100, 80, 0, 0, Math.PI * 2);
        cleanCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        cleanCtx.fill();
        
        cleanCtx.beginPath();
        cleanCtx.ellipse(380, 380, 60, 50, 0, 0, Math.PI * 2);
        cleanCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        cleanCtx.fill();
        
        const cleanTexture = new THREE.CanvasTexture(cleanCanvas);
        
        // Canvas para textura SUCIA (empañada)
        const dirtyCanvas = document.createElement('canvas');
        dirtyCanvas.width = 512;
        dirtyCanvas.height = 512;
        const dirtyCtx = dirtyCanvas.getContext('2d');
        
        // Fondo grisáceo (empañado)
        dirtyCtx.fillStyle = 'rgba(180, 190, 200, 0.9)';
        dirtyCtx.fillRect(0, 0, 512, 512);
        
        // Manchas grandes de vaho
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const radius = 30 + Math.random() * 60;
            
            const grad = dirtyCtx.createRadialGradient(x, y, 0, x, y, radius);
            grad.addColorStop(0, `rgba(200, 210, 220, 0.8)`);
            grad.addColorStop(1, `rgba(170, 180, 190, 0.6)`);
            
            dirtyCtx.fillStyle = grad;
            dirtyCtx.beginPath();
            dirtyCtx.arc(x, y, radius, 0, Math.PI * 2);
            dirtyCtx.fill();
        }
        
        // Gotas de agua
        for (let i = 0; i < 150; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const radius = 5 + Math.random() * 12;
            
            dirtyCtx.fillStyle = `rgba(210, 225, 240, 0.7)`;
            dirtyCtx.beginPath();
            dirtyCtx.arc(x, y, radius, 0, Math.PI * 2);
            dirtyCtx.fill();
            
            // Brillo de la gota
            dirtyCtx.fillStyle = `rgba(255, 255, 255, 0.4)`;
            dirtyCtx.beginPath();
            dirtyCtx.arc(x - 2, y - 2, radius * 0.3, 0, Math.PI * 2);
            dirtyCtx.fill();
        }
        
        // Rayones
        dirtyCtx.strokeStyle = 'rgba(140, 150, 160, 0.5)';
        dirtyCtx.lineWidth = 3;
        for (let i = 0; i < 30; i++) {
            dirtyCtx.beginPath();
            dirtyCtx.moveTo(Math.random() * 512, Math.random() * 512);
            dirtyCtx.lineTo(Math.random() * 512, Math.random() * 512);
            dirtyCtx.stroke();
        }
        
        const dirtyTexture = new THREE.CanvasTexture(dirtyCanvas);
        
        // Materiales para los lentes
        leftLensMaterial = new THREE.MeshStandardMaterial({
            map: dirtyTexture.clone(),
            transparent: true,
            opacity: 0.92,
            roughness: 0.4,
            metalness: 0.05,
            side: THREE.DoubleSide
        });
        
        rightLensMaterial = new THREE.MeshStandardMaterial({
            map: dirtyTexture.clone(),
            transparent: true,
            opacity: 0.92,
            roughness: 0.4,
            metalness: 0.05,
            side: THREE.DoubleSide
        });
        
        // Guardar texturas para actualización
        leftLensMaterial.userData = { cleanTexture, dirtyTexture: dirtyTexture.clone(), currentTexture: 'dirty' };
        rightLensMaterial.userData = { cleanTexture, dirtyTexture: dirtyTexture.clone(), currentTexture: 'dirty' };
    }
    
    function createGlasses() {
        glassesGroup = new THREE.Group();
        
        // Marco acetato
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a2a3a,
            metalness: 0.15,
            roughness: 0.35
        });
        
        // Marco metálico
        const metalMaterial = new THREE.MeshStandardMaterial({
            color: 0xc8d8e8,
            metalness: 0.9,
            roughness: 0.15
        });
        
        // Material dorado
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xc8a84c,
            metalness: 0.85,
            roughness: 0.2
        });
        
        // === LENTES (planos) ===
        const lensGeometry = new THREE.PlaneGeometry(1.25, 0.95);
        
        leftLens = new THREE.Mesh(lensGeometry, leftLensMaterial);
        leftLens.position.set(-0.78, 0.05, 0.08);
        glassesGroup.add(leftLens);
        
        rightLens = new THREE.Mesh(lensGeometry, rightLensMaterial);
        rightLens.position.set(0.78, 0.05, 0.08);
        glassesGroup.add(rightLens);
        
        // === MARCO exterior ===
        const frameGeo = new THREE.BoxGeometry(1.35, 1.05, 0.1);
        
        const leftFrame = new THREE.Mesh(frameGeo, frameMaterial);
        leftFrame.position.set(-0.78, 0.05, 0.03);
        glassesGroup.add(leftFrame);
        
        const rightFrame = new THREE.Mesh(frameGeo, frameMaterial);
        rightFrame.position.set(0.78, 0.05, 0.03);
        glassesGroup.add(rightFrame);
        
        // Anillo metálico interior
        const innerRingGeo = new THREE.BoxGeometry(1.23, 0.93, 0.12);
        
        const leftRing = new THREE.Mesh(innerRingGeo, metalMaterial);
        leftRing.position.set(-0.78, 0.05, 0.1);
        glassesGroup.add(leftRing);
        
        const rightRing = new THREE.Mesh(innerRingGeo, metalMaterial);
        rightRing.position.set(0.78, 0.05, 0.1);
        glassesGroup.add(rightRing);
        
        // === PUENTE ===
        const bridgeGeo = new THREE.BoxGeometry(0.5, 0.16, 0.12);
        const bridge = new THREE.Mesh(bridgeGeo, metalMaterial);
        bridge.position.set(0, 0.14, 0.1);
        glassesGroup.add(bridge);
        
        const goldBridge = new THREE.BoxGeometry(0.38, 0.06, 0.07);
        const goldDetail = new THREE.Mesh(goldBridge, goldMaterial);
        goldDetail.position.set(0, 0.12, 0.15);
        glassesGroup.add(goldDetail);
        
        // === PATILLAS ===
        const armGeo = new THREE.BoxGeometry(1.15, 0.09, 0.1);
        
        const leftArm = new THREE.Mesh(armGeo, frameMaterial);
        leftArm.position.set(-1.4, 0.02, -0.4);
        leftArm.rotation.z = 0.2;
        leftArm.rotation.x = -0.1;
        glassesGroup.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeo, frameMaterial);
        rightArm.position.set(1.4, 0.02, -0.4);
        rightArm.rotation.z = -0.2;
        rightArm.rotation.x = -0.1;
        glassesGroup.add(rightArm);
        
        // Terminales
        const tipGeo = new THREE.SphereGeometry(0.09, 12, 12);
        const tipMaterial = new THREE.MeshStandardMaterial({ color: 0x2a3a4a });
        
        const leftTip = new THREE.Mesh(tipGeo, tipMaterial);
        leftTip.position.set(-1.9, -0.05, -0.65);
        glassesGroup.add(leftTip);
        
        const rightTip = new THREE.Mesh(tipGeo, tipMaterial);
        rightTip.position.set(1.9, -0.05, -0.65);
        glassesGroup.add(rightTip);
        
        // Soporte nasal
        const nosePadGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xaa8866, metalness: 0.3 });
        
        const leftNose = new THREE.Mesh(nosePadGeo, noseMaterial);
        leftNose.position.set(-0.38, -0.06, 0.22);
        leftNose.scale.set(0.6, 0.45, 0.45);
        glassesGroup.add(leftNose);
        
        const rightNose = new THREE.Mesh(nosePadGeo, noseMaterial);
        rightNose.position.set(0.38, -0.06, 0.22);
        rightNose.scale.set(0.6, 0.45, 0.45);
        glassesGroup.add(rightNose);
        
        scene.add(glassesGroup);
    }
    
    function createParticles() {
        const particleCount = 600;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 16;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x5bc0ff,
            size: 0.02,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        
        particleSystem = new THREE.Points(geometry, particleMaterial);
        scene.add(particleSystem);
    }
    
    // Función para actualizar la textura de limpieza (EFECTO VISIBLE)
    function updateLensCleanliness() {
        const mixFactor = cleanProgress / 100;
        
        // Actualizar lente izquierdo
        if (leftLensMaterial && leftLensMaterial.userData) {
            const { cleanTexture, dirtyTexture } = leftLensMaterial.userData;
            
            // Crear canvas combinado
            const combinedCanvas = document.createElement('canvas');
            combinedCanvas.width = 512;
            combinedCanvas.height = 512;
            const ctx = combinedCanvas.getContext('2d');
            
            // Dibujar textura sucia primero
            ctx.drawImage(dirtyTexture.image, 0, 0);
            
            // Dibujar textura limpia encima con opacidad progresiva
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = mixFactor;
            ctx.drawImage(cleanTexture.image, 0, 0);
            ctx.globalAlpha = 1;
            
            // Efecto adicional: más brillo cuando está más limpio
            if (mixFactor > 0.5) {
                const brightness = (mixFactor - 0.5) * 0.8;
                ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
                ctx.fillRect(0, 0, 512, 512);
            }
            
            const combinedTexture = new THREE.CanvasTexture(combinedCanvas);
            leftLensMaterial.map = combinedTexture;
            leftLensMaterial.roughness = 0.5 - mixFactor * 0.4;
            leftLensMaterial.opacity = 0.85 + mixFactor * 0.1;
            leftLensMaterial.needsUpdate = true;
        }
        
        // Actualizar lente derecho
        if (rightLensMaterial && rightLensMaterial.userData) {
            const { cleanTexture, dirtyTexture } = rightLensMaterial.userData;
            
            const combinedCanvas = document.createElement('canvas');
            combinedCanvas.width = 512;
            combinedCanvas.height = 512;
            const ctx = combinedCanvas.getContext('2d');
            
            ctx.drawImage(dirtyTexture.image, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = mixFactor;
            ctx.drawImage(cleanTexture.image, 0, 0);
            ctx.globalAlpha = 1;
            
            if (mixFactor > 0.5) {
                const brightness = (mixFactor - 0.5) * 0.8;
                ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
                ctx.fillRect(0, 0, 512, 512);
            }
            
            const combinedTexture = new THREE.CanvasTexture(combinedCanvas);
            rightLensMaterial.map = combinedTexture;
            rightLensMaterial.roughness = 0.5 - mixFactor * 0.4;
            rightLensMaterial.opacity = 0.85 + mixFactor * 0.1;
            rightLensMaterial.needsUpdate = true;
        }
        
        // Actualizar contador
        const percentSpan = document.getElementById('cleanPercent');
        if (percentSpan) {
            percentSpan.textContent = Math.floor(cleanProgress);
        }
    }
    
    function setupEventListeners(container) {
        // Función para limpiar en posición
        const cleanAtPosition = (x, y) => {
            if (cleanProgress >= 100) return;
            
            // Zonas de limpieza
            const leftZone = { x: -0.78, y: 0.05, radiusX: 0.7, radiusY: 0.55 };
            const rightZone = { x: 0.78, y: 0.05, radiusX: 0.7, radiusY: 0.55 };
            
            const isLeft = Math.abs(x - leftZone.x) < leftZone.radiusX && 
                          Math.abs(y - leftZone.y) < leftZone.radiusY;
            const isRight = Math.abs(x - rightZone.x) < rightZone.radiusX && 
                           Math.abs(y - rightZone.y) < rightZone.radiusY;
            
            if (isLeft || isRight) {
                // Incrementar progreso
                const increment = CLEAN_INTENSITY * (1 + (cleaningSpots.length * 0.01));
                cleanProgress = Math.min(100, cleanProgress + increment);
                
                // Agregar punto de limpieza para efecto visual
                cleaningSpots.push({ x, y, life: 20 });
                
                // Actualizar visualmente
                updateLensCleanliness();
                
                // Crear efecto de partículas
                createCleanParticle(x, y);
                
                if (cleanProgress >= 100) {
                    showCompleteMessage();
                }
            }
        };
        
        // Crear efecto visual de limpieza
        function createCleanParticle(x, y) {
            // Efecto visual en el punto de limpieza
            const containerRect = container.getBoundingClientRect();
            const screenX = ((x + 1.6) / 3.2) * containerRect.width + containerRect.left;
            const screenY = ((0.8 - y) / 2.2) * containerRect.height + containerRect.top;
            
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = screenX - 8 + 'px';
            particle.style.top = screenY - 8 + 'px';
            particle.style.width = '16px';
            particle.style.height = '16px';
            particle.style.background = 'radial-gradient(circle, rgba(91,192,255,0.8) 0%, rgba(91,192,255,0) 70%)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '20';
            particle.style.animation = 'particleFade 0.3s ease-out forwards';
            
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 300);
        }
        
        const showCompleteMessage = () => {
            const message = document.getElementById('arMessage');
            if (message) {
                message.classList.add('show');
                setTimeout(() => message.classList.remove('show'), 3000);
            }
        };
        
        // Convertir coordenadas
        const getWorldCoordinates = (clientX, clientY, rect) => {
            const x = ((clientX - rect.left) / rect.width) * 3.2 - 1.6;
            const y = -((clientY - rect.top) / rect.height) * 2.2 + 0.8;
            return { x, y };
        };
        
        // Mouse move
        let lastX = 0, lastY = 0;
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const { x, y } = getWorldCoordinates(e.clientX, e.clientY, rect);
            
            // Limpiar solo si el mouse se movió significativamente
            if (Math.abs(x - lastX) > 0.05 || Math.abs(y - lastY) > 0.05) {
                cleanAtPosition(x, y);
                lastX = x;
                lastY = y;
            }
        });
        
        // Touch events
        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            const touch = e.touches[0];
            const { x, y } = getWorldCoordinates(touch.clientX, touch.clientY, rect);
            cleanAtPosition(x, y);
        });
        
        // Reset button
        const resetBtn = document.getElementById('arResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                cleanProgress = 0;
                cleaningSpots = [];
                updateLensCleanliness();
                
                // Animación de reset
                if (glassesGroup) {
                    glassesGroup.position.y = 0.05;
                    setTimeout(() => { if(glassesGroup) glassesGroup.position.y = 0; }, 150);
                }
            });
        }
        
        // Detectar móvil
        if ('ontouchstart' in window) {
            const instruction = document.querySelector('.ar-instruction span');
            const mobileInstruction = document.querySelector('.mobile-instruction');
            if (instruction) instruction.style.display = 'none';
            if (mobileInstruction) mobileInstruction.style.display = 'inline';
        }
    }
}

// Añadir animación CSS para las partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            transform: scale(0.5);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);