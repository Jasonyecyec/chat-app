import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";
import { Chat } from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && roomId !== "") {
      socket.emit("join room", roomId);
    }
    setShowChat(true);
  };

  return (
    <>
      {showChat ? (
        <Chat
          socket={socket}
          username={username}
          roomId={roomId}
          setShowChat={setShowChat}
        />
      ) : (
        <div className="join-form">
          <h1>Join a chat</h1>
          <input
            type="text"
            placeholder="Enter room id"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <button className="join-button" onClick={joinRoom}>
            Join room
          </button>
        </div>
      )}
    </>
  );
}

export default App;
