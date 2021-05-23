import React from 'react'
import PostItem from './PostItem'
import { postListStyles } from 'styles'

/**
 * Post list component
 */
const PostList = ({ posts }) => {
  return (
    <section className="mt-80">
      <div className="container-fluid">
        <div className="row">

          {posts.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
          <style jsx global>{postListStyles}</style>
          {/*pagination*/}
          <div className="col-lg-12">
            <div className="pagination mt--10">
              <ul className="list-inline">
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#"><i className="arrow_carrot-2right" /></a></li>
              </ul>
            </div>
            {/*/*/}
          </div>
        </div>
      </div>
    </section>

  )
}

export default PostList
