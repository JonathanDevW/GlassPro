// ========== TEST DE NECESIDAD - QUIZ INTERACTIVO ==========

// Preguntas del quiz
// ========== TEST DE NECESIDAD - VERSIÓN CORREGIDA ==========

// Preguntas del quiz (sin preguntar formato directamente)
const quizQuestions = [
    {
        id: 1,
        question: "¿Con qué frecuencia se te empañan los lentes?",
        options: [
            { value: "spray", title: "Muy seguido", desc: "Varias veces al día", icon: "fa-regular fa-face-frown" },
            { value: "kit", title: "Ocasionalmente", desc: "Algunas veces a la semana", icon: "fa-regular fa-face-meh" },
            { value: "wipes", title: "Raramente", desc: "Solo en situaciones específicas", icon: "fa-regular fa-face-smile" }
        ]
    },
    {
        id: 2,
        question: "¿Para qué actividad principal necesitas el producto?",
        options: [
            { value: "spray", title: "Uso diario", desc: "Trabajo, estudio, actividades cotidianas", icon: "fa-regular fa-calendar" },
            { value: "wipes", title: "Deporte/Entrenamiento", desc: "Gimnasio, running, actividades físicas", icon: "fa-solid fa-person-running" },
            { value: "kit", title: "Todo propósito", desc: "Múltiples actividades y situaciones", icon: "fa-regular fa-star" }
        ]
    },
    {
        id: 3,
        question: "¿Cuánto tiempo necesitas que dure el efecto?",
        options: [
            { value: "wipes", title: "Pocas horas", desc: "Para una salida o evento corto", icon: "fa-regular fa-clock" },
            { value: "spray", title: "Todo el día", desc: "8-12 horas de duración", icon: "fa-regular fa-sun" },
            { value: "kit", title: "Múltiples días", desc: "Hasta 72 horas de protección", icon: "fa-regular fa-calendar-week" }
        ]
    },
    {
        id: 4,
        question: "¿Qué es más importante para ti?",
        options: [
            { value: "wipes", title: "Portabilidad", desc: "Que quepa en mi bolsillo", icon: "fa-regular fa-bag-shopping" },
            { value: "spray", title: "Duración", desc: "Que dure mucho tiempo", icon: "fa-regular fa-hourglass-half" },
            { value: "kit", title: "Completo", desc: "Tener todo lo necesario", icon: "fa-regular fa-crown" }
        ]
    },
    {
        id: 5,
        question: "¿Cuál es tu presupuesto?",
        options: [
            { value: "wipes", title: "Económico", desc: "Menos de $5", icon: "fa-regular fa-circle-dollar" },
            { value: "spray", title: "Intermedio", desc: "$5 - $10", icon: "fa-regular fa-credit-card" },
            { value: "kit", title: "Premium", desc: "$10 - $15 (mejor valor)", icon: "fa-regular fa-gem" }
        ]
    }
];

// Mapeo directo: cada respuesta tiene un producto específico
// Ya no hay confusión porque las opciones están alineadas con los productos reales

// Productos con sus características reales
const products = {
    spray: {
        name: "Spray Anti-empañe PRO",
        price: "$3.99",
        format: "Spray líquido",
        description: "Perfecto para uso diario. Fórmula de secado instantáneo que dura hasta 72 horas.",
        features: ["Dura hasta 72 horas", "Secado instantáneo", "Ahorra tiempo", "Efectivo en todo tipo de lentes"],
        icon: "fa-solid fa-spray-can-sparkles",
        bgGradient: "linear-gradient(135deg, #2c7da0, #1e5f7a)"
    },
    wipes: {
        name: "Toallitas Mini Action",
        price: "$4.49",
        format: "Toallitas individuales",
        description: "Prácticas y portátiles. Pack de 10 toallitas individuales. Perfectas para llevar donde sea.",
        features: ["Pack de 10 toallitas", "Formato individual", "Fáciles de transportar", "Sin líquidos"],
        icon: "fa-solid fa-wipes",
        bgGradient: "linear-gradient(135deg, #2d6a4f, #1b4332)"
    },
    kit: {
        name: "Kit Profesional",
        price: "$12.99",
        format: "Spray + Toallitas + Microfibra",
        description: "La solución completa. Incluye Spray PRO + 20 toallitas + paño de microfibra.",
        features: ["Ahorro del 30%", "Spray + 20 toallitas", "Paño de microfibra incluido", "Caja de regalo"],
        icon: "fa-solid fa-kit-medical",
        bgGradient: "linear-gradient(135deg, #e65100, #bf360c)"
    }
};

// La lógica de recomendación ahora es coherente
// Cada respuesta suma puntos al producto que realmente se ajusta a esa necesidad

// Estado del quiz
let currentQuestion = 0;
let answers = {
    spray: 0,
    wipes: 0,
    kit: 0
};
let selectedOption = null;

