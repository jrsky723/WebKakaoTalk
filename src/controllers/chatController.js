export const rooms = (req, res) => {
  const chatRooms = [
    {
      title: "Yang",
      lastMessage: "Hello",
      createdAt: "2021-09-08 12:00:00",
      updatedAt: "2021-09-08 12:00:00",
      userCount: 2,
    },
  ];
  res.render("home", { pageTitle: "Chat Rooms", chatRooms });
};
export const see = (req, res) => res.render("chat");
export const search = (req, res) => res.send("Search");
export const create = (req, res) => res.send(inputChatHTML);
export const remove = (req, res) => res.send("Remove");

// socket.io 패킷 교환 확인용 임시 변수
const inputChatHTML = `<!DOCTYPE html>
<html lang = 'en'>
    <head>
        <meta charset="utf-8">
        <title>Document</title>
    </head>
    <body>

        <div class="wrapper">
            <div class="user-container">
                사용자 : <input type="text" id="nickname"
            </div>
            <div class="display-container">
                <ul class="chatting-list">

                </ul>
            </div>
            <div class="input-container">
                <input type="test" class="chatting-input">
                <button class="send-button">전송</button>
            </div>
        </div>
        <script src="/socket.io/socket.io.js"></script>
        <script>
        "use strict" // JS 엄격모드

        // 열려있는 서버와 연결
        //const socket = io();
        const socket = io.connect('http://localhost:4000', {
          path: '/socket.io',
          transports: ['websocket']
        });
        // 돔
        const nickname = document.querySelector("#nickname");
        const chatList = document.querySelector(".chatting-list");
        const chatInput = document.querySelector(".chatting-input");
        const sendButton = document.querySelector(".send-button");
        
        // sendButton 클릭시 이벤트 구현
        sendButton.addEventListener("click", ()=>{
            const param = {
                name : nickname.value,
                msg : chatInput.value
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
        </script>

    </body>

</html>`;