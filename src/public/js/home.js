window.onload = () => {
  const roomDeleteBtn = document.querySelectorAll(".delete-room");
  const roomJoinBtn = document.querySelectorAll(".join-room");

  const handleRoomJoin = async (event) => {
    const roomId = event.target.dataset.roomId;
    window.location.href = `/chats/${roomId}`;
  };

  const handleRoomDelete = async (event) => {
    const roomId = event.target.dataset.roomId;
    const response = await fetch(`/chats/${roomId}/delete`, {
      method: "GET",
    });
    if (response.status === 200) {
      window.location.href = "/";
    }
  };

  roomJoinBtn.forEach((btn) => {
    btn.addEventListener("click", handleRoomJoin);
  });

  roomDeleteBtn.forEach((btn) => {
    btn.addEventListener("click", handleRoomDelete);
  });
};
