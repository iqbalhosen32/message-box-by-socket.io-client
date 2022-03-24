import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { useState } from "react";
import Chat from './Components/Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h2>Join a Chat</h2>
          <input
            type="text"
            placeholder="Jhon..."
            onChange={(event) => setUserName(event.target.value)} ></input>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => setRoom(event.target.value)} ></input>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )
        : (
          <Chat socket={socket} userName={userName} room={room} />
        )}
    </div>
  );
}

export default App;
