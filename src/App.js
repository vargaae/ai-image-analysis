import "./App.css";
// import "./App.scss";
import { Component, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/image-link-form/ImageLinkForm";
import Rank from "./components/Rank/Rank";
// import Particles from "react-tsparticles";
import SignIn from "./components/sign-in/SignIn";
import Register from "./components/Register/Register";
import ImageDetector from "./components/image-detector/ImageDetector";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  concepts: {},
  conceptList: [],
  route: "signin",
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

  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://image-detect-application.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
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
        // this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onClickThumb = (event) => {
    this.setState({ input: event.target.value });
    this.setState({ imageUrl: this.state.input });
    fetch("https://image-detect-application.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
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
      {/*   {route === "home" ? ( */}
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
            {/* <FaceRecognition box={box} imageUrl={imageUrl} /> */}
          </div>
      {/*   ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )} */}
      </div>
    );
  }
}

export default App;
