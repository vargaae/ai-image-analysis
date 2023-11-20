import React from "react";
import "./card.scss";

const Card = ({ img, link, title }) => {
  return (
    <>
      <div className="thumb-container">
        <a target={img} rel="noreferrer">
          <div className="thumbnail">
            <div className="thumbnail__container">
              <div
                className="thumbnail__img"
                style={{
                  backgroundImage: `url(${img})`,
                }}
              >
                <div className="thumbnail__content">
                  <h1 className="thumbnail__caption">{title}</h1>
                  {/* <button onClick={(img, e) => this.onClickThumb(img, e)}>
                    onClickThumb
              </button> */}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Card;
