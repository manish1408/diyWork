import React from "react";
import { useStateValue } from "../../utils/StateProvider";
import firebase from "firebase";
import db from "../../utils/firebase";
import { useState, useEffect } from "react";

export default function Input({ uid }) {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [commentBtn, setCommentBtn] = useState(
    "Comment As " + user.displayName
  );
  const [btnDisable, setBtnDisable] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      db.collection(uid).add({
        comment: input,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        profilePic: user.photoURL,
        username: user.displayName,
        email: user.email,
      });
      setCommentBtn("Comment Posted");
      setBtnDisable(true);
      setInput("");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCommentBtn("Comment As " + user.displayName);
      setBtnDisable(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [btnDisable]);
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
          className={
            btnDisable ? "btn-custom btn-custom_clicked " : "btn-custom"
          }
          style={{ marginTop: "20px" }}
          disabled={btnDisable}
        >
          {commentBtn}
        </button>

        {/* <span>Success</span> */}
      </form>
    </>
  );
}
