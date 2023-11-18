import "./App.scss";
import { Component, useState } from "react";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/image-link-form/ImageLinkForm";
import Rank from "./components/rank/Rank";
import Particles from "react-tsparticles";
import SignIn from "./components/sign-in/SignIn";
import Register from "./components/register/Register";
import ImageDetector from "./components/image-detector/ImageDetector";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  concepts: {},
  conceptList: [],
  route: "signin",
  isSignedIn: false,
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
    const particlesInit = (main) => {
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };

    const particlesLoaded = (container) => {};
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            autoPlay: true,

            backgroundMask: {
              composite: "destination-out",
              cover: {
                color: {
                  value: "#fff",
                },
                opacity: 1,
              },
              enable: false,
            },
            fullScreen: {
              enable: true,
              zIndex: 1,
            },
            detectRetina: true,
            duration: 0,
            fpsLimit: 60,
            interactivity: {
              detectsOn: "window",
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onDiv: {
                  selectors: "#repulse-div",
                  enable: false,
                  mode: "repulse",
                  type: "circle",
                },
                onHover: {
                  enable: true,
                  mode: "connect",
                  parallax: {
                    enable: true,
                    force: 60,
                    smooth: 10,
                  },
                },
                resize: true,
              },
              modes: {
                attract: {
                  distance: 200,
                  duration: 0.4,
                  easing: "ease-out-quad",
                  factor: 1,
                  maxSpeed: 50,
                  speed: 1,
                },
                bounce: {
                  distance: 200,
                },
                bubble: {
                  distance: 400,
                  duration: 2,
                  mix: false,
                  opacity: 0.8,
                  size: 40,
                },
                connect: {
                  distance: 80,
                  links: {
                    opacity: 0.5,
                  },
                  radius: 60,
                },
                grab: {
                  distance: 400,
                  links: {
                    blink: false,
                    consent: false,
                    opacity: 1,
                  },
                },
                light: {
                  area: {
                    gradient: {
                      start: {
                        value: "#ffffff",
                      },
                      stop: {
                        value: "#000000",
                      },
                    },
                    radius: 1000,
                  },
                  shadow: {
                    color: {
                      value: "#000000",
                    },
                    length: 2000,
                  },
                },
                push: {
                  default: true,
                  groups: [],
                  quantity: 4,
                },
                remove: {
                  quantity: 2,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                  factor: 100,
                  speed: 1,
                  maxSpeed: 50,
                  easing: "ease-out-quad",
                },
                slow: {
                  factor: 3,
                  radius: 200,
                },
                trail: {
                  delay: 1,
                  pauseOnStop: false,
                  quantity: 1,
                },
              },
            },
            manualParticles: [],
            motion: {
              disable: false,
              reduce: {
                factor: 4,
                value: true,
              },
            },
            particles: {
              bounce: {
                horizontal: {
                  random: {
                    enable: false,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
                vertical: {
                  random: {
                    enable: false,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
              },
              collisions: {
                bounce: {
                  horizontal: {
                    random: {
                      enable: false,
                      minimumValue: 0.1,
                    },
                    value: 1,
                  },
                  vertical: {
                    random: {
                      enable: false,
                      minimumValue: 0.1,
                    },
                    value: 1,
                  },
                },
                enable: false,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              color: {
                value: "random",
                animation: {
                  h: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    sync: true,
                  },
                  s: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    sync: true,
                  },
                  l: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    sync: true,
                  },
                },
              },
              destroy: {
                mode: "none",
                split: {
                  count: 1,
                  factor: {
                    random: {
                      enable: false,
                      minimumValue: 0,
                    },
                    value: 3,
                  },
                  rate: {
                    random: {
                      enable: false,
                      minimumValue: 0,
                    },
                    value: {
                      min: 4,
                      max: 9,
                    },
                  },
                  sizeOffset: true,
                },
              },
              gradient: [],
              groups: {},
              life: {
                count: 0,
                delay: {
                  random: {
                    enable: false,
                    minimumValue: 0,
                  },
                  value: 0,
                  sync: false,
                },
                duration: {
                  random: {
                    enable: false,
                    minimumValue: 0.0001,
                  },
                  value: 0,
                  sync: false,
                },
              },
              links: {
                blink: false,
                color: {
                  value: "#ffffff",
                },
                consent: false,
                distance: 150,
                enable: false,
                frequency: 1,
                opacity: 0.4,
                shadow: {
                  blur: 5,
                  color: {
                    value: "#00ff00",
                  },
                  enable: false,
                },
                triangles: {
                  enable: false,
                  frequency: 1,
                },
                width: 1,
                warp: false,
              },
              move: {
                angle: {
                  offset: 0,
                  value: 90,
                },
                attract: {
                  distance: 200,
                  enable: false,
                  rotate: {
                    x: 600,
                    y: 1200,
                  },
                },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                  acceleration: 9.81,
                  enable: false,
                  inverse: false,
                  maxSpeed: 50,
                },
                path: {
                  clamp: true,
                  delay: {
                    random: {
                      enable: false,
                      minimumValue: 0,
                    },
                    value: 0,
                  },
                  enable: false,
                  options: {},
                },
                outModes: {
                  default: "out",
                  bottom: "out",
                  left: "out",
                  right: "out",
                  top: "out",
                },
                random: false,
                size: false,
                speed: 2,
                spin: {
                  acceleration: 0,
                  enable: false,
                },
                straight: false,
                trail: {
                  enable: false,
                  length: 10,
                  fillColor: {
                    value: "#000000",
                  },
                },
                vibrate: false,
                warp: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                  factor: 1000,
                },
                limit: 500,
                value: 30,
              },
              opacity: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 0.5,
                animation: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  sync: false,
                  destroy: "none",
                  startValue: "random",
                  minimumValue: 0.1,
                },
              },
              orbit: {
                animation: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  sync: false,
                },
                enable: false,
                opacity: 1,
                rotation: {
                  random: {
                    enable: false,
                    minimumValue: 0,
                  },
                  value: 45,
                },
                width: 1,
              },
              reduceDuplicates: false,
              repulse: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1,
              },
              roll: {
                darken: {
                  enable: false,
                  value: 0,
                },
                enable: false,
                enlighten: {
                  enable: false,
                  value: 0,
                },
                mode: "vertical",
                speed: 2,
              },
              rotate: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  sync: false,
                },
                direction: "clockwise",
                path: false,
              },
              shadow: {
                blur: 0,
                color: {
                  value: "#000000",
                },
                enable: false,
                offset: {
                  x: 0,
                  y: 0,
                },
              },
              shape: {
                options: {},
                type: "circle",
              },
              size: {
                random: {
                  enable: true,
                  minimumValue: 10,
                },
                value: {
                  min: 10,
                  max: 15,
                },
                animation: {
                  count: 0,
                  enable: false,
                  speed: 40,
                  sync: false,
                  destroy: "none",
                  startValue: "random",
                  minimumValue: 0.1,
                },
              },
              stroke: {
                width: 0,
              },
              tilt: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  sync: false,
                },
                direction: "clockwise",
                enable: false,
              },
              twinkle: {
                lines: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
                particles: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
              wobble: {
                distance: 5,
                enable: false,
                speed: 50,
              },
              zIndex: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
            },
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
            responsive: [],
            themes: [],
            zLayers: 100,
          }}
        />
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
