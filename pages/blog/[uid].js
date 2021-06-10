import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";

import { queryRepeatableDocuments } from "utils/queries";

// Project components
import DefaultLayout from "layouts";
import { BackButton, SliceZone } from "components/post";

// Project functions & styles
import { Client } from "utils/prismicHelpers";
import { postStyles } from "styles";
import PostDate from "../../components/home/PostList/PostDate";
import { Header, Footer } from "components/home";

/**
 * Post page component
 */
const Post = ({ post, doc }) => {
  if (post && post.data) {
    const hasTitle = RichText.asText(post.data.title).length !== 0;
    const title = hasTitle ? RichText.asText(post.data.title) : "Untitled";

    console.log(post);

    function getId(url) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    }

    const videoId = getId(post.data.video_url.embed_url);

    return (
      <DefaultLayout>
        <Head>
          <title>{title}</title>
        </Head>

        <Header
          logoDark={doc.data.logodark}
          headline={doc.data.headline}
          description={doc.data.description}
        />

        <section className="section pt-55 ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 mb-20">
                {/*Post-single*/}
                <div className="post-single">
                  <div className="post-single-video">
                    <iframe
                      src={"https://www.youtube.com/embed/" + videoId}
                      allowFullScreen
                    />
                  </div>
                  <div className="post-single-content">
                    <a href="blog-grid.html" className="categorie">
                      travel
                    </a>

                    <h4>{post.data.title[0].text}</h4>

                    <div className="post-single-info">
                      <ul className="list-inline">
                        <li>
                          <a href="author.html">
                            <img src={post.data.authorimage.url} alt />
                          </a>
                        </li>
                        <li>
                          <a href="author.html">
                            {post.data.authorname[0].text}
                          </a>{" "}
                        </li>
                        <li className="dot" />
                        <li>
                          <PostDate date={post.data.date} />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="post-single-body">
                    <SliceZone sliceZone={post.data.body} />
                  </div>
                  <div className="post-single-footer">
                    {/* <div className="tags">
                      <ul className="list-inline">
                        <li>
                          <a href="blog-grid.html">Travel</a>
                        </li>
                        <li>
                          <a href="blog-grid.html">Nature</a>
                        </li>
                        <li>
                          <a href="blog-grid.html">tips</a>
                        </li>
                        <li>
                          <a href="blog-grid.html">forest</a>
                        </li>
                        <li>
                          <a href="blog-grid.html">beach</a>
                        </li>
                      </ul>
                    </div> */}
                    <div className="social-media">
                      <ul className="list-inline">
                        <li>
                          <a href="#" className="color-facebook">
                            <i className="fab fa-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-instagram">
                            <i className="fab fa-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-twitter">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-youtube">
                            <i className="fab fa-youtube" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-pinterest">
                            <i className="fab fa-pinterest" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>{" "}
                {/*/*/}
                {/*next & previous-posts*/}
                <div className="row">
                  <div className="col-md-6">
                    <div className="widget">
                      <div className="widget-next-post">
                        <div className="small-post">
                          <div className="image">
                            <a href="post-default.html">
                              <img src="assets/img/latest/1.jpg" alt="..." />
                            </a>
                          </div>
                          <div className="content">
                            <div>
                              <a className="link" href="post-default.html">
                                <i className="arrow_left" />
                                Preview post
                              </a>
                            </div>
                            <a href="post-default.html">
                              7 Healty Dinner Recipes for a Date Night at Home
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="widget">
                      <div className="widget-previous-post">
                        <div className="small-post">
                          <div className="image">
                            <a href="post-default.html">
                              <img src="assets/img/blog/2.jpg" alt="..." />
                            </a>
                          </div>
                          <div className="content">
                            <div>
                              <a className="link" href="post-default.html">
                                <span> Next post</span>
                                <span className="arrow_right" />
                              </a>
                            </div>
                            <a href="post-default.html">
                              How to Choose Outfits for Work for woman and men
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*/*/}
                {/*widget-comments*/}
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Repellendus at doloremque adipisci eum placeat
                          quod non fugiat aliquid sit similique!
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Repellendus at doloremque adipisci eum placeat
                          quod non fugiat aliquid sit similique!
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Repellendus at doloremque adipisci eum placeat
                          quod non fugiat aliquid sit similique!
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
                      Your email adress will not be published ,Requied fileds
                      are marked*.
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
                            save my name , email and website in this browser for
                            the next time I comment.
                          </span>
                        </label>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          name="submit"
                          className="btn-custom"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 max-width">
                {/*widget-author*/}
                <div className="widget">
                  <div className="widget-author">
                    <a href="author.html" className="image">
                      <img src="assets/img/author/1.jpg" alt />
                    </a>
                    <h6>
                      <span>Hi, I'm David Smith</span>
                    </h6>
                    <p>
                      I'm David Smith, husband and father , I love
                      Photography,travel and nature. I'm working as a writer and
                      blogger with experience of 5 years until now.
                    </p>
                    <div className="social-media">
                      <ul className="list-inline">
                        <li>
                          <a href="#" className="color-facebook">
                            <i className="fab fa-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-instagram">
                            <i className="fab fa-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-twitter">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-youtube">
                            <i className="fab fa-youtube" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-pinterest">
                            <i className="fab fa-pinterest" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*/*/}
                {/*widget-latest-posts*/}
                <div className="widget ">
                  <div className="section-title">
                    <h5>Latest Posts</h5>
                  </div>
                  <ul className="widget-latest-posts">
                    <li className="last-post">
                      <div className="image">
                        <a href="post-default.html">
                          <img src="assets/img/latest/1.jpg" alt="..." />
                        </a>
                      </div>
                      <div className="nb">1</div>
                      <div className="content">
                        <p>
                          <a href="post-default.html">
                            5 Things I Wish I Knew Before Traveling to Malaysia
                          </a>
                        </p>
                        <small>
                          <span className="icon_clock_alt" /> January 15, 2021
                        </small>
                      </div>
                    </li>
                    <li className="last-post">
                      <div className="image">
                        <a href="post-default.html">
                          <img src="assets/img/latest/2.jpg" alt="..." />
                        </a>
                      </div>
                      <div className="nb">2</div>
                      <div className="content">
                        <p>
                          <a href="post-default.html">
                            Everything you need to know about visiting the
                            Amazon.
                          </a>
                        </p>
                        <small>
                          <span className="icon_clock_alt" /> January 15, 2021
                        </small>
                      </div>
                    </li>
                    <li className="last-post">
                      <div className="image">
                        <a href="post-default.html">
                          <img src="assets/img/latest/3.jpg" alt="..." />
                        </a>
                      </div>
                      <div className="nb">3</div>
                      <div className="content">
                        <p>
                          <a href="post-default.html">
                            How to spend interesting vacation after hard work?
                          </a>
                        </p>
                        <small>
                          <span className="icon_clock_alt" /> January 15, 2021
                        </small>
                      </div>
                    </li>
                    <li className="last-post">
                      <div className="image">
                        <a href="post-default.html">
                          <img src="assets/img/latest/4.jpg" alt="..." />
                        </a>
                      </div>
                      <div className="nb">4</div>
                      <div className="content">
                        <p>
                          <a href="post-default.html">
                            10 Best and Most Beautiful Places to Visit in Italy
                          </a>
                        </p>
                        <small>
                          <span className="icon_clock_alt" /> January 15, 2021
                        </small>
                      </div>
                    </li>
                  </ul>
                </div>
                {/*/*/}
                {/*widget-categories*/}
                <div className="widget">
                  <div className="section-title">
                    <h5>Categories</h5>
                  </div>
                  <ul className="widget-categories">
                    <li>
                      <a href="#" className="categorie">
                        Livestyle
                      </a>
                      <span className="ml-auto">22 Posts</span>
                    </li>
                    <li>
                      <a href="#" className="categorie">
                        Travel
                      </a>
                      <span className="ml-auto">18 Posts</span>
                    </li>
                    <li>
                      <a href="#" className="categorie">
                        Food
                      </a>
                      <span className="ml-auto">14 Posts</span>
                    </li>
                    <li>
                      <a href="#" className="categorie">
                        fashion
                      </a>
                      <span className="ml-auto">10 Posts</span>
                    </li>
                  </ul>
                </div>
                {/*/*/}
                {/*widget-instagram*/}
                <div className="widget">
                  <div className="section-title">
                    <h5>Instagram</h5>
                  </div>
                  <ul className="widget-instagram">
                    <li>
                      <a className="image" href="#">
                        <img src="assets/img/instagram/1.jpg" alt />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="assets/img/instagram/2.jpg" alt />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="assets/img/instagram/3.jpg" alt />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="assets/img/instagram/4.jpg" alt />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="assets/img/instagram/5.jpg" alt />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="assets/img/instagram/6.jpg" alt />
                      </a>
                    </li>
                  </ul>
                </div>
                {/*/*/}
                {/*widget-tags*/}
                <div className="widget">
                  <div className="section-title">
                    <h5>Tags</h5>
                  </div>
                  <div className="widget-tags">
                    <ul className="list-inline">
                      <li>
                        <a href="blog-grid.html">Travel</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">Nature</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">tips</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">forest</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">beach</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">fashion</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">livestyle</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">healty</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">food</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">breakfast</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*/*/}
              </div>
            </div>
          </div>
        </section>

        {/* <div className="main">
          <div className="outer-container">
            <BackButton />
            <h1>{title}</h1>
          </div>
          <SliceZone sliceZone={post.data.body} />
        </div>
        <style jsx global>
          {postStyles}
        </style> */}
        <Footer />
      </DefaultLayout>
    );
  }

  return null;
};

export async function getStaticProps({
  params,
  preview = null,
  previewData = {},
}) {
  const { ref } = previewData;
  const doc =
    (await Client().getSingle("blog_home", ref ? { ref } : null)) || {};
  const post =
    (await Client().getByUID("post", params.uid, ref ? { ref } : null)) || {};
  return {
    props: {
      preview,
      post,
      doc,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "post"
  );
  return {
    paths: documents.map((doc) => `/blog/${doc.uid}`),
    fallback: true,
  };
}

export default Post;
