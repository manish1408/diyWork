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
import { hrefResolverCat, linkResolverCat } from "../../prismic-configuration";
// import CommentsComponent from "../../components/CommentsComponent";
import Comments from "../../components/Comments";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Category from "../categories";

/**
 * Post page component
 */

const Post = ({ post, doc, postList, recentPosts, categories, uid }) => {
  // console.log(post);
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
                          <a href="author.html">
                            <img src={post.data.authorimage.url} alt="Image" />
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
                        <li className="blog_heart_counter">
                          <span>4</span>
                        </li>
                        <li className="blog_heart">
                          <div className="heart"></div>
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
                        {post.tags.length !== 0 ? (
                          post.tags.map((tag, key) => <li key={key}>{tag}</li>)
                        ) : (
                          <></>
                        )}
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
    (await Client().getByUID("post", params.uid, ref ? { ref } : null)) || {};

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
      orderings: "[my.post.date]",
      ...(ref ? { ref } : null),
    })) || {};

  return {
    props: {
      uid,
      preview,
      post,
      postList,
      doc,
      categories,
      recentPosts,
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
