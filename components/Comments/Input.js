import React from "react";
import { useStateValue } from "../../utils/StateProvider";
import firebase from "firebase";
import db from "../../utils/firebase";
import { useState } from "react";

export default function Input({ uid }) {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);

    db.collection(uid).add({
      comment: input,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
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

        <button
          type="submit"
          onClick={handleSubmit}
          name="submit"
          className="btn-custom"
          style={{ marginTop: "20px" }}
        >
          Post Comment
        </button>

        {/* <span>Success</span> */}
      </form>
    </>
  );
}
