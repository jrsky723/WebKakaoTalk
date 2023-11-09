// socket.io를 통한 패킷 교환
module.exports = (io)=>{
    io.on("connection", (socket)=>{
        socket.on("chatting", (data)=>{
        console.log(data);
        //여기에 들어오는 패킷을 채팅들이다
        });
        socket.on("disconnect", (data) =>{
        console.log("disconnect");
        })
    })
};