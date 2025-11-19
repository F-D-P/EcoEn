// Referencias a elementos
const chatbotButton = document.getElementById("chatbot-button");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotOverlay = document.getElementById("chatbot-overlay");
const userMessageInput = document.getElementById("userMessage");
const chatLog = document.getElementById("chatbot-messages");

// Agregar dibujito 🌱 al botón
chatbotButton.innerHTML = '<span style="font-size:28px;cursor:pointer;">🌱</span>';

// Tips de energía renovable para mensajes iniciales dinámicos
const ecoTips = [
  "Apaga los dispositivos que no uses para ahorrar energía ⚡.",
  "Usa bombillas LED: consumen hasta 80% menos energía 💡.",
  "Aprovecha la luz natural siempre que puedas ☀️.",
  "Reciclar y reutilizar reduce la huella de carbono ♻️.",
  "Plantar árboles ayuda a compensar emisiones 🌳.",
  "El transporte público reduce el consumo de combustibles 🚍.",
  "Instalar paneles solares es una gran inversión en sostenibilidad ☀️🔋."
];

// Función para mostrar mensaje en el chat
function addMessage(sender, text, color = "black") {
  const msg = document.createElement("p");
  msg.style.color = color;
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight; // scroll automático
}

// Abrir chatbot con animación y bienvenida dinámica
function openChatbot() {
  chatbotWindow.style.display = "flex";
  chatbotOverlay.style.display = "block";
  chatbotWindow.classList.remove("fadeOutDown");
  chatbotWindow.classList.add("fadeInUp");

  if (chatLog.innerHTML.trim() === "") {
    addMessage("EcoBot 🌱", "¡Hola! Soy tu asistente EcoBot 🌱.", "#43A047");
    // Tip aleatorio
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    addMessage("EcoBot 🌱", `Tip de energía renovable: ${randomTip}`, "#43A047");
  }
}

// Cerrar chatbot con animación y despedida
function closeChatbot() {
  addMessage("EcoBot 🌱", "Gracias por conversar conmigo. ¡Hasta pronto!", "#43A047");
  chatbotWindow.classList.remove("fadeInUp");
  chatbotWindow.classList.add("fadeOutDown");
  setTimeout(() => {
    chatbotWindow.style.display = "none";
    chatbotOverlay.style.display = "none";
  }, 400); // coincide con la duración de la animación
}

// --- Función para alternar abrir/cerrar el chatbot ---
function toggleChatbot() {
  if (chatbotWindow.style.display === "none" || chatbotWindow.style.display === "") {
    openChatbot();
  } else {
    closeChatbot();
  }
}

// Eventos abrir/cerrar
chatbotButton.addEventListener("click", toggleChatbot);
chatbotOverlay.addEventListener("click", closeChatbot);

// Enviar mensaje
async function sendMessage() {
  const message = userMessageInput.value.trim();
  if (!message) return;

  addMessage("Tú", message);

  try {
    const response = await fetch("/chat/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    addMessage("EcoBot 🌱", data.reply, "#43A047");
  } catch (error) {
    addMessage("EcoBot 🌱", "Error al conectar con el servidor.", "red");
  }

  userMessageInput.value = "";
}

// Permitir enviar con Enter
userMessageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

