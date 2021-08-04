import React from "react";
import PostItem from "./PostItem";
import { postListStyles } from "styles";
import ReactPaginate from "react-paginate";

/**
 * Post list component
 */
const PostList = ({ posts, pages }) => {
  // var rows = [];
  // for (var i = 0; i < pages; i++) {
  //   // note: we are adding a key prop here to allow react to uniquely identify each
  //   // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
  //   rows.push(<ObjectRow key={i} />);
  // }
  console.log(posts);
  return (
    <>
      <div className="col-lg-12">
        <div className="card-columns">
          {posts.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostList;
