import React from "react";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import Prismic from "@prismicio/client";
import { Client } from "utils/prismicHelpers";
import PostDate from "./PostDate";
import FirstParagraph from "./FirstParagraph";
import { hrefResolver, linkResolver } from "prismic-configuration";
import { useState, useEffect } from "react";
import db from "../../../utils/firebase";
import firebase from "firebase";
import { useStateValue } from "../../../utils/StateProvider";

/**
 * Post list item component
 */
const PostItem = ({ post }) => {
  const title = RichText.asText(post.data.title)
    ? RichText.asText(post.data.title)
    : "Untitled";

  const [{ user }, dispatch] = useStateValue();
  const [likeData, setLikeData] = useState({});
  const [like, setlike] = useState(true);
  const [likeclass, setLikeclass] = useState("heart post_list_heart");

  useEffect(() => {
    db.collection(post.uid)
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
            if (likedPost.hasOwnProperty(post.uid)) {
              setLikeclass("heart post_list_heart heart_active");
              setlike(!like);
            } else {
              setLikeclass("heart post_list_heart");
            }
          }
        });
    }
  }, [user]);

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
              [post.uid]: true,
            },
            { merge: true }
          );

        db.collection(post.uid).doc("likes").set(
          {
            likes: increment,
          },
          { merge: true }
        );
      } else {
        db.collection("likes")
          .doc(user.email)
          .update({
            [post.uid]: firebase.firestore.FieldValue.delete(),
          });

        db.collection(post.uid).doc("likes").set(
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

  //console.log(authors);

  // const author = authors.filter(function (itm) {
  //   return post.data.author.slug.indexOf(itm.data.slug[0]) > -1;
  // });

  // const author = Object.values(authors).filter((i) =>
  //   post.data.author.slug.includes(i.data.slug[0])
  // );

  // console.log(author);

  //console.log(authors);

  const [author, setAuthor] = useState();

  Client()
    .query(Prismic.Predicates.at("document.id", post.data.author.id))
    .then((response) => {
      setAuthor(response.results);
    });

  //console.log(post.data.author.id);

  return (
    // <div className="blog-post">
    //   <NextLink
    //     as={linkResolver(post)}
    //     href={hrefResolver(post)}
    //   >
    //     <a>
    //       <h2>{title}</h2>
    //     </a>
    //   </NextLink>

    //

    // </div> col-lg-4 col-md-6
    <>
      <div className="card">
        {/*Post-1*/}
        <div className="post-card post-full">
          <div className="post-card-image">
            <Link as={linkResolver(post)} href={hrefResolver(post)}>
              <a>
                <img
                  src={post.data.imagepreview.url}
                  alt={post.data.imagepreview.alt}
                />
              </a>
            </Link>
          </div>
          <div className="post-card-content">
            {post.data.categories_field.map((categoryName) => (
              <a
                key={categoryName.category.id}
                className="categorie"
                style={{ color: "white" }}
              >
                {categoryName.category.slug !== "-"
                  ? categoryName.category.slug
                  : "Uncategorized"}
              </a>
            ))}
            <h5>
              <Link as={linkResolver(post)} href={hrefResolver(post)}>
                <a>{title}</a>
              </Link>
            </h5>
            <p>
              <FirstParagraph sliceZone={post.data.body} textLimit={300} />
            </p>
            <div className="post-card-info">
              <ul className="list-inline">
                {author ? (
                  <>
                    <li>
                      <a>
                        <img
                          src={author[0].data.author_image.url}
                          alt={author[0].data.author_name[0].text}
                        />
                      </a>
                    </li>
                    <li>
                      <a>{author[0].data.author_name[0].text}</a>
                    </li>
                  </>
                ) : (
                  ""
                )}

                <li className="dot" />
                <li>
                  <PostDate date={post.data.date} />
                </li>
                <div
                  onClick={user ? handleSubmit : alertMessage}
                  className={likeclass}
                ></div>
                <span className="post_list_heart">
                  {likeData === null ? "0" : likeData.likes}
                </span>
              </ul>
            </div>
          </div>
        </div>
        {/*/*/}
      </div>
    </>
  );
};

export default PostItem;
