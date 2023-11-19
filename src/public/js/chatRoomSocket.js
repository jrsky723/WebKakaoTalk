window.onload = function () {
  const socket = io();
  const chat = document.querySelector(".chat");
  const homeLink = document.querySelector(".home-link");

  const handleHomeLinkClick = (event) => {
    event.preventDefault();
    socket.emit("leave_room", chatRoom.id, () => {
      window.location.href = "/";
    });
  };

  homeLink.addEventListener("click", handleHomeLinkClick);

  function toast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = message;
    document.body.appendChild(toast);
    toast.addEventListener("animationend", (event) => {
      if (event.animationName === "fadeout") {
        document.body.removeChild(toast);
      }
    });
    toast.addEventListener("click", () => {
      document.body.removeChild(toast);
    });
  }

  const formatDate = (date) => {
    let month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다)
    let day = date.getDate(); // 일
    let hours = date.getHours(); // 시
    let minutes = date.getMinutes(); // 분
    let year = date.getFullYear(); // 년

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${year}-${month}-${day} | ${hours}:${minutes}`;
  };

  // util functions

  const addMessage = (message) => {
    const user = message.User;
    const content = message.content;

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg");

    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("avatar");

    const img = document.createElement("img");
    img.src = user.avatarURL;
    img.alt = `${user.name}'s avatar`;
    img.setAttribute("width", "100%");
    img.setAttribute("height", "100%");
    avatarDiv.appendChild(img);
    msgDiv.appendChild(avatarDiv);
    msgDiv.appendChild(document.createTextNode(`${content}`));

    const formatedDate = formatDate(new Date(message.createdAt));
    let dataNameTime = "";
    if (message.userId === loggedInUser.id) {
      dataNameTime = `(${formatedDate}) ${user.name}`;
      msgDiv.classList.add("sent");
    } else {
      dataNameTime = `${user.name} (${formatedDate})`;
      msgDiv.classList.add("rcvd");
    }
    msgDiv.setAttribute("data-name-time", dataNameTime);
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;
  };

  if (loggedIn) {
    const chatForm = document.querySelector("#chat-form");
    chatForm.addEventListener("submit", handleMessageSubmit);
  }

  function handleMessageSubmit(event) {
    event.preventDefault();
    const input = document.querySelector("#chat-form input");
    if (input.value.length > 100) {
      alert("100자 이내로 입력해주세요.");
      return;
    }
    const data = {
      chatRoomId: chatRoom.id,
      userId: loggedInUser.id,
      content: input.value,
      User: {
        name: loggedInUser.name,
        avatarURL: loggedInUser.avatarURL,
      },
      createdAt: new Date(),
    };
    socket.emit("new_message", data);
    addMessage(data);
    input.value = "";
  }

  socket.on("new_message", (message) => {
    addMessage(message);
  });

  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  // socket event functions
  socket.on("get_messages", (messages) => {
    messages.forEach((message) => addMessage(message));
  });

  socket.on("connect", () => {
    socket.emit("set_user", { id: loggedInUser.id, name: loggedInUser.name });
    socket.emit("enter_room", chatRoom.id, () => {
      toast("Welcome!");
    });
  });

  socket.on("welcome", (name) => {
    toast(`${name} arrived!`);
  });

  socket.on("bye", (name) => {
    toast(`${name} left...`);
  });
};
