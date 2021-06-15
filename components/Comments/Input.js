import React from "react";
import { useStateValue } from "../../utils/StateProvider";
import firebase from "firebase";
import db from "../../utils/firebase";
import { useState } from "react";

export default function Input({ uid }) {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);

    db.collection(uid).add({
      comment: input,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      email: user.email,
    });

    setInput("");
  };
  return (
    <>
      <form className="widget-form">
        <textarea
          name="message"
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          cols={30}
          rows={5}
          className="form-control"
          placeholder="Message*"
          required="required"
          defaultValue={""}
        />
        <img src={user.photoURL} alt="Avatar" class="avatar_icon"></img>
        <button
          type="submit"
          onClick={handleSubmit}
          name="submit"
          className="btn-custom"
          style={{ marginTop: "20px" }}
        >
          {"Comment as " + user.displayName}
        </button>

        {/* <span>Success</span> */}
      </form>
    </>
  );
}
