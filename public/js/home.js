// sends conection request to server
const socket = io();
// triggers io.on("connection", ...) on server


const joinButton = document.getElementById('join-chat');
const chat = document.getElementById('chat');
const userList = document.getElementById('users');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatHeader = document.getElementById('chat-header');
const chatHeaderContent = document.getElementById('chat-header-contents');
const userListSection = document.getElementById('user-list');

let userName;

// Show the prompt when the user clicks the "Join Chat" button
joinButton.addEventListener('click', () => {
    userName = prompt('Enter your username');
    if (userName) {
        // Emit 'join' event with username
        socket.emit('join', userName);

        // Hide the join button and show chat components
        joinButton.style.display = 'none';
        userListSection.style.display = 'block';
        chatHeader.style.display = 'block';
        chat.style.display = 'flex';
        messageForm.style.display = 'block';
        chatHeaderContent.innerText = `Chats / ${userName}`;
    }
});

// Listen for the 'userJoined' event from the server
socket.on('userJoined', (user) => {
    addMessage(`${user} has joined the chat.`);
});

socket.on("userLeft", (user) => {
    addMessage(`${user} has disconnected.`);
})

// for updating users on user-list
socket.on("userList", (allUsers) => {
    userList.innerHTML = allUsers.map(user => `<li>${user}</li>`).join(" ");
})

//Listen for chatmessag from the sever
socket.on("chatMessage", (message) => {
    addMessage(`${message.userName} : ${message.text}`);
})

//handle form submission
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const extractMessage = messageInput.value.trim();

    if (extractMessage) {
        socket.emit("chatMessage", {
            userName,
            text: extractMessage
        });
    }

    messageInput.value = "";
});

// Function to add messages to the chat area
function addMessage(input) {
    const messageElement = document.createElement('div');
    messageElement.textContent = input;
    chat.appendChild(messageElement);

    // Scroll to the bottom of the chat container
    chat.scrollTop = chat.scrollHeight;
}