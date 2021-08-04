import React from "react";
import { useState } from "react";
import Prismic from "@prismicio/client";
import { Client } from "utils/prismicHelpers";
import { queryUser } from "../utils/queries";

const Search = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setLoading(true);
      Client()
        .query([
          Prismic.Predicates.at("document.type", "post"),
          Prismic.Predicates.fulltext("document", input),
        ])
        .then((res) => {
          setLoading(false);
          if (res.results.length > 0) {
            setResponse(res.results);
          } else {
            setResponse([]);
          }
        });
      setInput("");
      //console.log(response);
    }
  };

  // const document = queryUser();
  // console.log(document);

  return (
    <div>
      <form>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <p>{loading ? "Loading" : ""}</p>
      {response.length ? (
        response.map((item, index) => (
          <li key={index}>{item.data.title[0].text}</li>
        ))
      ) : (
        <p>No Search Result</p>
      )}
    </div>
  );
};

export default Search;
