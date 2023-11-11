module.exports = (io)=>{
    io.on("connection", (socket)=>{
        socket.on("chatting", (data)=>{
            console.log(data);
        });
        socket.on("disconnect", (data) =>{
            console.log("disconnect");
        })
    })
};