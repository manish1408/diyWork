import React from "react";
import { config } from "../config";
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
import CommentBox from "./CommentBox";
const s = (a) => JSON.stringify(a, null, 2);

class CommentsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      message: ''
    };

  }

  componentDidUpdate() { }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <>
        <div className="title">
          <h5>Comments</h5>

        </div>
        <FirestoreProvider {...config} firebase={firebase}>
          <ul className="widget-comments">
            <FirestoreCollection path="comments">
              {d => {
                return (
                  d && d.value &&
                  <>
                    {
                      d.value && d.value.map((res, i) => {
                        return <div key={i}>
                          <CommentBox record={res} currentLikes={res.Likes} />
                        </div>
                      })
                    }
                  </>
                );
              }}
            </FirestoreCollection>
          </ul>
        </FirestoreProvider>


        <FirebaseAuthProvider {...config} firebase={firebase}>
          <div>
            <FirebaseAuthConsumer>
              {({ isSignedIn }) => {
                return (
                  (!isSignedIn) && (
                    <button onClick={() => { const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); firebase.auth().signInWithPopup(googleAuthProvider); }}>
                      Sign In with Google
                    </button>
                  )
                );
              }}
            </FirebaseAuthConsumer>

            <div>
              <IfFirebaseAuthed>
                {(res) => {
                  return <div>
                    <div className="title">
                      <h5>Leave a Reply</h5>
                    </div>
                    <div className="widget-form" id="main_contact_form">
                      <div className="alert alert-success contact_msg" style={{ display: "none" }} role="alert" > Your message was sent successfully. </div>
                      <div className="row">
                        <div className="col-md-12">
                          <img className="avatar" src={res.user.photoURL} alt={res.user.displayName}></img>
                          <div className="form-group">
                            <textarea
                              name="message"
                              id="message"
                              cols={30}
                              rows={3}
                              className="form-control"
                              placeholder="Message*"
                              onChange={this.handleChange.bind(this)}
                              value={this.state.message}
                            />
                            <span className="fs-12px float-right">Posting as {res.user.displayName}</span>
                          </div>
                        </div>


                        <div className="col-12">

                          <FirestoreProvider {...config} firebase={firebase}>
                            <FirestoreMutation type="add" path="/comments">
                              {({ runMutation }) => {
                                return (
                                  <button type="button" className="btn-custom" onClick={() => {
                                    if(this.state.message !== '') {
                                      runMutation({
                                        Comment: this.state.message,
                                        Date: new Date(),
                                        Dislikes: 1,
                                        DisplayName: res.user.displayName,
                                        Likes: 1,
                                        UserEmail: res.user.email,
                                        UserID: res.user.uid,
                                        UserImage: res.user.photoURL
  
                                      }).then(res => {
                                        this.setState({ message: '' });
                                        alert('Your comment was posted.')
                                      });
                                    }
                                   
                                  }} > Post Comment </button>
                                );
                              }}
                            </FirestoreMutation>
                          </FirestoreProvider>

                          <button className="btn btn-link btn-sm float-right" onClick={() => { firebase.auth().signOut(); }}>Sign Out</button>
                        </div>
                      </div>
                    </div>

                  </div>;
                }}
              </IfFirebaseAuthed>

            </div>
          </div>
        </FirebaseAuthProvider>

      </>
    );
  }
}

export default CommentsComponent;
