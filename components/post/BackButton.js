import React from "react";
import { default as NextLink } from "next/link";

/**
 * Post back button component
 */
const BackButton = ({ link }) => (
  <div className="back">
    <div className="pagination mt--10">
      <ul className="list-inline">
        <NextLink href={link}>
          <a>
            <i className="arrow_carrot-2right" />
          </a>
        </NextLink>
      </ul>
    </div>
  </div>
);

export default BackButton;
