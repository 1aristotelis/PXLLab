import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/">
        <p
          style={{
            margin: "0 auto",
            fontSize: "18px",
            textAlign: "center",
            lineHeight: "20px"
          }}
        >
          Navigate anonymously
        </p>
      </Link>
    </div>
  );
}
