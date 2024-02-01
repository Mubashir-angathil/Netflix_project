import React from "react";

const LoadingComponent = () => {
  return (
    // The container div with Bootstrap classes for centering
    <div
      className="text-white position-absolute top-50 start-50"
      style={{ transform: "translate(-50%,50%)" }}
    >
      Loading...
    </div>
  );
};

export default LoadingComponent;
