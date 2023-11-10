window.onload = function() {
    "use strict"

    const socket = io();

    const nickname = document.querySelector("#nickname");
    const chatRoom = 0; // 방 마다 room id가 따로 있게끔 설계
    const chatInput = document.querySelector(".chatting-input");
    const now = new Date();
    const sendButton = document.querySelector(".send-button");

    //TODO : 최대 글자 수 제한 넣기
    sendButton.addEventListener("click", ()=>{
        const param = [
            nickname.value,
             chatRoom,
              chatInput.value, 
              now.toString()];
        socket.emit('chatting', param);
        chatInput.value = '';
    })
    // 클라이언트로 부터 소켓을 받는 코드
    // 실제 구현시에는 DB에 있는 채팅 기록을 받아와 출력
    socket.on("chatting", (data)=>{
    })
    console.log(socket);
}