import * as React from "react";

function SvgLoader(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
      <circle
        fill="none"
        stroke="#fff"
        strokeWidth={4}
        cx={50}
        cy={50}
        r={44}
        opacity={0.5}
      />
      <circle fill="#fff" stroke="#808080" strokeWidth={3} cx={8} cy={54} r={6}>
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default SvgLoader;
