window.onload = function() {
    const socket = io();
    
    const sendButton = document.querySelector(".send-button");
    const chat = document.querySelector("ul");

    // util functions
    const inputMessage = (content, userId, chatRoomId)=>{
        let param = {
            content : content.value, 
            userId : userId,
            chatRoomId : chatRoomId,
        };
        socket.emit('chatting', param);
        content.value = '';
        param.userId.value = '';
    }

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

    const addMessageList = (data)=>{
        const li = document.createElement("li");
        let formattedDate = formatDate(new Date(data.createdAt));

        const img = document.createElement("img");
        img.src = data.User.avatarURL; 
        img.alt = `${data.User.username}'s avatar`;
        img.style.width = '32px';
        img.style.height = '32px';

        if(data.User.id === user.id){
            li.appendChild(img);
            li.appendChild(document.createElement('br'));
            li.appendChild(document.createTextNode(`(${formattedDate}) ${data.content} : ${data.User.username}`));
            li.style.textAlign = 'right';
        }
        else{
            li.appendChild(img);
            li.appendChild(document.createElement('br'));
            li.appendChild(document.createTextNode(`${data.User.username} : ${data.content} (${formattedDate})`));
        }

        chat.appendChild(li);
    }

    // event functions
    sendButton.addEventListener("click", ()=>{
        let content = document.querySelector(".chatting-input");
        let userId = user.id 
        let chatRoomId = chatRoom.id; // 방 마다 room id가 다르게 설정
        if(content.value == ''){
            alert("내용을 입력해주세요.");
        }
        else if(content.value.length > 100){
            alert("100자 이내로 입력해주세요.");
        }
        else {
            inputMessage(content, userId, chatRoomId);
        }
        
    });

    // socket event functions
    socket.on("init", (data)=>{
        if(data[0].chatRoomId != chatRoom.id) return;
        else{
            console.log('init event');
            while (chat.firstChild) { // 기존 채팅 내용 삭제
                chat.removeChild(chat.firstChild);
            }
            for(let i = 0; i < data.length; i++){
                addMessageList(data[i]);
            }
        }
    });

    socket.on("new item", (data)=>{
        if(data[0].chatRoomId != chatRoom.id) return;
        else{
            addMessageList(data[0]);
        }
    });

    socket.on('connect', function() { // 서버에 접속하면 발생하는 이벤트
        socket.emit('join', { chatRoomId: chatRoom.id });
    });
}