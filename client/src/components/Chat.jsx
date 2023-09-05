import React, { useEffect, useState, useMemo } from "react";

export const Chat = ({ socket, username, roomId, setShowChat }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message === "") return;

    const messageData = {
      room: roomId,
      author: username,
      message: message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
  };

  const changeRoom = () => {
    // socket.emit("disconnect");
    setShowChat(false);
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(data);
      console.log("messageList:", messageList);
    });
  }, [socket]);

  return (
    <div className="border-2 w-96">
      <button onClick={changeRoom} className="bg-red-400">
        Leave room
      </button>
      <div className="bg-blue-300">
        Live chat
        <p>Room {roomId}</p>
      </div>

      <div className=" ">
        {messageList.map((list, index) => (
          <div
            key={index}
            className={`flex ${
              username === list.author ? "flex-row-reverse" : ""
            }`}
          >
            <div>
              <p
                className={`${
                  username === list.author ? "bg-green-400" : "bg-gray-200"
                } p-2 rounded-md m-2`}
              >
                {list.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <input
          type="text"
          placeholder="Send message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          onClick={sendMessage}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
};
