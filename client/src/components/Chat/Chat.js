/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";

import "./Chat.css";
import { TextContainer, Messages, InfoBar, Input } from "../index";
import { useStateValue } from "../../StateProvider";
const ENDPOINT = "http://localhost:5000/";

let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    document.title = `BilolChatApp - User: ${name}`;

    socket.emit("join", { name, room }, (err) => {
      if (err) {
        alert(err);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const sendMessageToAFriend = (e) => {
    e.preventDefault();

    if (message && state.friend.id) {
      socket.emit(
        "sendMessageToUser",
        {
          friend: state.friend.id,
          message: message,
        },
        () => {
          setMessage("");
          dispatch({
            type: "SET_FRIEND",
            payload: null,
          });
        }
      );
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          sendMessageToAFriend={sendMessageToAFriend}
        />
      </div>
      <TextContainer users={users} location={location} />
    </div>
  );
}

export default Chat;
