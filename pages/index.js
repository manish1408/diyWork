import React, { useEffect, useState } from "react";
import Head from "next/head";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import OwlCarousel from "react-owl-carousel2";

// Project components & functions
import DefaultLayout from "layouts";
import { Header, Footer, PostList, SetupRepo } from "components/home";
import { Client } from "utils/prismicHelpers";
import ReactPaginate from "react-paginate";

/**
 * Homepage component
 */
const Home = ({ doc, posts, slides, pages }) => {
  const [otherPage, setOtherPage] = useState(posts);

  const pagginationHandler = (page) => {
    const pageNumber = page.selected + 1;
    Client()
      .query(Prismic.Predicates.at("document.type", "post"), {
        pageSize: 20,
        page: pageNumber,
      })
      .then((response) => {
        setOtherPage(response.results);
      });
  };

  useEffect(() => {
    // Update the document title using the browser API
    otherPage;
  });

  // console.log(postData);
  if (doc && doc.data) {
    const options = {
      items: 1,
      nav: true,
      rewind: true,
      dots: true,
      dotsEach: true,
      navElement: "button",
      autoplay: false,
      navText: ["", ""],
    };

    return (
      <DefaultLayout>
        <Head>
          <title>{RichText.asText(doc.data.headline)}</title>
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
        <div className="container-fluid mt-80">
          <section className="section carousel-hero">
            <OwlCarousel options={options}>
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="hero d-flex align-items-center  "
                  style={{
                    backgroundImage: "url(" + slide.data.imagelarge.url + ")",
                  }}
                >
                  <div className="row">
                    <div className="col-8 offset-2">
                      <div className="hero-content">
                        {slide.data.categories_field.map((categoryName) => (
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
                        <h2>
                          <a href="">{slide.data.title[0].text} </a>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </section>
        </div>

        <section className="masonry-layout col2-layout mt-30">
          <div className="container-fluid">
            <div className="row">
              <PostList posts={otherPage} />
              {/*pagination*/}

              <div className="col-lg-12">
                <div className="pagination mt--10">
                  <ul className="list-inline">
                    {/* <p>{JSON.stringify(otherPage)}</p> */}
                    <ReactPaginate
                      previousLabel={<i className="arrow_carrot-2left" />}
                      nextLabel={<i className="arrow_carrot-2right" />}
                      breakLabel={<i className="fas fa-exchange-alt"></i>}
                      pageLinkClassName={"page_link"}
                      activeClassName={"active"}
                      pageCount={pages} //page count
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={pagginationHandler}
                    />
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

        <Footer
          logoLight={doc.data.logoLight}
          logoDark={doc.data.logoDark}
          headline={doc.data.headline}
          description={doc.data.description}
        />
      </DefaultLayout>
    );
  }

  // Message when repository has not been setup yet
  return <SetupRepo />;
};

// async function pagginationHandler(page) {
//   const pageNumber = page.selected + 1;
//   console.log(pageNumber);
//   const otherPage =
//     (await Client().query(Prismic.Predicates.at("document.type", "post"), {
//       page: 1,
//     })) || {};

//   return {
//     props: {
//       otherPage,
//     },
//   };
// }

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;
  const client = Client();
  const slideIds = [];

  const doc = (await client.getSingle("blog_home", ref ? { ref } : null)) || {};

  const posts = await client.query(
    Prismic.Predicates.at("document.type", "post"),
    {
      orderings: "[my.post.date desc]",
      pageSize: 20,
      ...(ref ? { ref } : null),
    }
  );

  const pages = posts.total_pages;

  // const doc = (await client.query(Prismic.Predicates.at('document.type', 'post'),
  // { page : 3 })) || {};

  doc.data.slider.map((slide) => slideIds.push(slide.banner_posts.id));

  const slides = (await client.getByIDs(slideIds)) || {};

  return {
    props: {
      slides: slides ? slides.results : [],
      doc,
      pages,
      posts: posts ? posts.results : [],
      preview,
    },
  };
}

export default Home;
