import messageTable from "../models/Message";

const saveMessage = async (data) => {
    try {
        await messageTable.create({
            content: data.content,
            userId: data.userId,
            chatRoomId: data.chatRoomId,
        });
        console.log(`userID ${data.userId}가 ${data.chatRoomId}번 방에 메시지를 보냈습니다.`);
    } catch (err) {
        console.error(err);
        console.log("message 저장 실패");
    }
};

const updateClient = (io)=>{
     messageTable.findAll({
        order: [["createdAt", "DESC"]],
        limit: 1
    }).then((result) => {
        if (result.length > 0) {
            const lastLabel = result[0];
            console.log("마지막 레이블 조회 성공:", lastLabel);
        } else {
            console.log("레이블이 없습니다.");
        }
        io.emit("new item", result);
    }).catch((err) => {
        console.error(err);
        console.log("레이블 조회 실패");
    });
}

module.exports = (io)=>{
    io.on("connection", (socket)=>{
        socket.on("chatting", async (data)=>{
            console.log('chatting event');
            await saveMessage(data);
            updateClient(io);
        });
        socket.on("disconnect", (data) =>{
            console.log("disconnect");
        })
    })
};