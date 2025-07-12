import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// app is passed to it, so the server will forward requests to the Express application. This allows the Express app to handle the requests and send responses.
const server = http.createServer(app);
// this lets you use all the features like app.get(), app.post(), app.use(), etc.

//initiate socket.io and attach this to the http server
const io = new Server(server);

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('login.html', { root: './public' });
});

app.post('/verify-passkey', (req, res) => {
    const { passkey } = req.body;
    if (passkey === process.env.passkey) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Set: This is a built-in JavaScript object that allows you to store unique values. A Set automatically ensures that there are no duplicate values; if you try to add the same value more than once, it will only appear once in the Set.
const users = new Set();
// users.add("John"), users.has("John"), users.delete("John") and users.clear()


// this auto triggers when client-side executes const socket = io();
io.on("connection",(socket) => {
    // handle users when they will join the chat
    socket.on('join', (userName) => {
        //add newly joined user to users set
        users.add(userName);
        socket.userName = userName;
        console.log(`${userName} has connected.`);

        // broadcast to all clients/users that a new user has joined
        io.emit('userJoined',userName);

        //send the updated user list to all clients
        io.emit('userList', Array.from(users));
    })

    //handle incomming chat messages
    socket.on("chatMessage", (message) => {
        //broadcast the received message to all connected clients
        io.emit("chatMessage", message);
    })

    // handle user disconnection
    // Yes, the socket.on("disconnect", () => {}) event is triggered automatically when the connection between the client (user-side) and the server (socket.io) is lost or broken.
    socket.on("disconnect", () => {

        users.forEach((user) => {
            if (user === socket.userName) {
                users.delete(user);

                io.emit("userLeft",user);

                io.emit("userList", Array.from(users));

                console.log(`${user} has disconnected.`);
            }

        })
    })

});

server.listen(port, () => {
    console.log(`Server is now running in port, ${port}`);
})