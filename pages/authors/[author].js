import Head from "next/head";

// Project components
import { PostList } from "components/home";
import DefaultLayout from "layouts";

import { Client } from "utils/prismicHelpers";

import Footer from "../../components/home/Footer";

import Prismic from "@prismicio/client";
import Header from "../../components/home/Header";
import Router, { useRouter } from "next/router";
import { queryAuthors } from "../../utils/queries";

const Category = ({ posts, author, doc }) => {
  console.log(author);
  // console.log(category);
  console.log(posts);
  const router = useRouter();
  if (posts) {
    return (
      <>
        <Head>
          <title>{"Archive - " + author.data.author_name[0].text}</title>
        </Head>
        <Header
          logoLight={doc.data.logolight}
          logoDark={doc.data.logodark}
          headline={doc.data.headline}
          description={doc.data.description}
        />
        <section className="section author full-space mb-40 pt-55">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                {/*widget-author*/}
                <div className="widget-author inner-width">
                  <a href="author.html" className="image">
                    <img
                      src={author.data.author_image.url}
                      alt={author.data.author_name[0].text}
                    />
                  </a>
                  <h6>
                    <span>{"Hi, I'm " + author.data.author_name[0].text}</span>
                  </h6>
                  <div className="link">{"Posts: " + posts.length}</div>
                  <p>{author.data.description}</p>
                  <div className="pagination back_button author_page_btn">
                    <ul className="list-inline">
                      <li>
                        <a onClick={() => router.back()}>
                          <i className="arrow_carrot-2left"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="social-media">
                    <ul className="list-inline">
                      {/* <li>
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
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="masonry-layout col2-layout mt-30">
          <div className="container-fluid">
            <div className="row">
              <PostList posts={posts} />
            </div>
          </div>
        </section>

        <Footer />
      </>
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

  const author = (await Client().getByUID("authors", params.author)) || {};

  const posts =
    (await Client().query(
      [
        Prismic.Predicates.at("document.type", "post"),
        Prismic.Predicates.at("my.post.author", author.id),
      ],
      {
        orderings: "[my.post.date desc]",
      }
    )) || {};

  return {
    props: {
      author,
      posts: posts ? posts.results : [],
      preview,
      doc,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryAuthors();
  return {
    paths: documents.map((doc) => `/authors/${doc.uid}`),
    fallback: true,
  };
}

export default Category;
