import React from "react";
import "./card.scss";

const Card = ({ img, link, code, title, stack, info1, info2, info3, info4, onClickThumb }) => {
    return (
<>
      <div className="thumb-container">
        <a target={img} rel="noreferrer">
          <div className="thumbnail">
            <div className="thumbnail__container">
              <div className="thumbnail__img">
                <div className="thumbnail__content">
                  <h1 className="thumbnail__caption">Live Demo Application</h1>
                  {/* <button onClick={(e) => this.onClickThumb(img, e)}>onClickThumb</button> */}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
    );
}

export default Card;