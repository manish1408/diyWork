import React from "react";
import { useStateValue } from "../../utils/StateProvider";
import db from "../../utils/firebase";

export default function CommentComponent({
  profilePic,
  username,
  timestamp,
  comment,
  id,
  uid,
  email,
}) {
  const [{ user }, dispatch] = useStateValue();
  const deleteComment = () => {
    db.collection(uid)
      .doc(id)
      .delete()
      .then(() => {
        alert("Comment Deleted");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
  };
  return (
    <>
      <li className="comment-item">
        <img src={profilePic} alt="Profile Picture" />
        <div className="content">
          <ul className="info list-inline">
            <li>{username}</li>
            <li className="dot" />
            <li>{new Date(timestamp?.toDate()).toLocaleString()}</li>
          </ul>
          <p>{comment}</p>
          {user != null && email === user.email ? (
            <div>
              {" "}
              <button
                style={{ border: "0px" }}
                onClick={(e) =>
                  window.confirm("Are you sure you want to delete comment?") &&
                  deleteComment()
                }
                className="link"
              >
                Delete
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </li>
    </>
  );
}
