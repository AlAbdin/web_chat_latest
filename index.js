const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, getRoomUsers, userLeave} = require('./utils/users');
var Filter = require('bad-words'),
    filter = new Filter();



const app = express();
const server = http.createServer(app);
const io = socketio(server);

// app.use(cors());

// const router = require('./Public/server/router');
// const req = require('express/lib/request');



// Set Static folder
app.use(express.static(path.join(__dirname, 'Public')));



//The admin/bot username
const botMessage = 'Server';

//Run when a client connect
io.on('connection', socket => {
    
   socket.on('joinedRoom', ({ username, room}) => {
    
        const user = userJoin(socket.id ,username, room.toLowerCase());
        socket.join(user.room);

    
      
            
            
        //Emit only to user client, a welcome message
        socket.emit('message', formatMessage(botMessage, `Welcome \"${user.username}\" you are now in the ${user.room} room`));

        
        
        //Broadcast when a user connects to everyone but user
        //Will make the user added a random one
        socket.broadcast.to(user.room).emit('message', formatMessage(botMessage, `A \"${user.username}\"  appeared`));


        //Send users and room info
        io.to(user.room).emit('roomUsers',{ 
            room: user.room,
            users: getRoomUsers(user.room)
            });
            
    });
    

   
    
   

    //use io.emit() for all clients

    //listen for chat
    socket.on('chatMessage', (msg, callback) =>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, filter.clean(msg)));
        // callback();
    })

     //Broadcast when a user disconnects to everyone but user
    //Will make the user left a random one
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formatMessage(botMessage, `A \"${user.username}\" has left the chat`))

            //Send users and room info
            io.to(user.room).emit('roomUsers',{ 
                room: user.room,
                users: getRoomUsers(user.room)
             });
        }
         
    })
})

const PORT  = process.env.PORT || 3000;

// app.use(router);

server.listen(PORT, () => console.log (`Server running on port ${PORT}`));