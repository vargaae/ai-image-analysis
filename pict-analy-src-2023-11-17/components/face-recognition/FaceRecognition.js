import React, { useRef, useState } from "react";
import "./face-recognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }
  return (
    <><div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
        <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div><div className="example">
        <p>Image Detection example:</p>
        <div>
          {
            /* Logical shortcut for only displaying the
          button if the copy command exists */
            document.queryCommandSupported("copy") && (
              <div>
                <button onClick={copyToClipboard} className='f4 link ph3 pv2 dib white bg-blue'>Click here to Copy this URL and paste in to the input field</button>
                {copySuccess}
              </div>
            )}
          <form>
            <textarea
              readOnly
              ref={textAreaRef}
              value="https://cdn.pixabay.com/photo/2017/03/27/14/02/beach-2178919_960_720.jpg" />
          </form>
        </div>
        <img
          src="https://cdn.pixabay.com/photo/2017/03/27/14/02/beach-2178919_960_720.jpg"
          alt="image detection example" width='150px' height='auto' />
      </div></>
  );
}

export default FaceRecognition;
