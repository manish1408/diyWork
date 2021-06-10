import React from "react";
import { RichText } from "prismic-reactjs";
import { quoteStyles } from "styles";

/**
 * Quote slice component
 */
const Quote = ({ slice }) => (
  <div className="quote">
    <div>
      <i className="icon_quotations_alt" />
    </div>
    <p>{RichText.asText(slice.primary.quote)}</p>
  </div>
  // <div className="post-part single container">
  //   <blockquote className="block-quotation">
  //     {RichText.asText(slice.primary.quote)}
  //   </blockquote>
  //   <style jsx global>{quoteStyles}</style>
  // </div>
);

export default Quote;
