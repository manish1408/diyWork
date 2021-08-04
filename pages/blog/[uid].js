import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import Prismic from "@prismicio/client";
import { hrefResolver, linkResolver } from "prismic-configuration";

import { queryRepeatableDocuments } from "utils/queries";

// Project components
import DefaultLayout from "layouts";
import { BackButton, SliceZone } from "components/post";

// Project functions & styles
import { Client } from "utils/prismicHelpers";
import { postStyles } from "styles";
import PostDate from "../../components/home/PostList/PostDate";
import { Header, Footer } from "components/home";
import Link from "next/link";
import {
  hrefResolverAuthor,
  hrefResolverCat,
  linkResolverAuthor,
  linkResolverCat,
} from "../../prismic-configuration";
// import CommentsComponent from "../../components/CommentsComponent";
import Comments from "../../components/Comments";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useStateValue } from "../../utils/StateProvider";
import db from "../../utils/firebase";
import firebase from "firebase";

// import Category from "../categories";

/**
 * Post page component
 */

const Post = ({
  post,
  doc,
  postList,
  recentPosts,
  categories,
  uid,
  authors,
}) => {
  //console.log(post);
  if (post && post.data) {
    const hasTitle = RichText.asText(post.data.title).length !== 0;
    const title = hasTitle ? RichText.asText(post.data.title) : "Untitled";

    function getId(url) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    }

    const videoId = getId(post.data.video_url.embed_url);

    const router = useRouter();

    const [updateduid, setUpdateduid] = useState(uid);
    useEffect(() => {
      setUpdateduid(router.asPath.split("/").pop());
    }, [router.asPath]);

    const [{ user }, dispatch] = useStateValue();
    const [likeData, setLikeData] = useState({});
    const [like, setlike] = useState(true);
    const [likeclass, setLikeclass] = useState("heart");

    useEffect(() => {
      db.collection(updateduid)
        .doc("likes")
        .onSnapshot((doc) => {
          if (doc.data()) {
            setLikeData(doc.data());
          } else {
            setLikeData({});
          }
        });
    }, []);

    useEffect(() => {
      if (user) {
        db.collection("likes")
          .doc(user.email)
          .onSnapshot((doc) => {
            if (doc.data()) {
              const likedPost = doc.data();
              if (likedPost.hasOwnProperty(updateduid)) {
                setLikeclass("heart heart_active");
                setlike(!like);
              } else {
                setLikeclass("heart");
              }
            }
          });
      }
    }, [updateduid]);

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const handleSubmit = (e) => {
      e.preventDefault();

      if (user) {
        setlike(!like);
        if (like) {
          db.collection("likes")
            .doc(user.email)
            .set(
              {
                [updateduid]: user.displayName,
              },
              { merge: true }
            );

          db.collection(updateduid).doc("likes").set(
            {
              likes: increment,
            },
            { merge: true }
          );
        } else {
          db.collection("likes")
            .doc(user.email)
            .update({
              [updateduid]: firebase.firestore.FieldValue.delete(),
            });

          db.collection(updateduid).doc("likes").set(
            {
              likes: decrement,
            },
            { merge: true }
          );
        }
      } else {
        alert("You must sign in");
      }
    };

    const alertMessage = () => {
      alert("Please sign in first");
    };

    //console.log(post);
    return (
      <DefaultLayout>
        <Head>
          <title>{title}</title>
          <meta
            name="title"
            content="DIY Projects, Science experiments, and Ideas for makers"
          />
          <meta
            name="description"
            content="Thousands of free DIY projects, science experiments, and Ideas for Makers on DIY diywork.net"
          />
          <meta
            name="keywords"
            content="free science projects,  DIY projects, DIY Ideas, science experiments"
          />
          <meta name="robots" content="index, follow" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English"></meta>
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
                    {post.data.categories_field.map((categoryName) => (
                      <a
                        key={categoryName.category.id}
                        className="categorie"
                        style={{ color: "white" }}
                      >
                        {categoryName.category.slug}
                      </a>
                    ))}

                    <h4>{post.data.title[0].text}</h4>

                    <div className="post-single-info">
                      <ul className="list-inline">
                        <li>
                          <Link
                            as={linkResolverAuthor(post.data.author)}
                            href={hrefResolverAuthor(post.data.author)}
                          >
                            <a>
                              <img
                                src={post.data.author.data.author_image.url}
                                alt="Image"
                              />
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link
                            as={linkResolverAuthor(post.data.author)}
                            href={hrefResolverAuthor(post.data.author)}
                          >
                            <a>{post.data.author.data.author_name[0].text}</a>
                          </Link>
                        </li>
                        <li className="dot" />
                        <li>
                          <PostDate date={post.data.date} />
                        </li>
                        <>
                          <li className="blog_heart_counter">
                            <span>
                              {likeData === null ? "0" : likeData.likes}
                            </span>
                          </li>
                          <li className="blog_heart">
                            <div
                              onClick={user ? handleSubmit : alertMessage}
                              className={likeclass}
                            ></div>
                          </li>
                        </>
                      </ul>
                    </div>
                  </div>
                  <div className="post-single-body">
                    <SliceZone sliceZone={post.data.body} />
                  </div>
                  <div className="post-single-footer">
                    {/* <ul className="list-inline">
                      <li className="blog_heart_counter">
                        <span>{likeData === null ? "0" : likeData.likes}</span>
                      </li>
                      <li className="blog_heart">
                        <div onClick={handleSubmit} className={likeclass}></div>
                      </li>
                    </ul> */}

                    {/* <div className="social-media">
                      <ul className="list-inline">
                        <li>
                          <a href="#" className="color-facebook">
                            <Facebook url={pageUrl} />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-instagram">
                            <i className="fab fa-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-twitter">
                            <Twitter url={pageUrl} />
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
                    </div> */}
                  </div>
                </div>{" "}
                {/*/*/}
                {/*next & previous-posts*/}
                <div className="row">
                  {postList.results.length !== 0 ? (
                    <div className="col-md-6">
                      <div className="widget">
                        <div className="widget-next-post">
                          <div className="small-post">
                            <div className="image">
                              <Link
                                as={linkResolver(postList.results[0])}
                                href={hrefResolver(postList.results[0])}
                              >
                                <a>
                                  <img
                                    src={
                                      postList.results[0].data.imagepreview.url
                                    }
                                    alt={
                                      postList.results[0].data.imagepreview.alt
                                    }
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="content">
                              <div>
                                <Link
                                  as={linkResolver(postList.results[0])}
                                  href={hrefResolver(postList.results[0])}
                                >
                                  <a className="link">
                                    <i className="arrow_left" />
                                    Preview post
                                  </a>
                                </Link>
                              </div>
                              <Link
                                as={linkResolver(postList.results[0])}
                                href={hrefResolver(postList.results[0])}
                              >
                                <a>{postList.results[0].data.title[0].text}</a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  {postList.results.length !== 0 && postList.results[1] ? (
                    <div className="col-md-6">
                      <div className="widget">
                        <div className="widget-previous-post">
                          <div className="small-post">
                            <div className="image">
                              <Link
                                as={linkResolver(postList.results[1])}
                                href={hrefResolver(postList.results[1])}
                              >
                                <a>
                                  <img
                                    src={
                                      postList.results[1].data.imagepreview.url
                                    }
                                    alt={
                                      postList.results[1].data.imagepreview.alt
                                    }
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="content">
                              <div>
                                <Link
                                  as={linkResolver(postList.results[1])}
                                  href={hrefResolver(postList.results[1])}
                                >
                                  <a className="link">
                                    <span> Next post</span>
                                    <span className="arrow_right" />
                                  </a>
                                </Link>
                              </div>
                              <Link
                                as={linkResolver(postList.results[1])}
                                href={hrefResolver(postList.results[1])}
                              >
                                <a>{postList.results[1].data.title[0].text}</a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {/*/*/}
                {/*widget-comments*/}
                {/* <div className="widget mb-50"> */}
                {uid != updateduid ? (
                  <Comments uid={updateduid} />
                ) : (
                  <Comments uid={uid} />
                )}
                {/* </div> */}
              </div>
              <div className="col-lg-4 max-width">
                {/*widget-latest-posts*/}
                <div className="widget ">
                  <div className="section-title">
                    <h5>Latest Updates</h5>
                  </div>
                  <ul className="widget-latest-posts">
                    {recentPosts.results.map((recentPost) => (
                      <li key={recentPost.id} className="last-post">
                        <div className="image">
                          <Link
                            as={linkResolver(recentPost)}
                            href={hrefResolver(recentPost)}
                          >
                            <a>
                              <img
                                src={recentPost.data.imagepreview.url}
                                alt={recentPost.data.imagepreview.alt}
                              />
                            </a>
                          </Link>
                        </div>
                        {/* <div className="nb">1</div> */}
                        <div className="content">
                          <p>
                            <Link
                              as={linkResolver(recentPost)}
                              href={hrefResolver(recentPost)}
                            >
                              <a>{recentPost.data.title[0].text}</a>
                            </Link>
                          </p>
                          <small>
                            <span className="icon_clock_alt" />{" "}
                            <PostDate date={recentPost.data.date} />
                          </small>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/*/*/}
                {/*widget-categories*/}
                <div className="widget">
                  <div className="section-title">
                    <h5>Categories</h5>
                  </div>
                  <ul className="widget-categories">
                    {categories.results.map((category) => (
                      <li key={category.id}>
                        <Link
                          as={linkResolverCat(category)}
                          href={hrefResolverCat(category)}
                        >
                          <a className="categorie">{category.data.name}</a>
                        </Link>
                        {/* <span className="ml-auto">{category.data.description}</span> */}
                      </li>
                    ))}

                    {/* <li>
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
                    </li> */}
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
                        <img src="../../img/instagram/1.jpg" alt="Images" />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="../../img/instagram/2.jpg" alt="Images" />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="../../img/instagram/3.jpg" alt="Images" />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="../../img/instagram/4.jpg" alt="Images" />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="../../img/instagram/5.jpg" alt="Images" />
                      </a>
                    </li>
                    <li>
                      <a className="image" href="#">
                        <img src="../../img/instagram/6.jpg" alt="Images" />
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
                      {post.tags.length !== 0 ? (
                        post.tags.map((tag, key) => <li key={key}>{tag}</li>)
                      ) : (
                        <></>
                      )}
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
  const uid = params.uid;
  const doc =
    (await Client().getSingle("blog_home", ref ? { ref } : null)) || {};
  const post =
    (await Client().getByUID("post", params.uid, {
      fetchLinks: [
        "authors.author_name",
        "authors.author_image",
        "authors.description",
      ],
    })) || {};

  const recentPosts =
    (await Client().query(Prismic.Predicates.at("document.type", "post"), {
      orderings: "[document.last_publication_date desc]",
      pageSize: 5,
    })) || {};

  const categories =
    (await Client().query(
      Prismic.Predicates.at("document.type", "category")
    )) || {};

  const postList =
    (await Client().query(Prismic.Predicates.at("document.type", "post"), {
      pageSize: 2,
      after: `${post.id}`,
      orderings: "[my.post.date desc]",
      ...(ref ? { ref } : null),
    })) || {};

  const authors =
    (await Client().query(Prismic.Predicates.at("document.type", "authors"))) ||
    {};

  return {
    props: {
      uid,
      preview,
      post,
      postList,
      doc,
      categories,
      recentPosts,
      authors,
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
