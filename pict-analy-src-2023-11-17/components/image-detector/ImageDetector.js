import React from "react";
import "./image-detector.scss";
import Card from "./Card";
import { images } from "../../data";

const ImageDetector = ({ imageUrl, conceptList, concepts, onClickThumb }) => {
  return (
    <>
      For instance:
      <p> {images[0].img}</p>
      <div className="i center">
        <div className="p-devtools">
          <div className="p-dev-tools">
            <div className="details">
              <div className="console">Clarifai API</div>
              <h2>General Model - Top10 keywords</h2>
              <table id="customers">
                <tr>
                  <th>PREDICTED CONCEPT</th>
                  <th>PROBABILITY</th>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 1. </span> {concepts.conceptName}
                  </td>
                  <td>{concepts.conceptValue}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 2. </span> {concepts.conceptName1}
                  </td>
                  <td>{concepts.conceptValue1}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 3. </span> {concepts.conceptName2}
                  </td>
                  <td>{concepts.conceptValue2}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 4. </span> {concepts.conceptName3}
                  </td>
                  <td>{concepts.conceptValue3}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 5. </span> {concepts.conceptName4}
                  </td>
                  <td>{concepts.conceptValue4}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 6. </span> {concepts.conceptName5}
                  </td>
                  <td>{concepts.conceptValue5}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 7. </span> {concepts.conceptName6}
                  </td>
                  <td>{concepts.conceptValue6}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 8. </span> {concepts.conceptName7}
                  </td>
                  <td>{concepts.conceptValue7}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 9. </span> {concepts.conceptName8}
                  </td>
                  <td>{concepts.conceptValue8}</td>
                </tr>
                <tr>
                  <td>
                    <span>{">"} 10. </span> {concepts.conceptName9}
                  </td>
                  <td>{concepts.conceptValue9}</td>
                </tr>
              </table>
            </div>
            <div className="image-concepts">
              <img id="inputimage" className="p-img" alt="" src={imageUrl} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p center">
        {images.map((item) => (
          <Card
            key={item.id}
            img={item.img}
            onClick={onClickThumb}
          />
        ))}
        <div className="absolute mt2"></div>
      </div> */}
    </>
  );
};

export default ImageDetector;
