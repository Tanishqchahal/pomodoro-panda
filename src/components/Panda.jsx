import React from "react";
import "../styles/panda.css";
function Panda() {
  return (
    <>
      <div className="panda">
        <div className="head">
          <div className="eye left"></div>
          <div className="eye right"></div>
          <div className="nose"></div>
        </div>
        <div className="ears"></div>
        <div className="hand left"></div>
        <div className="hand right"></div>
      </div>
    </>
  );
}

export default Panda;
