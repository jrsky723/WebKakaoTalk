
window.onload = function() {
    
    const socket = io();
    
    socket.on("init", (data)=>{
        console.log('init event');
        const chat = document.querySelector("ul");
        for(let i = 0; i < data.length; i++){
            const li = document.createElement("li");
            let formattedDate = formatDate(new Date(data[i].createdAt));
            li.innerText = `${data[i].userId} : ${data[i].content} (${formattedDate})`;
            chat.appendChild(li);
        }
    });

    const sendButton = document.querySelector(".send-button");

    const inputMessage = (content, userId, chatRoomId)=>{
        let param = {
            content : content.value, 
            userId : userId.value,
            chatRoomId : chatRoomId,
        };
        socket.emit('chatting', param);
        content.value = '';
        param.userId.value = '';
    }

    sendButton.addEventListener("click", async ()=>{
        let content = await document.querySelector(".chatting-input");
        let userId = await document.querySelector(".userID");
        let chatRoomId = 1; // 방 마다 room id가 다르게 설정
        if(content.value == '' || userId.value == ''){
            alert("내용을 입력해주세요.");
        }
        else if(content.value.length <= 100){
            inputMessage(content, userId, chatRoomId);
        }
        else{
            alert("100자 이내로 입력해주세요.");
        }
    });

    const formatDate = (date)=>{
        let month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다)
        let day = date.getDate(); // 일
        let hours = date.getHours(); // 시
        let minutes = date.getMinutes(); // 분

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${month}/${day} ${hours}:${minutes}`;
    }

    socket.on("new item", (data)=>{
        console.log('updateClient event');
        const chat = document.querySelector("ul");
        const li = document.createElement("li");
        let formattedDate = formatDate(new Date(data[0].createdAt));
        li.innerText = `${data[0].userId} : ${data[0].content} (${formattedDate})`;
        chat.appendChild(li);
    });

    
}