import messageTable from "../models/Message";

const saveMessage = (data) => {
    messageTable.create({
        content: data[0],
        userId: data[1],
        chatRoomId: data[2],
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