import React, { useEffect, useState } from "react";
import { TextContainer } from "..";
import queryString from "query-string";
import { io } from "socket.io-client";

import "./Main.css";

const ENDPOINT = "http://localhost:5000/";

let socket;

function Main({ location }) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
  }, [location.search]);

  useEffect(() => {
    if (name) {
      socket.emit("signin", { name });
    }
  }, [name]);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log(users);
    });
  }, []);

  return (
    <div className="outerContainer">
      {/* Join a room */}
      <div className="container"></div>
      {/* Click on a user to start chatting with that user */}
      <TextContainer users={users} />
    </div>
  );
}

export default Main;
