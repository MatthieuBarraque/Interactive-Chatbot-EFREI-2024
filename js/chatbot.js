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
            addMessage('D3sir3: ' + chatbotResponse, false); // Afficher la réponse du chatbot
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

    // Exemple d'ajout de message initial du chatbot
    addMessage('D3sir3: Bonjour! Comment puis-je vous aider?', false);
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value; // Utilisez 'user-input' pour obtenir la valeur
    const response = await fetch('/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_input: userInput })
    });
    const data = await response.json();
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `<p>Vous: ${userInput}</p>`;
    chatMessages.innerHTML += `<p>Chatbot: ${data.response}</p>`;
    document.getElementById('user-input').value = '';
}

function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.className = isUser ? 'user-message' : 'chatbot-message';
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Retourner l'élément du message pour pouvoir le modifier plus tard
    return messageElement;
}