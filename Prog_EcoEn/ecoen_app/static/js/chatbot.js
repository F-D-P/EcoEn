// Referencias a elementos
const chatbotButton = document.getElementById("chatbot-button");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotOverlay = document.getElementById("chatbot-overlay");
const userMessageInput = document.getElementById("userMessage");
const chatLog = document.getElementById("chatbot-messages");

// Función para mostrar mensaje en el chat
function addMessage(sender, text, color = "black") {
  const msg = document.createElement("p");
  msg.style.color = color;
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight; // scroll automático
}

// Abrir chatbot con bienvenida
chatbotButton.addEventListener("click", () => {
  chatbotWindow.classList.add("active");
  chatbotOverlay.classList.add("active");

  // Si no hay mensajes aún, mostrar bienvenida
  if (chatLog.innerHTML.trim() === "") {
    addMessage("EcoBot 🌱", "¡Hola! Soy tu asistente EcoBot 🌱. ¿En qué puedo ayudarte hoy?", "#4CAF50");
  }
});

// Cerrar chatbot al hacer clic en overlay con despedida
chatbotOverlay.addEventListener("click", () => {
  addMessage("EcoBot 🌱", "Gracias por conversar conmigo. ¡Hasta pronto!", "#4CAF50");
  chatbotWindow.classList.remove("active");
  chatbotOverlay.classList.remove("active");
});

// Enviar mensaje
async function sendMessage() {
  const message = userMessageInput.value.trim();
  if (!message) return;

  // Mostrar mensaje del usuario
  addMessage("Tú", message);

  // Enviar al backend
  try {
    const response = await fetch("/chat/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message })
    });
    const data = await response.json();

    // Mostrar respuesta del bot
    addMessage("EcoBot 🌱", data.reply, "#4CAF50");
  } catch (error) {
    addMessage("EcoBot 🌱", "Error al conectar con el servidor.", "red");
  }

  // Limpiar input
  userMessageInput.value = "";
}

// Permitir enviar con Enter
userMessageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
