import messageTable from "../models/Message";
import User from "../models/User";

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

const updateClient = (io, data)=>{
     messageTable.findAll({
        where: { chatRoomId: data.chatRoomId }, 
        order: [["createdAt", "DESC"]],
        limit: 1,
        include: [{
            model: User,
            as: 'User'
        }],
    }).then((result) => {
        if (result.length > 0) {
            console.log("마지막 레이블 조회 성공");;
            io.emit("new item", result);
        } else {
            console.log("레이블이 없습니다.");
        }
        
    }).catch((err) => {
        console.error(err);
        console.log("레이블 조회 실패");
    });
}

const initChatRoom = (io, data)=>{
    messageTable.findAll({
        order: [["createdAt", "ASC"]],
        where: { chatRoomId: data.chatRoomId }, 
        include: [{
            model: User,
            as: 'User'
        }]
    }).then((result) => {
        if (result.length > 0) {
            console.log("전체 레이블 조회 성공");
            io.emit("init", result);
        } else {
            console.log("초기화 할 레이블이 없습니다.");
        }
    }).catch((err) => {
        console.error(err);
        console.log("레이블 조회 실패");
    });
}

module.exports = (io)=>{
    io.on("connection", (socket)=>{
        
        socket.on('join', function(data) {
            initChatRoom(io, data);
        });

        socket.on("chatting", async (data)=>{
            console.log('chatting event');
            await saveMessage(data);
            updateClient(io, data);
        });

        socket.on("disconnect", (data) =>{
            console.log("disconnect");
        })
        socket.on('error', (error)=>{
            console.log(error);
        });
    })
};