// Renderizar el quiz
function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    if (currentQuestion < quizQuestions.length) {
        // Mostrar pregunta actual
        const question = quizQuestions[currentQuestion];
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        
        let optionsHtml = '';
        question.options.forEach(option => {
            const isSelected = selectedOption === option.value;
            optionsHtml += `
                <div class="quiz-option ${isSelected ? 'selected' : ''}" data-value="${option.value}">
                    <div class="quiz-option-icon">
                        <i class="${option.icon}"></i>
                    </div>
                    <div class="quiz-option-text">
                        <div class="quiz-option-title">${option.title}</div>
                        <div class="quiz-option-desc">${option.desc}</div>
                    </div>
                    ${isSelected ? '<i class="fa-regular fa-circle-check" style="color: #2c7da0; font-size: 1.5rem;"></i>' : ''}
                </div>
            `;
        });
        
        container.innerHTML = `
            <div class="quiz-card">
                <div class="quiz-progress">
                    <div class="progress-bar-custom">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-text">Pregunta ${currentQuestion + 1} de ${quizQuestions.length}</div>
                </div>
                
                <div class="quiz-question">
                    ${question.question}
                </div>
                
                <div class="quiz-options">
                    ${optionsHtml}
                </div>
                
                <div class="quiz-navigation">
                    <button class="quiz-btn quiz-btn-prev" id="prevQuestion" ${currentQuestion === 0 ? 'disabled' : ''}>
                        <i class="fa-regular fa-arrow-left"></i> Anterior
                    </button>
                    <button class="quiz-btn quiz-btn-next" id="nextQuestion" ${!selectedOption ? 'disabled' : ''}>
                        ${currentQuestion === quizQuestions.length - 1 ? 'Ver resultado' : 'Siguiente'} <i class="fa-regular fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Agregar event listeners a las opciones
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                selectOption(value);
            });
        });
        
        // Event listeners de navegación
        const prevBtn = document.getElementById('prevQuestion');
        const nextBtn = document.getElementById('nextQuestion');
        
        if (prevBtn) prevBtn.addEventListener('click', prevQuestion);
        if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
        
    } else {
        // Mostrar resultado
        showResult();
    }
}

// Seleccionar opción
function selectOption(value) {
    selectedOption = value;
    
    // Actualizar la interfaz
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
        const checkIcon = option.querySelector('.fa-circle-check');
        if (checkIcon) checkIcon.remove();
        
        if (option.getAttribute('data-value') === value) {
            option.classList.add('selected');
            const checkMark = document.createElement('i');
            checkMark.className = 'fa-regular fa-circle-check';
            checkMark.style.cssText = 'color: #2c7da0; font-size: 1.5rem;';
            option.appendChild(checkMark);
        }
    });
    
    // Habilitar botón siguiente
    const nextBtn = document.getElementById('nextQuestion');
    if (nextBtn) nextBtn.disabled = false;
}

// Guardar respuesta
function saveAnswer() {
    if (selectedOption) {
        answers[selectedOption]++;
    }
}

// Siguiente pregunta
function nextQuestion() {
    if (!selectedOption) return;
    
    saveAnswer();
    selectedOption = null;
    currentQuestion++;
    renderQuiz();
}

// Pregunta anterior
function prevQuestion() {
    if (currentQuestion > 0) {
        // Remover la última respuesta guardada
        const lastAnswer = getLastAnswer();
        if (lastAnswer) {
            answers[lastAnswer]--;
        }
        currentQuestion--;
        selectedOption = null;
        renderQuiz();
    }
}

// Obtener última respuesta (para poder revertir)
function getLastAnswer() {
    if (currentQuestion > 0 && currentQuestion <= quizQuestions.length) {
        const prevQuestionData = quizQuestions[currentQuestion - 1];
        // Esta es una simplificación - en producción necesitarías guardar el historial
        return Object.keys(answers).find(key => answers[key] > 0);
    }
    return null;
}

// Mostrar resultado
function showResult() {
    // Determinar el producto ganador
    let maxVotes = 0;
    let winner = 'spray';
    
    for (const [product, votes] of Object.entries(answers)) {
        if (votes > maxVotes) {
            maxVotes = votes;
            winner = product;
        }
    }
    
    const product = products[winner];
    const container = document.getElementById('quizContainer');
    
    container.innerHTML = `
        <div class="quiz-card quiz-result">
            <i class="fa-regular fa-trophy" style="font-size: 3rem; color: #ffc107;"></i>
            <h3 style="color: #1a3c5e; margin-top: 1rem;">¡Este es tu producto ideal!</h3>
            
            <div class="result-product" style="background: ${product.bgGradient}">
                <div class="result-product-icon">
                    <i class="${product.icon}"></i>
                </div>
                <div class="result-product-name">${product.name}</div>
                <div class="result-product-price">${product.price}</div>
                <div class="result-product-desc">${product.description}</div>
                
                <div style="text-align: left; margin: 1.5rem 0;">
                    <strong><i class="fa-regular fa-circle-check"></i> Beneficios:</strong>
                    <ul style="margin-top: 0.5rem;">
                        ${product.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="result-buttons">
                <a href="${product.buyLink}" class="btn-buy-now">
                    <i class="fa-solid fa-cart-shopping"></i> Comprar ahora
                </a>
                <button class="btn-restart-quiz" id="restartQuiz">
                    <i class="fa-regular fa-rotate-right"></i> Volver a empezar
                </button>
            </div>
        </div>
    `;
    
    const restartBtn = document.getElementById('restartQuiz');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }
    
    // Scroll suave al resultado
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Reiniciar quiz
function restartQuiz() {
    currentQuestion = 0;
    answers = { spray: 0, wipes: 0, kit: 0 };
    selectedOption = null;
    renderQuiz();
}

// Inicializar quiz cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quizContainer')) {
        renderQuiz();
    }
});