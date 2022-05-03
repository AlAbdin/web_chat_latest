const users = [];

// const signUsers = { 
//     username:"alan",
//     password:"whatever"
// };

//join user to chat
function userJoin(id, username, room){

//     username = username.trim().toLowerCase();
    
    
//     const existingUser = users.find((user) => user.username === username);
    
//     if(existingUser){
//         console.log("True")
//         return {error: 'User is taken!!'};
//     }
  


    const user = {id, username, room};

    users.push(user);

    return user;

}

// const userJoin = ({id, username, room}) => {
//     // username = username.trim().toLowerCase();
//     // room = room.trim().toLowerCase();
 
//     // const existingUser = users.find((user) => user.username === username);
 
//     // if(existingUser) {
//     //     console.log("very very True")
//     //     return{error: "Username is taken"};
//     // }
//     const user = {id,username,room};
 
//     users.push(user);
//     return {user};
 
// }


// function searchbyusername = str => students.filter(({name}) => name.includes(str))


//Add users
// const addUser = ({id, name, room}) => {
//     name = name.trim().toLowerCase();
//     room = room.trim().toLowerCase();

//     const existingUser = users.find((user) => user.room === room && user.name === name);
// }


//Sign up a user

//Get user
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

//User leave chat
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !==-1){
        return users.splice(index, 1)[0];
    }
}

//Get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}


// function getInfo(){
//     const username = document.getElementById('userName').value;

//     for ( i = 0; i < signUsers.lenght; i++){
//         if(username === signUsers[i].username ){
//             console.log("yes!!");
//         }
//     }
// }

// function getInfo_pass(){
//     var username = document.getElementById("userName").value;
//     var password = document.getElementById("passWord").value;

//     for ( i = 0; i < signUsers.lenght; i++){
//         if(username === signUsers[i].username && password === signUsers.password){
//             console.log("yes!!");
//         }
//     }
// }

module.exports = {
    userJoin,
    getCurrentUser,
    getRoomUsers,
    userLeave,
    // getInfo

};