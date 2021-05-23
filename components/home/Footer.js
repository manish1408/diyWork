import React from 'react'
import { RichText } from 'prismic-reactjs'
import { headerStyles } from 'styles'

/**
 * Homepage Footer component
 */
const Footer = ({ image, headline, description }) => {
  return (
    <div>
      <section className="newslettre">
        <div className="container-fluid">
          <div className="newslettre-width text-center">
            <div className="newslettre-info">
              <h5>Subscribe to our Newslatter</h5>
              <p> Sign up for free and be the first to get notified about new posts. </p>
            </div>
            <form action="#" className="newslettre-form">
              <div className="form-flex">
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Your email adress" required="required" />
                </div>
                <button className="submit-btn" type="submit">Subscribe</button>
              </div>
            </form>
            <div className="social-icones">
              <ul className="list-inline">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />Facebook</a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />Twitter </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram" />Instagram </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube" />Youtube</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/*footer*/}
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 text-center">
              <div className="copyright">
                <p>© Copyright 2021
                        <a href="#">AssiaGroupe</a>, All rights reserved.</p>
              </div>
              <div className="back">
                <a href="#" className="back-top">
                  <i className="arrow_up" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
