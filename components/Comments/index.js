import React from "react";

function comments() {
  return (
    <>
      <div className="col-lg-8 mb-20">
        <div className="widget mb-50">
          <div className="title">
            <h5>3 Comments</h5>
          </div>
          <ul className="widget-comments">
            <li className="comment-item">
              <img src="assets/img/user/1.jpg" alt />
              <div className="content">
                <ul className="info list-inline">
                  <li>Mohammed Ali</li>
                  <li className="dot" />
                  <li> January 15, 2021</li>
                </ul>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellendus at doloremque adipisci eum placeat quod non fugiat
                  aliquid sit similique!
                </p>
                <div>
                  <a href="#" className="link">
                    {" "}
                    <i className="arrow_back" /> Reply
                  </a>
                </div>
              </div>
            </li>
            <li className="comment-item">
              <img src="assets/img/author/1.jpg" alt />
              <div className="content">
                <ul className="info list-inline">
                  <li>Simon Albert</li>
                  <li className="dot" />
                  <li> January 15, 2021</li>
                </ul>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellendus at doloremque adipisci eum placeat quod non fugiat
                  aliquid sit similique!
                </p>
                <div>
                  <a href="#" className="link">
                    <i className="arrow_back" /> Reply
                  </a>
                </div>
              </div>
            </li>
            <li className="comment-item">
              <img src="assets/img/user/2.jpg" alt />
              <div className="content">
                <ul className="info list-inline">
                  <li>Adam bobly</li>
                  <li className="dot" />
                  <li> January 15, 2021</li>
                </ul>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellendus at doloremque adipisci eum placeat quod non fugiat
                  aliquid sit similique!
                </p>
                <div>
                  <a href="#" className="link">
                    <i className="arrow_back" /> Reply
                  </a>
                </div>
              </div>
            </li>
          </ul>
          {/*Leave-comments*/}
          <div className="title">
            <h5>Leave a Reply</h5>
          </div>
          <form
            className="widget-form"
            action="#"
            method="POST"
            id="main_contact_form"
          >
            <p>
              Your email adress will not be published ,Requied fileds are
              marked*.
            </p>
            <div
              className="alert alert-success contact_msg"
              style={{ display: "none" }}
              role="alert"
            >
              Your message was sent successfully.
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    cols={30}
                    rows={5}
                    className="form-control"
                    placeholder="Message*"
                    required="required"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Name*"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email*"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-12 mb-20">
                <div className="form-group">
                  <input
                    type="text"
                    name="website"
                    id="website"
                    className="form-control"
                    placeholder="website"
                  />
                </div>
                <label>
                  <input
                    name="name"
                    type="checkbox"
                    defaultValue={1}
                    required="required"
                  />
                  <span>
                    save my name , email and website in this browser for the
                    next time I comment.
                  </span>
                </label>
              </div>
              <div className="col-12">
                <button type="submit" name="submit" className="btn-custom">
                  Post Comment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default comments;
