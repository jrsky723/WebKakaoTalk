window.onload = function() {
    "use strict"
    const socket = io();
    const nickname = document.querySelector("#nickname");
    const chatRoom = 0; // 방 마다 room id가 따로 있게끔 설계
    const chatInput = document.querySelector(".chatting-input");
    const now = new Date();
    const sendButton = document.querySelector(".send-button");
    sendButton.addEventListener("click", ()=>{
        const param = [
            parseInt(nickname.value),
             chatRoom,
              chatInput.value, 
              now.toString()];
        socket.emit('chatting', param);
        chatInput.value = '';
    });
}