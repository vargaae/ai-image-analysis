import "./App.scss";
import { Component, useState } from "react";
// import Clarifai from 'clarifai';
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/image-link-form/ImageLinkForm";
import Rank from "./components/Rank/Rank";
// import Particles from "react-tsparticles";
import SignIn from "./components/sign-in/SignIn";
import Register from "./components/Register/Register";
import ImageDetector from "./components/image-detector/ImageDetector";
import { images } from "./data";

// ! Clarifai API Call is changed - so the OLD version with Clarifai dependency is deprecated:
// const app = new Clarifai.App({
//   apiKey: '17b97a408b7949eea81ff850e5434b78'
//  });
// ! Clarifai API Call NEW version:
const returnClarifaiRequestOptions = (imageUrl) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // In this section, we set the user authentication, user and app ID, model details, and the URL
  // of the image we want as an input. Change these strings to run your own example.
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "336fc315524844bb80df40f0cf385824";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "vargaae";
  const APP_ID = "test-application-1589318146";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "general-image-recognition";
  const IMAGE_URL = imageUrl; ////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  predictions: [],
  // !Change route from "home" to route: "signin", - if we need sign in form:
  // route: "signin",
  route: "home",
  isSignedIn: true,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // !now this function work: onImageSubmit -> save to new file?!
  onImageSubmit = () => {
    console.log("hi");
    this.setState({ input: event.target.value });
    this.setState({ imageUrl: this.state.input });

    fetch(
      // "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      "https://api.clarifai.com/v2/models/" +
        "general-image-recognition" +
        "/outputs",
      returnClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("hi", response);
        this.setState(
          () => {
            return { predictions: response.outputs[0].data.concepts };
          },
          () => {
            console.log(this.state);
          }
        );
        //   .then((data) =>
        //   this.setState(
        //     () => {
        //       return { images: data };
        //     },
        //     () => {
        //       console.log(this.state);
        //     }
        //   )
        // );

        //  if (response) {
        //   fetch("https://image-detect-application.herokuapp.com/image", {
        //     method: "put",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       id: this.state.user.id,
        //     }),
        //   })
        //     .then((response) => response.json())
        //     .then((count) => {
        //       this.setState(Object.assign(this.state.user, { entries: count }));
        //     })
        //     .catch((err) => console.log);
        // }
        // this.displayConcepts(this.displayPredictions(response));
      })
      .catch((err) => console.log(err));
  };
  // onImageSubmit = () => {
  //   this.setState({ imageUrl: this.state.input });
  //   fetch("https://image-detect-application.herokuapp.com/imageurl", {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       input: this.state.input,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response) {
  //         fetch("https://image-detect-application.herokuapp.com/image", {
  //           method: "put",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             id: this.state.user.id,
  //           }),
  //         })
  //           .then((response) => response.json())
  //           .then((count) => {
  //             this.setState(Object.assign(this.state.user, { entries: count }));
  //           })
  //           .catch((err) => console.log);
  //       }
  //       this.displayConcepts(this.displayPredictions(response));
  //     })
  //     .catch((err) => console.log(err));
  // };

  // !I put this here for example to make it working locally:
  // !!! Clean if it's no more necessary:
  // onButtonSubmit = () => {
  // this.setState({imageUrl: this.state.input});

  // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
  // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
  // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
  // If that isn't working, then that means you will have to wait until their servers are back up.

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  // fetch(
  //   "https://api.clarifai.com/v2/models/" +
  //     MODEL_ID +
  //     "/versions/" +
  //     MODEL_VERSION_ID +
  //     "/outputs",
  //   requestOptions
  // )
  //   .then((response) => response.json())
  //   .then((result) => console.log(result))
  // .then(response => {
  //   console.log('hi', response)
  // if (response) {
  //   fetch('http://localhost:3000/image', {
  //     method: 'put',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       id: this.state.user.id
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(count => {
  //       this.setState(Object.assign(this.state.user, { entries: count}))
  //     })

  // }
  // this.displayFaceBox(this.calculateFaceLocation(response))
  //     .catch((error) => console.log("error", error));
  // };

  onClickThumb = (img) => {
    console.log("click to the thumb", this.state);
    this.setState({ input: img });
    this.setState({ imageUrl: img });
    console.log("STATEChange", this.state);
    fetch(
      // "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      "https://api.clarifai.com/v2/models/" +
        "general-image-recognition" +
        "/outputs",
      returnClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState(
          () => {
            return { predictions: response.outputs[0].data.concepts };
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { isSignedIn, imageUrl, route, box, predictions } = this.state;
    // const particlesInit = (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // };

    // const particlesLoaded = (container) => {};
    return (
      <div className="App">
        {/* <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
    /> */}
        {route === "home" ? (
          <div>
            <h1 className="title">AI Detection Image Analysis Application</h1>
            <div className="p center">
              {images.map((img) => (
                <div
                  className="thumb-container"
                  key={img.id}
                  onClick={() =>
                    this.onClickThumb(`${img.img}`)
                  }
                >
                  <a target={img.img} rel="noreferrer">
                    <div className="thumbnail">
                      <div className="thumbnail__container">
                        <div
                          className="thumbnail__img"
                          style={{
                            backgroundImage: `url(${img.img})`,
                          }}
                        >
                          <div className="thumbnail__content">
                            <h1 className="thumbnail__caption">{img.title}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
              <div className="absolute mt2"></div>
            </div>
            <div className="mobile-off">
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
            </div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <ImageDetector
              onClickThumb={this.onClickThumb}
              predictions={predictions}
              imageUrl={imageUrl}
            />
            {/* <FaceRecognition box={box} imageUrl={imageUrl} /> */}
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
