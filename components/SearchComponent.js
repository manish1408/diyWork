import Prismic from "@prismicio/client";
import React from "react";
import Link from "next/link";
// import { Link } from "prismic-reactjs";
import { hrefResolver, linkResolver } from "prismic-configuration";
import SvgLoader from "./Loader";

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
      button: false,
      addClass: false,
    };
  }

  componentDidUpdate() {}

  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    if (!query) {
      this.setState({ query, result: {}, message: "" });
    } else {
      // this.setState( {query: query} ) normal way
      //ES6 way
      this.setState({ query, loading: true, message: "" }, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  fetchSearchResults = (query) => {
    const apiEndpoint = "https://diywork.prismic.io/api/v2";
    const api = Prismic.client(apiEndpoint);
    api
      .query([
        Prismic.Predicates.at("document.type", "post"),
        Prismic.Predicates.fulltext("document", query),
      ])
      .then((data) => {
        const resultNotFoundMsg = !data.results.length
          ? "No Search Result"
          : "";
        this.setState({
          results: data.results,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          message: "Failed to load request",
        });
      });
  };

  renderSearchResults = () => {
    const { results } = this.state;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="search-results ">
          {results.map((result) => {
            // console.log(result);
            return (
              <div key={result.id}>
                <Link as={linkResolver(result)} href={hrefResolver(result)}>
                  <a target="_blank" className="result-items">
                    <h6 className="image-username">
                      {result.data.title[0].text}
                    </h6>
                    <div className="image-wrapper">
                      <img
                        className="image img-search-result"
                        src={result.data.imagepreview.url}
                        alt="image"
                      />
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { query, message, loading, results, addClass } = this.state;

    let boxClass = ["search"];
    if (addClass) {
      boxClass.push("search-open");
    }
    return (
      <>
        <div className={boxClass.join(" ")}>
          <div className="container-fluid">
            <div className="search-width  text-center">
              <button
                type="button"
                className="close"
                onClick={this.toggle.bind(this)}
              >
                <i className="icon_close" />
              </button>
              <form className="search-form" action="#">
                <input
                  className="search-field"
                  name="query"
                  type="text"
                  onChange={this.handleOnInputChange}
                  value={this.state.query}
                  id="search-input"
                  placeholder="What are you looking for?"
                />
                <button
                  type="submit"
                  className="search-btn"
                  onClick={this.handleOnSubmit}
                >
                  {loading ? "" : "Search"}
                  <div
                    className={`search-loading ${loading ? "show" : "hide"}`}
                  >
                    <SvgLoader />
                  </div>
                </button>
              </form>
              {message && <p className="result-items">{message}</p>}
            </div>
            {this.renderSearchResults()}
          </div>
        </div>
      </>
    );
  }
}
// $(".close").on("click", function () {
//   $(".search").removeClass("search-open");
// });

export default SearchComponent;
