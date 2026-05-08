
  // ========== CHATBOT LOGIC ==========
  
  // Base de conocimiento del chatbot
  const knowledgeBase = {
    // Saludos
    'hola': '👋 ¡Hola! Bienvenido a Glass Pro. ¿En qué puedo ayudarte?',
    'buenos días': '🌞 ¡Buenos días! ¿Cómo puedo asistirte hoy?',
    'buenas tardes': '🌤️ ¡Buenas tardes! ¿En qué te puedo ayudar?',
    'buenas noches': '🌙 ¡Buenas noches! ¿Cómo puedo ayudarte?',
    'hey': '👋 ¡Hey! ¿Qué tal? Cuéntame, ¿en qué puedo ayudarte?',
    
    // Precios
    'precio': '💰 Nuestros precios son: <br>• Spray Anti-empañe PRO: <strong>$3.99</strong><br>• Toallitas Mini Action (10u): <strong>$4.49</strong><br>• Kit Profesional: <strong>$12.99</strong><br><br>¡Todos con envío gratis en compras mayores a $15!',
    'precios': '💰 Nuestros precios son: <br>• Spray Anti-empañe PRO: <strong>$3.99</strong><br>• Toallitas Mini Action (10u): <strong>$4.49</strong><br>• Kit Profesional: <strong>$12.99</strong><br><br>¡Todos con envío gratis en compras mayores a $15!',
    'cuánto cuesta': '💰 El spray cuesta <strong>$3.99</strong>, las toallitas <strong>$4.49</strong> (pack de 10) y el kit profesional <strong>$12.99</strong>. ¡Precio calidad!',
    'cuanto cuesta': '💰 El spray cuesta <strong>$3.99</strong>, las toallitas <strong>$4.49</strong> (pack de 10) y el kit profesional <strong>$12.99</strong>. ¡Precio calidad!',
    
    // Productos
    'spray': '✨ El <strong>Spray Anti-empañe PRO</strong> es nuestra fórmula premium de secado instantáneo. Cuesta <strong>$3.99</strong> y dura hasta 72 horas. ¡Ideal para todo tipo de lentes!',
    'toallitas': '🧴 Las <strong>Toallitas Mini Action</strong> vienen en pack de 10 unidades. Cuestan <strong>$4.49</strong> y son perfectas para llevar en tu bolso o mochila.',
    'kit': '🎁 El <strong>Kit Profesional</strong> incluye: Spray PRO + 20 toallitas + paño de microfibra. Todo por solo <strong>$12.99</strong>. ¡El pack más completo!',
    
    // Ubicaciones
    'dónde comprar': '📍 Puedes encontrarnos en:<br>• Supermercados: Super Selectos, Walmart, Despensa Familiar<br>• Farmacias: Simán, San Nicolás, Santa Lucía<br>• También tenemos <strong>tienda en línea</strong> con envíos a todo El Salvador.',
    'donde comprar': '📍 Puedes encontrarnos en:<br>• Supermercados: Super Selectos, Walmart, Despensa Familiar<br>• Farmacias: Simán, San Nicolás, Santa Lucía<br>• También tenemos <strong>tienda en línea</strong> con envíos a todo El Salvador.',
    'ubicación': '📍 Estamos en <strong>Santa Ana, El Salvador</strong>. Tenemos presencia en supermercados, farmacias y venta online. ¿Necesitas la dirección exacta de algún punto?',
    'ubicaciones': '📍 Nuestros principales puntos en Santa Ana: Super Selectos centro, Walmart, Farmacia Simán. También hacemos envíos a todo el departamento.',
    'santa ana': '📍 ¡Claro! En Santa Ana nos encuentras en:<br>• Super Selectos (Centro)<br>• Walmart Santa Ana<br>• Farmacia Simán<br>• Farmacia San Nicolás',
    
    // Cómo usar
    'cómo aplicar': '📖 Aplicar nuestro producto es muy fácil:<br>1️⃣ Limpia bien tus lentes<br>2️⃣ Rocía el spray o pasa la toallita<br>3️⃣ Deja secar unos segundos<br>4️⃣ Listo, ¡disfruta de lentes sin empañar por horas!',
    'como aplicar': '📖 Aplicar nuestro producto es muy fácil:<br>1️⃣ Limpia bien tus lentes<br>2️⃣ Rocía el spray o pasa la toallita<br>3️⃣ Deja secar unos segundos<br>4️⃣ Listo, ¡disfruta de lentes sin empañar por horas!',
    'uso': '📖 Es muy simple: limpia tus lentes, aplica el producto (spray o toallita), deja secar y ¡listo! Los resultados duran hasta 72 horas.',
    'instrucciones': '📖 Instrucciones de uso:<br>• Spray: aplicar a 15cm de distancia, esparcir uniformemente<br>• Toallitas: limpiar suavemente toda la superficie<br>Ambos productos son seguros para lentes con anti-reflejo.',
    
    // Contacto
    'contacto': '📱 Puedes contactarnos:<br>• Email: hola@glasspro.com<br>• WhatsApp: +503 2131-0000<br>• Instagram, Facebook y TikTok: @glasspro_sv<br>¡Te responderemos rápidamente!',
    'email': '📧 Nuestro email es <strong>hola@glasspro.com</strong>. ¡Escríbenos cuando quieras!',
    'whatsapp': '📱 Nuestro WhatsApp es <strong>+503 2131-0000</strong>. Estamos disponibles de lunes a viernes de 9am a 6pm.',
    
    // Garantía
    'garantía': '✅ Todos nuestros productos tienen <strong>garantía de satisfacción de 30 días</strong>. Si no quedas conforme, te devolvemos tu dinero. ¡Sin preguntas!',
    'garantia': '✅ Todos nuestros productos tienen <strong>garantía de satisfacción de 30 días</strong>. Si no quedas conforme, te devolvemos tu dinero. ¡Sin preguntas!',
    
    // Envíos
    'envío': '🚚 Realizamos envíos a <strong>todo Santa Ana y zonas cercanas</strong>. El costo es de $2.50 y es <strong>GRATIS en compras mayores a $15</strong>.',
    'envios': '🚚 Realizamos envíos a <strong>todo Santa Ana y zonas cercanas</strong>. El costo es de $2.50 y es <strong>GRATIS en compras mayores a $15</strong>.',
    'domicilio': '🏠 Sí, hacemos envíos a domicilio en toda el área metropolitana de Santa Ana. Entrega en 24-48 horas hábiles.',
    
    // Horarios
    'horario': '🕐 Nuestro horario de atención es:<br>• Lunes a Viernes: 9:00 AM - 6:00 PM<br>• Sábados: 9:00 AM - 2:00 PM<br>• Domingos: cerrado',
    'horarios': '🕐 Nuestro horario de atención es:<br>• Lunes a Viernes: 9:00 AM - 6:00 PM<br>• Sábados: 9:00 AM - 2:00 PM<br>• Domingos: cerrado',
    
    // Ayuda
    'ayuda': '🤝 Claro que sí. Puedo ayudarte con:<br>• Precios y productos<br>• Dónde comprar<br>• Cómo aplicar el producto<br>• Envíos y garantías<br>¿Qué te gustaría saber?',
    'info': 'ℹ️ Soy el asistente virtual de Glass Pro. Pregúntame sobre precios, productos, ubicaciones, envíos o cualquier otra duda que tengas.',
    
    // Despedidas
    'gracias': '🎉 ¡De nada! Fue un placer ayudarte. Si necesitas algo más, aquí estoy. ¡Que tengas un excelente día!',
    'adiós': '👋 ¡Hasta luego! Si tienes más preguntas, aquí estoy para ayudarte. ¡Que estés muy bien!',
    'chao': '👋 ¡Chao! Cuídate mucho. ¡Esperamos verte pronto en Glass Pro!',
    'bye': '👋 ¡Bye bye! Que tengas un lindo día ✨',
  };
  
  // Función para encontrar respuesta (flexible con mayúsculas/minúsculas y tildes)
  function findBestMatch(userMessage) {
    const normalizedMsg = userMessage.toLowerCase().trim();
    
    // Eliminar tildes para mejor matching
    const withoutAccents = normalizedMsg
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    
    // Buscar coincidencia exacta
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (normalizedMsg.includes(key) || withoutAccents.includes(key)) {
        return response;
      }
    }
    
    // Respuestas para palabras clave específicas
    if (normalizedMsg.includes('precio') || normalizedMsg.includes('cuesta') || 
        withoutAccents.includes('precio') || withoutAccents.includes('costo')) {
      return knowledgeBase['precio'];
    }
    
    if (normalizedMsg.includes('compra') || normalizedMsg.includes('donde') || 
        withoutAccents.includes('compra') || withoutAccents.includes('donde')) {
      return knowledgeBase['dónde comprar'];
    }
    
    if (normalizedMsg.includes('aplica') || normalizedMsg.includes('usar') || 
        withoutAccents.includes('aplica') || withoutAccents.includes('usar')) {
      return knowledgeBase['cómo aplicar'];
    }
    
    if (normalizedMsg.includes('garant') || withoutAccents.includes('garant')) {
      return knowledgeBase['garantía'];
    }
    
    if (normalizedMsg.includes('envio') || normalizedMsg.includes('domicilio') ||
        withoutAccents.includes('envio') || withoutAccents.includes('domicilio')) {
      return knowledgeBase['envío'];
    }
    
    // Respuesta por defecto
    return '🤔 Lo siento, no entendí tu pregunta. ¿Podrías reformularla?\n\nPuedo ayudarte con:\n• 💰 Precios y productos\n• 📍 Dónde comprar\n• 📖 Cómo usar el producto\n• ✅ Garantía\n• 🚚 Envíos\n• 📱 Contacto\n\n¿Qué te gustaría saber?';
  }
  
  // Variables del chatbot
  let isTyping = false;
  let messageQueue = [];
  
  // Elementos DOM
  const chatbotContainer = document.getElementById('chatbotContainer');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const closeChat = document.getElementById('closeChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendMessageBtn');
  const resetBtn = document.getElementById('resetChatBtn');
  
  // Abrir/cerrar chatbot
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
      chatInput.focus();
    }
  });
  
  closeChat.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
  });
  
  // Enviar mensaje
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '' || isTyping) return;
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Mostrar indicador de escritura
    showTypingIndicator();
    
    // Simular tiempo de respuesta (más realista)
    setTimeout(() => {
      const response = findBestMatch(message);
      removeTypingIndicator();
      addMessage(response, 'bot');
    }, 500 + Math.random() * 500);
  }
  
  // Agregar mensaje al chat
  function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll al final
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Mostrar indicador de escritura
  function showTypingIndicator() {
    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Remover indicador de escritura
  function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
      indicator.remove();
    }
    isTyping = false;
  }
  
  // Reiniciar conversación
  function resetChat() {
    chatMessages.innerHTML = `
      <div class="message bot">
        <div class="message-content">
          👋 ¡Hola! Soy el asistente de <strong>Glass Pro</strong>.<br>
          ¿En qué puedo ayudarte hoy?
        </div>
      </div>
    `;
  }
  
  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  resetBtn.addEventListener('click', resetChat);
  
  // Quick replies
  document.querySelectorAll('.quick-reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      chatInput.value = question;
      sendMessage();
    });
  });
  
  // Optional: Cerrar chatbot al hacer click fuera (comportamiento opcional)
  document.addEventListener('click', (e) => {
    if (chatbotContainer.classList.contains('active')) {
      const isClickInside = chatbotContainer.contains(e.target) || 
                           chatbotToggle.contains(e.target);
      if (!isClickInside) {
        chatbotContainer.classList.remove('active');
      }
    }
  });
  
  // Prevenir que el click dentro del chatbot lo cierre
  chatbotContainer.addEventListener('click', (e) => {
    e.stopPropagation();
  });
