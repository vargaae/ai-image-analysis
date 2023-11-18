import React from "react";
import "./logo.scss";
import Tilt from "react-parallax-tilt";
import image from "../../img/logo.svg";

const Logo = () => {
  return (
    <div className="t ma4 mt0">
      {/* <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px', height: '100px'}} alt='logo' src={image}/>
        </div>
      </Tilt> */}
      <Tilt
        style={{ height: 120, width: 120 }}
        className="parallax-effect-img br2 shadow-2"
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        perspective={800}
        transitionSpeed={1500}
        scale={1.1}
        gyroscope={true}
      >
        <img src={image} className="inner-element" alt="logo" />
      </Tilt>
    </div>
  );
};

export default Logo;
