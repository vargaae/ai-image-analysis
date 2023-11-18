import React from "react";
import "./navigation.css";
// import image from "../../img/logo.svg";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="n">
        {/* <img src={image} className="App-logo" alt="logo" /> */}
        <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav className="n">
        <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
};

export default Navigation;
