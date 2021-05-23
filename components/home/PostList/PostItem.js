import React from 'react'
import { default as NextLink } from 'next/link'
import { RichText } from 'prismic-reactjs'

import PostDate from './PostDate'
import FirstParagraph from './FirstParagraph'
import { hrefResolver, linkResolver } from 'prismic-configuration'

/**
 * Post list item component
 */
const PostItem = ({ post }) => {
  const title = RichText.asText(post.data.title) ? RichText.asText(post.data.title) : 'Untitled'

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
          <a href={hrefResolver(post)}>
            <img src="./img/blog/25.jpg" alt="" />
          </a>
        </div>
        <div className="post-card-content">
          <a href={hrefResolver(post)} className="categorie">Livestyle</a>
          <h5>
            <a href={hrefResolver(post)}>{title}</a>
          </h5>
          <p>
            <FirstParagraph
              sliceZone={post.data.body}
              textLimit={300}
            />
          </p>
          <div className="post-card-info">
            <ul className="list-inline">
              <li>
                <a href="author.html">
                  <img src="./img/author/1.jpg" alt="" />
                </a>
              </li>
              <li>
                <a href="author.html">David Smith</a>
              </li>
              <li className="dot" />
              <li><PostDate date={post.data.date} /></li>
            </ul>
          </div>
        </div>
      </div>
      {/*/*/}
    </div>
  )
}

export default PostItem
