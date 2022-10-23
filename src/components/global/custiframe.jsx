import React from "react";

function WinIframe({ props }) {
  const { source } = props;

  return (
    <>
      <iframe
        src={source}
        loading="lazy"
        frameBorder="0"
        style={{ width: "100%", height: "100%" }}
      ></iframe>
    </>
  );
}

export default WinIframe;
