import React from "react";
import Link from "next/link";
import { RichText } from "prismic-reactjs";

import PostDate from "./PostDate";
import FirstParagraph from "./FirstParagraph";
import { hrefResolver, linkResolver } from "prismic-configuration";

/**
 * Post list item component
 */
const PostItem = ({ post }) => {
  const title = RichText.asText(post.data.title)
    ? RichText.asText(post.data.title)
    : "Untitled";

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

    // </div>
    <div className="col-lg-4 col-md-6">
      {/*Post-1*/}
      <div className="post-card">
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
          <a href={hrefResolver(post)} className="categorie">
            Livestyle
          </a>
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
              <li>
                <a href="author.html">
                  <img
                    src={post.data.authorimage.url}
                    alt={post.data.authorimage.url.alt}
                  />
                </a>
              </li>
              <li>
                <a href="author.html">{post.data.authorname[0].text}</a>
              </li>
              <li className="dot" />
              <li>
                <PostDate date={post.data.date} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*/*/}
    </div>
  );
};

export default PostItem;
