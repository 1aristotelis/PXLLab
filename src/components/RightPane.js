import React, { useState } from "react";

import SearchBox from "./SearchBox";

export default function RightPane() {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div
      style={{
        top: "0px",
        flex: "1 1 0px",
        height: "100vh",
        position: "sticky",
        maxWidth: "380px",
        minWidth: "300px"
      }}
    >
      <div
        style={{
          top: "0px",
          zIndex: 1000,
          position: "sticky",
          padding: "16px",
          marginBottom: "8px"
        }}
      >
        {window.location.pathname !== "/search/" && <SearchBox />}
      </div>
      <div
        style={{
          borderRadius: "6px",
          marginBottom: "24px",
          backgroundColor: "#F5F5F5"
        }}
      >
        <span style={{ height: "508px", width: "319px" }} />
      </div>
      <div
        style={{
          borderRadius: "6px",
          marginBottom: "24px",
          backgroundColor: "#F5F5F5"
        }}
      >
        <span style={{ height: "319px", width: "319px" }} />
      </div>
    </div>
  );
}
