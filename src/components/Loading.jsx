import React from "react";
import loading from "../LMloading.png";

const Loading = () => {
  return (
    <div className="loadingHouse">
      <img className="loadingIcon" src={loading} alt="loadingWheel" />
      <br />
      <div>
        WORRY NOT <br />
        <br />
        CONTENT INCOMING
      </div>
    </div>
  );
};

export default Loading;
