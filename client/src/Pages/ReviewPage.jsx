import React from "react";
import Reviews from "../components/Reviews";

function ReviewPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        marginTop: "-350px",
        marginBottom: "-100px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          marginTop: "-400px",
          marginBottom: "-10px",
        }}
      >
        <Reviews />
      </div>
    </div>
  );
}

export default ReviewPage;
