"use strict" // JS 엄격모드
    // 열려있는 서버와 연결

    // const socket = io.connect('http://localhost:4000', {
    //     path: '/server.js',
    //     transports: ['websocket']
    // });
    const socket = io();
    // 돔
    const nickname = document.querySelector("#nickname");
    const chatRoom = 0; // 방 마다 room id가 따로 있게끔 설계
    const chatList = document.querySelector(".chatting-list");
    const chatInput = document.querySelector(".chatting-input");
    const now = new Date();
    const sendButton = document.querySelector(".send-button");
    // sendButton 클릭시 이벤트 구현
    sendButton.addEventListener("click", ()=>{
        const param = {
            inputUserId : nickname.value,
            roomId : chatRoom,
            msg : chatInput.value,
            inputTime : now.toString()
        }
    // 메시지를 보내는 코드
        socket.emit('chatting', param);
        chatInput.value = '';
    })
    // 클라이언트로 부터 소켓을 받는 코드
    // 실제 구현시에는 DB에 있는 채팅 기록을 받아와 출력
    socket.on("chatting", (data)=>{
    })
    console.log(socket);