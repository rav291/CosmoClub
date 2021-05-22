import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Spinner
        variant="info"
        animation="grow"
        role="status"
        style={{
          margin: "auto",
          width: "10px",
          height: "10px",
          display: "block",
        }}
      >
        <span className="sr-only">Loading</span>
      </Spinner>
      <Spinner
        variant="info"
        animation="grow"
        role="status"
        style={{
          margin: "auto",
          width: "10px",
          height: "10px",
          display: "block",
        }}
      >
        <span className="sr-only">Loading</span>
      </Spinner>
      <Spinner
        variant="info"
        animation="grow"
        role="status"
        style={{
          margin: "auto",
          width: "10px",
          height: "10px",
          display: "block",
        }}
      >
        <span className="sr-only">Loading</span>
      </Spinner>
    </>
  );
};

Loader.defaultProps = {
  variant: "info",
};

export default Loader;
