import messageTable from "../models/Message";

const saveMessage = (data) => {
    messageTable.create({
        content: data.content,
        userId: data.userId,
        chatRoomId: data.chatRoomId,
    });
};

module.exports = (io)=>{
    io.on("connection", (socket)=>{
        socket.on("chatting", (data)=>{
            console.log(data);
            saveMessage(data);          
        });
        socket.on("disconnect", (data) =>{
            console.log("disconnect");
        })
    })
};