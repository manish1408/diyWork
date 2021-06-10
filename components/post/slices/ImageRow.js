import React from "react";

function ImageRow({ slice }) {
  //   const columnRow = "col-md-" + (12 / slice.items.length).toString();
  return (
    <div className="row">
      {slice.items.map((image, key) => (
        <div key={key} className="col-md-4">
          <div className="image">
            <img src={image.image.url} alt={image.image.alt} />
          </div>
        </div>
      ))}{" "}
    </div>
  );
}

export default ImageRow;
