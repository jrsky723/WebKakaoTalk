window.onload = function() {
    
    const socket = io();
    
    const content = document.querySelector(".chatting-input");
    const userId = document.querySelector("#nickname");
    const chatRoomId = 1; // 방 마다 room id가 다르게 설정

    const sendButton = document.querySelector(".send-button");

    sendButton.addEventListener("click", ()=>{
        if(content.value.length <= 100){
            const param = [
                content.value, 
                parseInt(userId.value),
                parseInt(chatRoomId),
            ];
            
            socket.emit('chatting', param);
        }
        else{
            alert("100자 이내로 입력해주세요.");
        }
        content.value = '';
    });
}