const chatbox = document.getElementById('chat-box');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');




//Get username and room by using get from url bu using parse
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true});



const socket = io();

//Join Chat Room
socket.emit('joinedRoom', { username, room});

//Get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsersName(users);
})

//Message from server
socket.on('message', message => {
    outPutMessage(message);
    
    //Scroll after the message
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

//Message submit 
chatbox.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting the message
    const msg= e.target.elements.msg.value;

    //Emit a message to the server
    socket.emit('chatMessage', (msg));
    

    //Clear chatbox after send
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
    
    
})

//Output message to DOM

function outPutMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class = "meta">${message.userName}<span> ${message.time} </span></p>
    <p class="text"> ${message.text} </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//Room name to DOM
function outputRoomName(room){
    roomName.innerText = room;
}

//Users to DOM
function outputUsersName(users){
    usersList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`

}



// module.exports = {
//     outputUsersName
// }



