import {Server} from "socket.io"

const io = new Server({
    cors:{
        origin:"http://localhost:5173",
    },
});

let onlineUser = [];

const adduser = (userId,socketId)=>{
    const userExists = onlineUser.find(user => user.userId === userId);
    if (userExists) {
        // Update the socketId if the user already exists
        userExists.socketId = socketId;
    } else {
        onlineUser.push({ userId, socketId });
    }
}

const removeUser = (socketId)=>{
    onlineUser = onlineUser.filter((user)=>user.socketId !== socketId);
}

const getUser = (userId)=>{
    return onlineUser.find((user) => user.userId === userId);
}

io.on("connection",(socket)=>{
    socket.on("newUser",(userId)=>{
        adduser(userId,socket.id);
        console.log(onlineUser)
    })

    socket.on("sendMessage",({receiverId,data})=>{
        const receiver = getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", data);
        } else {
            console.log(`User with ID ${receiverId} is not online.`);
        }
    })

    socket.on("disconnect",()=>{
        removeUser(socket.id);
    });
});

io.listen("4000")