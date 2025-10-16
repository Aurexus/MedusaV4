// Footer chatbot setup
function initChatbot() {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const closeChat = document.getElementById("closeChat");
  const icon = chatbotToggle?.querySelector("i");
  const sendMessage = document.getElementById("sendMessage");
  const userMessage = document.getElementById("userMessage");
  const chatBody = document.getElementById("chatBody");

  if (!chatbotToggle || !chatbotWindow) {
    console.warn("Chatbot elements not found — footer might not be loaded yet.");
    return;
  }

  chatbotToggle.addEventListener("click", () => {
    const isOpen = chatbotWindow.style.display === "flex";
    chatbotWindow.style.display = isOpen ? "none" : "flex";
    icon?.classList.toggle("fa-times", !isOpen);
    icon?.classList.toggle("fa-comment-dots", isOpen);
  });

  closeChat?.addEventListener("click", () => {
    chatbotWindow.style.display = "none";
    icon?.classList.remove("fa-times");
    icon?.classList.add("fa-comment-dots");
  });

  sendMessage?.addEventListener("click", () => {
    const msg = userMessage.value.trim();
    if (!msg) return;
    const userDiv = document.createElement("p");
    userDiv.innerHTML = `<strong>You:</strong> ${msg}`;
    chatBody.appendChild(userDiv);
    userMessage.value = "";
    setTimeout(() => {
      const botDiv = document.createElement("p");
      botDiv.innerHTML = `<strong>Bot:</strong> Thanks for your message!`;
      chatBody.appendChild(botDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
  });
}
