# Socket.io Messenger

A simple real-time messaging application built with **Node.js**, **Express**, and **Socket.io**. This application allows users to join a chat room after entering a valid passkey.

## Features

- **Login Page**: Users must enter a passkey to access the chat room.
- **Real-Time Messaging**: Users can send and receive messages instantly.
- **User Management**: Tracks users joining and leaving the chat room.
- **Broadcast Updates**: Notifies all users when someone joins or leaves the chat.

## Project Structure

```
.
├── public
│   ├── css
│   │   ├── login.css
│   │   └── home.css
│   ├── js
│   │   ├── login.js
│   │   └── home.js
│   ├── login.html
│   └── home.html
├── server.js
├── .env
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```properties
   passkey=98415
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Enter the passkey on the login page.
2. If the passkey is correct, you'll be redirected to the chat room.
3. Start chatting with other users in real-time.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **Socket.io**: Real-time communication library.
- **HTML/CSS/JavaScript**: Frontend technologies.

## Screenshots

### Login Page
![Login Page](https://via.placeholder.com/600x300?text=Login+Page)

### Chat Room
![Chat Room](https://via.placeholder.com/600x300?text=Chat+Room)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Socket.io Documentation](https://socket.io/docs/)
- [Express Documentation](https://expressjs.com/)