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
  concepts: {},
  conceptList: [],
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

  displayPredictions = (data) => {
    const clarifaiConcept = data.rawData.outputs[0].data.concepts[0];
    const clarifaiConcept1 = data.rawData.outputs[0].data.concepts[1];
    const clarifaiConcept2 = data.rawData.outputs[0].data.concepts[2];
    const clarifaiConcept3 = data.rawData.outputs[0].data.concepts[3];
    const clarifaiConcept4 = data.rawData.outputs[0].data.concepts[4];
    const clarifaiConcept5 = data.rawData.outputs[0].data.concepts[5];
    const clarifaiConcept6 = data.rawData.outputs[0].data.concepts[6];
    const clarifaiConcept7 = data.rawData.outputs[0].data.concepts[7];
    const clarifaiConcept8 = data.rawData.outputs[0].data.concepts[8];
    const clarifaiConcept9 = data.rawData.outputs[0].data.concepts[9];
    return {
      conceptName: clarifaiConcept.name,
      conceptValue: clarifaiConcept.value,
      conceptName1: clarifaiConcept1.name,
      conceptValue1: clarifaiConcept1.value,
      conceptName2: clarifaiConcept2.name,
      conceptValue2: clarifaiConcept2.value,
      conceptName3: clarifaiConcept3.name,
      conceptValue3: clarifaiConcept3.value,
      conceptName4: clarifaiConcept4.name,
      conceptValue4: clarifaiConcept4.value,
      conceptName5: clarifaiConcept5.name,
      conceptValue5: clarifaiConcept5.value,
      conceptName6: clarifaiConcept6.name,
      conceptValue6: clarifaiConcept6.value,
      conceptName7: clarifaiConcept7.name,
      conceptValue7: clarifaiConcept7.value,
      conceptName8: clarifaiConcept8.name,
      conceptValue8: clarifaiConcept8.value,
      conceptName9: clarifaiConcept9.name,
      conceptValue9: clarifaiConcept9.value,
    };
  };

  displayPredictionList = (data) => {
    const clarifaiConceptList = data.outputs[0].data.concepts;
    return {
      conceptList: clarifaiConceptList,
    };
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

  displayConcepts = (concepts) => {
    this.setState({ concepts: concepts });
  };
  displayConceptList = (conceptList) => {
    this.setState({ conceptList: conceptList });
  };
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // !now this two function work???: onClickThumb, onImageSubmit -> save to new file?!
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
        this.displayConcepts(this.displayPredictions(response));
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
  //       // this.displayFaceBox(this.calculateFaceLocation(response));
  //     })
  //     .catch((err) => console.log(err));
  // };

  // !now this two function work???: onClickThumb, onImageSubmit -> save to new file?!
  onClickThumb = (event) => {
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

        // !Old version of the prediction
        {
          /* app.models
      .predict(
        "Clarifai.GENERAL_MODEL",
        "https://www.clarifai.com/hs-fs/hubfs/adorable-animal-blur-686094.jpg?width=600&name=adorable-animal-blur-686094.jpg"
      )
      .then(function (response) {
        console.log("hi", response);
      }); */
        }

        // !!!Version if we send post request to the deployed api:
        {
          /* fetch("https://image-detect-application.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => { */
        }
        if (response) {
          fetch("https://image-detect-application.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.log);
        }
        this.displayConcepts(this.displayPredictions(response));
      })
      .catch((err) => console.log(err));
  };

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

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { isSignedIn, imageUrl, route, box, concepts, conceptList } =
      this.state;
    // const particlesInit = (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // };

    // const particlesLoaded = (container) => {};
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <h1 className="title">AI Detection Image Analysis Application</h1>
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
              concepts={concepts}
              conceptList={conceptList}
              imageUrl={imageUrl}
            />
            <div className="prediction">
              {this.state.predictions.map((item) => (
                <p>
                  Ennyire biztos, hogy:{item.value} ezen a képen látható a
                  következő:{item.name}
                </p>
              ))}
              <div className="absolute mt2"></div>
            </div>
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
