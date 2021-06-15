// import React, { Component } from "react";
import { useStateValue } from "../../utils/StateProvider";
import CommentComponent from "./CommentComponent";
import Input from "./Input";
import Login from "./Login";
import db from "../../utils/firebase";
import { useState, useEffect } from "react";

function comments({ uid }) {
  const [{ user }, dispatch] = useStateValue();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    db.collection(uid)
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);
  // console.log(comments);
  return (
    <>
      <div className="row">
        <div className="col-lg-12 mb-20">
          <div className="widget mb-50">
            <div className="title">
              <h5>{comments.length + " Comments"}</h5>
            </div>
            <ul className="widget-comments">
              {comments.map((comment) => (
                <CommentComponent
                  key={comment.id}
                  id={comment.id}
                  uid={uid}
                  email={comment.data.email}
                  profilePic={comment.data.profilePic}
                  username={comment.data.username}
                  timestamp={comment.data.time}
                  comment={comment.data.comment}
                />
              ))}
            </ul>
            {/*Leave-comments*/}
            <div className="title">
              <h5>Leave a Comment</h5>
            </div>
            {!user ? <Login /> : <Input uid={uid} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default comments;
