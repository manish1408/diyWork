import React from "react";

export default function CommentComponent({
  profilePic,
  username,
  timestamp,
  comment,
}) {
  return (
    <>
      <li className="comment-item">
        <img src={profilePic} alt />
        <div className="content">
          <ul className="info list-inline">
            <li>{username}</li>
            <li className="dot" />
            <li>{new Date(timestamp?.toDate()).toLocaleString()}</li>
          </ul>
          <p>{comment}</p>
          {/* <div>
            <a href="#" className="link">
              {" "}
              <i className="arrow_back" /> Reply
            </a>
          </div> */}
        </div>
      </li>
    </>
  );
}
