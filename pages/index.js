import React from "react";
import Head from "next/head";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import OwlCarousel from "react-owl-carousel2";

// Project components & functions
import DefaultLayout from "layouts";
import { Header, Footer, PostList, SetupRepo } from "components/home";
import { Client } from "utils/prismicHelpers";

/**
 * Homepage component
 */
const Home = ({ doc, posts, slides }) => {
  console.log(slides);
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
                    <div className="col-8 offset-4">
                      <div className="hero-content">
                        <a href="" className="categorie">
                          travel
                        </a>
                        <h2>
                          <a href="">{slide.data.title[0].text} </a>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div
              className="hero d-flex align-items-center "
              style={{ backgroundImage: 'url("./img/hero/1.jpg")' }}
            >
              <div className="row">
                <div className="col-8 offset-4">
                  <div className="hero-content text-center">
                    <a href="" className="categorie">
                      travel
                    </a>
                    <h2>
                      <a href="">
                        10 Best and Most Beautiful Places to Visit in Italy{" "}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="hero d-flex align-items-center "
              style={{ backgroundImage: 'url("./img/hero/2.jpg")' }}
            >
              <div className="row">
                <div className="col-8 offset-4">
                  <div className="hero-content">
                    <a href="" className="categorie">
                      travel
                    </a>
                    <h2>
                      <a href="">
                        10 Best and Most Beautiful Places to Visit in Italy{" "}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div> */}
            </OwlCarousel>
          </section>
        </div>

        <PostList posts={posts} />
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

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();
  const slideIds = [];

  const doc = (await client.getSingle("blog_home", ref ? { ref } : null)) || {};

  const posts = await client.query(
    Prismic.Predicates.at("document.type", "post"),
    {
      orderings: "[my.post.date desc]",
      ...(ref ? { ref } : null),
    }
  );

  doc.data.slider.map((slide) => slideIds.push(slide.banner_posts.id));

  const slides = (await client.getByIDs(slideIds)) || {};

  return {
    props: {
      slides: slides ? slides.results : [],
      doc,
      posts: posts ? posts.results : [],
      preview,
    },
  };
}

export default Home;
