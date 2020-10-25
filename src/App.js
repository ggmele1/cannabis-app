import React, { useState, useEffect } from "react";
import axios from "axios";
import Firebase from "firebase";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  SearchBar,
  Nav,
  Strain,
  Landing,
  AllStrains,
} from "./components/index";
import { FIREBASE_API, STRAIN_API } from "./config/index";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});

const App = () => {
  // STATE HOOKS
  const [strainRace, setStrainRace] = useState("");
  const [strainDesc, setStrainDesc] = useState("");
  const [medical, setMedical] = useState("");
  const [positive, setPositive] = useState("");
  const [negative, setNegative] = useState("");
  const [strainImageName, setStrainImageName] = useState(false);
  const [strainName, setStrainName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageCount, setImageCount] = useState(1);
  const [similarStrainsList, setSimilarStrainsList] = useState("");
  const [isPng, setIsPng] = useState(true);
  const [isJpg, setIsJpg] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [allStrains, setAllStrains] = useState([]);
  const [noStrainError, setNoStrainError] = useState(false);

  if (Firebase.apps.length === 0) {
    Firebase.initializeApp(FIREBASE_API);
  }

  useEffect(() => {
    getAllStrainsData();
  }, []);

  const getAllStrainsData = () => {
    const ref = Firebase.database().ref("/");
    ref.on("value", (snapshot) => {
      const getData = snapshot.val();
      setAllStrains(
        getData.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );
    });
  };

  const getStrainByName = async (strain) => {
    try {
      await axios
        .get(
          `https://strainapi.evanbusse.com/${STRAIN_API}/strains/search/name/${strain}`
        )
        .then(function (response) {
          if (response.data.length < 1) {
            setNoStrainError(!noStrainError);
          } else {
            response.data.forEach((matches) => {
              if (strain.toLowerCase() === matches.name.toLowerCase()) {
                setStrainName(matches.name);
                setStrainRace(matches.race);
                setStrainDesc(matches.desc);
                getStrainDetails(matches.id);
                getSimilarStrains(matches.race);
              }
            });
            setNoStrainError(false);
            setIsPng(true);
            setIsJpg(false);
            setIsDefault(false);
            getStrainImageName(strain);
            setIsSuccess(true);
          }
        });
    } catch (error) {}
  };

  const getStrainDetails = async (strain) => {
    try {
      await axios
        .get(
          `https://strainapi.evanbusse.com/${STRAIN_API}/strains/data/effects/${strain}`
        )
        .then(function (response) {
          const { medical, positive, negative } = response.data;
          getEffectsData(medical, positive, negative);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Very Ugly, research better way to map non array data for react components.
  const getEffectsData = (medical, positive, negative) => {
    const medicalEffects = [];
    const positiveEffects = [];
    const negativeEffects = [];
    Object.entries(medical).map(([key, value]) => medicalEffects.push(value));
    setMedical(medicalEffects);
    Object.entries(positive).map(([key, value]) => positiveEffects.push(value));
    setPositive(positiveEffects);
    Object.entries(negative).map(([key, value]) => negativeEffects.push(value));
    setNegative(negativeEffects);
  };

  // set correct name format to retrieve image link.
  const getStrainImageName = (data) => {
    let name = data.replace(/\s/g, "-").toLowerCase();
    setStrainImageName(name);
  };

  const getSimilarStrains = (race) => {
    const similarStrain = allStrains.filter((item) => {
      return item.race === race;
    });
    const similarStrainsArray = [];
    for (var i = 0; i < 6; i++) {
      similarStrainsArray.push(
        similarStrain[Math.floor(Math.random() * similarStrain.length - 1 + 1)]
      );
    }
    setSimilarStrainsList(similarStrainsArray);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav
          setIsSuccess={setIsSuccess}
          setStrainName={setStrainName}
          setNoStrainError={setNoStrainError}
        />

        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>

          <Route path="/search">
            <SearchBar
              getStrainByName={getStrainByName}
              allStrains={allStrains}
              noStrainError={noStrainError}
            />
          </Route>

          <Route path="/strain">
            <Strain
              name={strainName}
              strainRace={strainRace}
              description={strainDesc}
              medical={medical}
              positive={positive}
              negative={negative}
              imageName={strainImageName}
              setIsSuccess={setIsSuccess}
              isSuccess={isSuccess}
              setStrainName={setStrainName}
              getStrainByName={getStrainByName}
              imageCount={imageCount}
              setImageCount={setImageCount}
              setIsPng={setIsPng}
              setIsJpg={setIsJpg}
              setIsDefault={setIsDefault}
              isPng={isPng}
              isJpg={isJpg}
              isDefault={isDefault}
              similarStrainsList={similarStrainsList}
              allStrains={allStrains}
            />
          </Route>

          <Route path="/browse">
            <AllStrains
              allStrains={allStrains}
              setAllStrains={setAllStrains}
              getAllStrainsData={getAllStrainsData}
              getStrainByName={getStrainByName}
              setStrainName={setStrainName}
              setNoStrainError={setNoStrainError}
              setIsSuccess={setIsSuccess}
            />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};
export default App;
