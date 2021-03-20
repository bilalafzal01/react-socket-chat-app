/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useStateValue } from "../../StateProvider";
import closeIcon from "../../icons/closeIcon.png";

import "./Input.css";

const Input = ({ setMessage, sendMessage, sendMessageToAFriend, message }) => {
  const [state, dispatch] = useStateValue();

  const sendMessageHelper = (e) => {
    e.preventDefault();
    console.log(e);
    if (state.friend) {
      sendMessageToAFriend(e);
    } else {
      sendMessage(e);
    }
  };

  return (
    <form className="form">
      {state.friend ? (
        <div className="formInfo">
          <div>Sending to: {state.friend.name}</div>
          <button
            href="#"
            onClick={() => dispatch({ type: "SET_FRIEND", payload: null })}
          >
            <img src={closeIcon} alt="close icon" />
          </button>
        </div>
      ) : null}
      <div className="formDiv">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessageHelper(event) : null
          }
        />
        <button className="sendButton" onClick={sendMessageHelper}>
          Send
        </button>
      </div>
    </form>
  );
};

export default Input;
