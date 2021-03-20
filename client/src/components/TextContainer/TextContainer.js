import React from "react";
import queryString from "query-string";
import onlineIcon from "../../icons/onlineIcon.png";
import { useStateValue } from "../../StateProvider";

import "./TextContainer.css";

const TextContainer = ({ users, location }) => {
  const [state, dispatch] = useStateValue();

  const sendUserMsg = (e) => {
    const { name, room } = queryString.parse(location.search);
    if (e.name !== name) {
      dispatch({
        type: "SET_FRIEND",
        payload: e,
      });
    }
  };

  console.log(users);

  return (
    <div className="textContainer">
      <div>
        <h1>
          Bilol Chat App{" "}
          <span role="img" aria-label="emoji">
            💬
          </span>
        </h1>
        <h2>
          Distributed Computing - Lab 2{" "}
          <span role="img" aria-label="emoji">
            ❤️
          </span>
        </h2>
        <h2>
          Try it out right now!{" "}
          <span role="img" aria-label="emoji">
            ⬅️
          </span>
        </h2>
      </div>
      {users ? (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            <h2>
              {users.map((user) => (
                <div
                  key={user.name}
                  className="activeItem"
                  onClick={() => sendUserMsg(user)}
                >
                  {user.name}
                  <img alt="Online Icon" src={onlineIcon} />
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TextContainer;
