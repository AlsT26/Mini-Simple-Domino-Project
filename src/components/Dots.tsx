import React from "react";
import "../styles.css";

type DotsProps = {
  value: number;
};

const Dots: React.FC<DotsProps> = ({ value }) => {
  const dotPositions: { [key: number]: JSX.Element } = {
    1: <div className="dot center"></div>,
    2: (
      <>
        <div className="dot top-left"></div>
        <div className="dot bottom-right"></div>
      </>
    ),
    3: (
      <>
        <div className="dot top-left"></div>
        <div className="dot center"></div>
        <div className="dot bottom-right"></div>
      </>
    ),
    4: (
      <>
        <div className="dot top-left"></div>
        <div className="dot top-right"></div>
        <div className="dot bottom-left"></div>
        <div className="dot bottom-right"></div>
      </>
    ),
    5: (
      <>
        <div className="dot top-left"></div>
        <div className="dot top-right"></div>
        <div className="dot center"></div>
        <div className="dot bottom-left"></div>
        <div className="dot bottom-right"></div>
      </>
    ),
    6: (
      <>
        <div className="dot top-left"></div>
        <div className="dot top-right"></div>
        <div className="dot middle-left"></div>
        <div className="dot middle-right"></div>
        <div className="dot bottom-left"></div>
        <div className="dot bottom-right"></div>
      </>
    ),
  };

  return <div className="dots">{dotPositions[value] || null}</div>;
};

export default Dots;
