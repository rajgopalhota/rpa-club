import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="pagenf-body">
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className="terminal">
        <h1>
          Error <span className="errorcode">404</span>
        </h1>
        <p className="output">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className="output">
          Please try to <Link to="/activities">go back</Link> or{" "}
          <Link to="/">return to the homepage</Link>.
        </p>
        <p className="output">Good luck.</p>
      </div>
    </div>
  );
}
