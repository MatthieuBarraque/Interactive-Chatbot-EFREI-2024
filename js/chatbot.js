document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    chatForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userMessage = userInput.value;
        addMessage('Vous: ' + userMessage, true);
        userInput.value = '';

        fetch('/chatbot', {
            method: 'POST',
            body: new URLSearchParams({ user_input: userMessage }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
            },
        })
        .then(response => response.json())
        .then(data => {
            const chatbotResponse = data.response;
            addMessage('D3sir3: ' + chatbotResponse, false);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });

    function addMessage(message, isUser) {
        const messageElement = document.createElement('div');
        messageElement.className = isUser ? 'user-message' : 'chatbot-message';
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    addMessage('D3sir3: Bonjour! Comment puis-je vous aider?', false);
});
