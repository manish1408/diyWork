import React from "react";
import Caption from "./Caption";

/**
 * Full width image component
 */
const FullWidthImage = ({ slice }) => {
  const imageUrl = slice.primary.image.url;
  const caption = slice.primary.caption;
  const imageAlt = slice.primary.image.alt;

  return (
    <div className="image">
      <img src={imageUrl} alt={imageAlt} />
      <Caption caption={caption} />
    </div>
  );
};

export default FullWidthImage;
