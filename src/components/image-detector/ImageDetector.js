import React from "react";
import "./image-detector.scss";
import Card from "./Card";
import { images } from "../../data";

const ImageDetector = ({ imageUrl, predictions, onClickThumb }) => {
  return (
    <>
      For instance:
      <p> {images[0].img}</p>
      <div className="i center">
        <div className="p-devtools">
          <div className="p-dev-tools">
            <div className="details">
              <div className="console">Clarifai API</div>
              <h2>Top20 keywords for a photographer</h2>
              <table id="customers">
                <tbody>
                  <tr>
                    <th>PROBABILITY</th>
                    <th>PREDICTED CONCEPT</th>
                  </tr>
                  {predictions?.length ? (
                    predictions?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span>{">"} </span>
                          {Math.round(item.value * 100)}%
                        </td>
                        <td className="prediction">{item.name}</td>
                      </tr>
                    ))
                  ) : (
                    <div className="warning red" key={predictions?.length}>
                      Paste an URL of the image that you want to analyse
                    </div>
                  )}
                </tbody>
              </table>
            </div>
            <div className="image-concepts">
              <a href={imageUrl} target="blank">
                {" "}
                <img
                  id="inputimage"
                  className="p-img"
                  alt={imageUrl}
                  src={imageUrl}
                />{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    {/*  <div className="p center">
        {images.map((img) => (
          <Card
            key={img.id}
            img={img.img}
            title={img.title}
            onClick={onClickThumb}
          />
        ))}
        <div className="absolute mt2"></div>
        </div> */}
    </>
  );
};

export default ImageDetector;
