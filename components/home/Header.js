import React from 'react'
import { RichText } from 'prismic-reactjs'
import { headerStyles } from 'styles'
import OwlCarousel from 'react-owl-carousel2';
/**
 * Homepage header component
 */
const Header = ({ logoLight, logoDark, headline, description }) => {
  const options = {
    items: 1,
    nav: true,
    rewind: true,
    dots: true,
    dotsEach: true,
    navElement: 'button',
    autoplay: false,
    navText: ["", ""]
  };
  
  return (
    // <div className="home">
    //   <div className="blog-avatar" style={{ backgroundImage: `url()` }} />
    //   <h1 className="blog-title">{RichText.asText(headline)}</h1>
    //   <p className="blog-description">{RichText.asText(description)}</p>
    // </div>
    
    
    <div>
      <style jsx global>{headerStyles}</style>
      <div className="loading">
        <div className="circle" /> 
      </div>

      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <div className="logo">
            <a href="index.html">
              <img src={logoDark.url} alt={RichText.asText(headline)} className="logo-dark" />
              <img src={logoLight.url} alt={RichText.asText(headline)} className="logo-white" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav ml-auto mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" href="index.html" data-toggle="dropdown"> Home </a>
                <ul className="dropdown-menu fade-up">
                  <li>
                    <a className="dropdown-item" href="index.html">Demo 1</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="index-2.html">Demo 2 </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="index-3.html">Demo 3 </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="index-4.html">Demo 4 </a>
                  </li>
                  <li>
                    <a className="dropdown-item active" href="index-5.html">Demo 5</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="index-6.html">Demo 6 </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link  dropdown-toggle" href="blog-grid.html" data-toggle="dropdown"> Blog </a>
                <ul className="dropdown-menu fade-up">
                  <li>
                    <a className="dropdown-item" href="blog-grid.html"> Blog grid</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="blog-masonry.html"> Blog masonry </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="blog-list.html"> Blog list </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link  dropdown-toggle" href="post-default.html" data-toggle="dropdown"> Posts Features </a>
                <ul className="dropdown-menu fade-up">
                  <li>
                    <a className="dropdown-item" href="post-default.html"> post default</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="post-video.html"> post video</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="post-audio.html"> post audio</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="post-gallery.html"> post gallery</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="post-no-sidebar.html"> post no sidebar </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="post-left-sidebar.html"> post left sidebar </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link  dropdown-toggle" href="#" data-toggle="dropdown">Pages </a>
                <ul className="dropdown-menu fade-up">
                  <li>
                    <a className="dropdown-item" href="about.html"> About </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="author.html"> author </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="login.html"> Login </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="register.html"> Sign up </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="page404.html"> Page 404 </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html"> Contact </a>
              </li>
            </ul>
          </div>
          {/*/*/}
          {/*navbar-right*/}
          <div className="navbar-right ml-auto">
            {/* <div className="theme-switch-wrapper">
              <label className="theme-switch" htmlFor="checkbox">
                <input type="checkbox" id="checkbox" />
                <div className="slider round" />
              </label>
            </div> */}
            <div className="social-icones">
              <ul className="list-inline">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="search-icon">
              <i className="icon_search" />
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-80">

        <section className="section carousel-hero">
          <OwlCarousel options={options} >
            <div className="hero d-flex align-items-center " style={{ backgroundImage: 'url("./img/hero/1.jpg")' }}>
              <div className="row">
                <div className="col-8 offset-4">
                  <div className="hero-content text-center">
                    <a href="" className="categorie">travel</a>
                    <h2>
                      <a href="">10 Best and Most Beautiful Places to Visit in Italy </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero d-flex align-items-center " style={{ backgroundImage: 'url("./img/hero/2.jpg")' }}>
              <div className="row">
                <div className="col-8 offset-4">
                  <div className="hero-content">
                    <a href="" className="categorie">travel</a>
                    <h2>
                      <a href="">10 Best and Most Beautiful Places to Visit in Italy </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero d-flex align-items-center " style={{ backgroundImage: 'url("./img/hero/3.jpg")' }}>
              <div className="row">
                <div className="col-8 offset-4">
                  <div className="hero-content">
                    <a href="" className="categorie">travel</a>
                    <h2>
                      <a href="">10 Best and Most Beautiful Places to Visit in Italy </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </section>

      </div>

      <div className="search">
        <div className="container-fluid">
          <div className="search-width  text-center">
            <button type="button" className="close">
              <i className="icon_close" />
            </button>
            <form className="search-form" action="#">
              <input type="search" defaultValue placeholder="What are you looking for?" />
              <button type="submit" className="search-btn">search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
