import React, { useEffect, useState } from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";

import { queryRepeatableDocuments, queryCategories } from "utils/queries";
import Link from "next/link";
import { hrefResolver, linkResolver } from "prismic-configuration";

// Project components
import { PostList } from "components/home";
import DefaultLayout from "layouts";
import { BackButton, SliceZone } from "components/post";

// Project functions & styles
import { Client } from "utils/prismicHelpers";
// import { postStyles } from "styles";
import Footer from "../../components/home/Footer";
// import SearchComponent from "../components/SearchComponent";
import Prismic from "@prismicio/client";
import PostDate from "../../components/home/PostList/PostDate";
import Header from "../../components/home/Header";
import ReactPaginate from "react-paginate";
import Router from "next/router";

// import { hrefResolver, linkResolver } from "prismic-configuration";

/**
 * Post page component
 */
const Category = ({ posts, category, data, doc }) => {
  // console.log(data);
  // console.log(category);
  // console.log(posts);
  if (posts) {
    return (
      <DefaultLayout>
        <Head>
          <title>{"Archive - " + category.data.name}</title>
          <meta name="title" content="DIY Projects, Science experiments, and Ideas for makers" />
          <meta name="description" content="Thousands of free DIY projects, science experiments, and Ideas for Makers on DIY diywork.net" />
          <meta name="keywords" content="free science projects,  DIY projects, DIY Ideas, science experiments" />
          <meta name="robots" content="index, follow" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English"></meta>
        </Head>
        <Header
          logoLight={doc.data.logolight}
          logoDark={doc.data.logodark}
          headline={doc.data.headline}
          description={doc.data.description}
        />

        <section className="categorie-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <div className="categorie-title">
                  <small>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                    <span className="arrow_carrot-right" /> Category Archive
                  </small>
                  <h3>
                    Category : <span> {category.data.name}</span>
                  </h3>
                  <p>{category.data.description}</p>
                </div>
                <div className="pagination mt-30 back_button">
                  <ul className="list-inline">
                    <li>
                      <a onClick={() => Router.back()}>
                        <i className="arrow_carrot-2left"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-80">
          <div className="container-fluid">
            <div className="row">
              <PostList posts={posts} />
              {/*pagination*/}

              <div className="col-lg-12">
                <div className="pagination mt--10">
                  <ul className="list-inline">
                    {/* <p>{JSON.stringify(otherPage)}</p> */}
                    {/* <ReactPaginate
                      previousLabel={<i className="arrow_carrot-2left" />}
                      nextLabel={<i className="arrow_carrot-2right" />}
                      breakLabel={<i className="fas fa-exchange-alt"></i>}
                      pageLinkClassName={"page_link"}
                      activeClassName={"active"}
                      pageCount={pages} //page count
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={pagginationHandler}
                    /> */}
                    {/* <li className="active">
                      <a href="#">1</a>
                    </li>
                    <li>
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">4</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="arrow_carrot-2right" />
                      </a>
                    </li> */}
                  </ul>
                </div>
                {/*/*/}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </DefaultLayout>
    );
  }

  // Message when repository has not been setup yet
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

  const category = (await Client().getByUID("category", params.category)) || {};

  const data = params.category;

  const posts =
    (await Client().query([
      Prismic.Predicates.at("document.type", "post"),
      Prismic.Predicates.at("my.post.categories_field.category", category.id),
    ])) || {};

  return {
    props: {
      posts: posts ? posts.results : [],
      category,
      data,
      preview,
      doc,
    },
  };
}

// export async function getStaticProps({
//   params,
//   preview = null,
//   previewData = {},
// }) {
//   const data = params.category;
//   const { ref } = previewData;

//   const category = (await Client().getByID(data)) || {};

//   const posts =
//     (await Client().query([
//       Prismic.Predicates.at("document.type", "post"),
//       Prismic.Predicates.at("my.post.categories_field.category", data),
//     ])) || {};

//   // const posts =
//   //   (await Client().query([
//   //     Prismic.Predicates.at("document.type", "Post"),
//   //     Prismic.Predicates.at("my.Post.categories_field.category", data),
//   //   ])) || {};

//   return {
//     props: {
//       posts: posts ? posts.results : [],
//       category,
//       preview,
//       data,
//     },
//   };
// }

export async function getStaticPaths() {
  const documents = await queryCategories();
  return {
    paths: documents.map((doc) => `/categories/${doc.uid}`),
    fallback: true,
  };
}

export default Category;
