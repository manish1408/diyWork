import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseAuthedAnd
} from "@react-firebase/auth";

import "firebase/firestore";
import {
    FirestoreCollection,
    FirestoreMutation,
    FirestoreProvider
} from "@react-firebase/firestore";
import { config } from "../config";

const CommentBox = ({ record, currentLikes}) => {
    return (
        <li className="comment-item">
            <img src={record.UserImage} alt="image" />
            <div className="content">
                <ul className="info list-inline">
                    <li>{record.DisplayName}</li>
                    <li className="dot" />
                    <li> {new Date(record.Date.seconds * 1000).toDateString()}</li>
                </ul>
                <p>
                    {record.Comment}
                </p>
                <div>
                    {/* <FirestoreProvider {...config} firebase={firebase}>
                        <FirestoreMutation type="set" path="/comments/1">
                            {({ runMutation }) => {
                                return (
                                    <button onClick={() => {
                                        runMutation({
                                            Likes: record.Likes++
                                        }).then(res => {
                                            console.log("Liked ", res);
                                        });
                                    }} className="btn link">{currentLikes} Likes</button>
                                );
                            }}
                        </FirestoreMutation>
                    </FirestoreProvider> */}


                </div>
            </div>
        </li>
    )
}

export default CommentBox



