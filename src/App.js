import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config";
import Firebase from "firebase";
import SearchBar from "./SearchBar";
import Nav from './Nav';
import Strain from "./Strain";
import Landing from "./Landing"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato',
      'sans-serif',
    ].join(','),
  },});


const App = () => {
  const API_KEY = "EwZa0Jz";

  // STATE HOOKS
  const [strainRace, setStrainRace] = useState("");
  const [strainDesc, setStrainDesc] = useState("");
  const [medical, setMedical] = useState("");
  const [positive, setPositive] = useState("");
  const [negative, setNegative] = useState("");
  const [strainImageName, setStrainImageName] = useState(false);
  const [strainName, setStrainName] = useState("");
  const [filteredSearchData, setFilteredSearchData] = useState();
  const [isAdult, setIsAdult] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageCount, setImageCount] = useState(1);
  const [similarStrainsList, setSimilarStrainsList] = useState('');


  const [isPng, setIsPng] = useState(true);
  const [isJpg, setIsJpg] = useState(false);
  const [isDefault, setIsDefault] = useState(false)

  if (Firebase.apps.length === 0) {
    Firebase.initializeApp(config);
  }

  useEffect(() => {
    const ref = Firebase.database().ref("/");
    ref.on("value", (snapshot) => {
      const DB_NAMES = [];
      const getNameData = snapshot.val();
      getNameData.forEach((strain) => {
        DB_NAMES.push({ name: strain });
      });
      setFilteredSearchData(DB_NAMES);
      
    });
  }, []);

  const getStrainByName = async (strain) => {
    try {
      await axios
        .get(
          `https://strainapi.evanbusse.com/${API_KEY}/strains/search/name/${strain}`
        )
        .then(function (response) {
          response.data.map((matches) => {
            if (strain.toLowerCase() === matches.name.toLowerCase()) {
              setStrainName(matches.name);
              setStrainRace(matches.race);
              setStrainDesc(matches.desc);
              getStrainDetails(matches.id);
              getSimilarStrains(matches.race) 
            }
          });
          setIsPng(true)
          setIsJpg(false)
          setIsDefault(false)
          getStrainImageName(strain);
          setIsSuccess(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getStrainDetails = async (strain) => {
    try {
      await axios
        .get(
          `https://strainapi.evanbusse.com/${API_KEY}/strains/data/effects/${strain}`
        )
        .then(function (response) {
          console.log(response)
          const { medical, positive, negative } = response.data;
          getEffectsData(medical, positive, negative);
        });
    } catch (error) {
      console.log(error);
    }
  };


  
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

  const getStrainImageName = (data) => {
    let name = data.replace(/\s/g, "-").toLowerCase();
    setStrainImageName(name);
  };


  const getSimilarStrains = async (race) => {
    try {
      await axios
        .get(
          `https://strainapi.evanbusse.com/${API_KEY}/strains/search/race/${race}`
        )
        .then(function (response) {
          const similarStrainsArray = [];
          for (var i = 0; i < 6; i++) {
            similarStrainsArray.push(response.data[Math.floor((Math.random() * response.data.length - 1) + 1)]);
          }
          console.log(response.data)
          console.log(similarStrainsArray, "similar strais array")
          setSimilarStrainsList(similarStrainsArray)
        });
    } catch (error) {
      console.log(error);
    }
  };


  // const getAllStrains = () => {
  //     try {
  //         axios.get('http://strainapi.evanbusse.com/EwZa0Jz/strains/search/all')
  //         .then(function (response) {
  //             let info = response.data;
  //             let names = Object.keys(info)
  //             // Firebase.database().ref("/").set([{name: names}])
  //         })
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <ThemeProvider theme={theme}>
      <Nav />
    <div>
      {!isAdult ? <Landing setIsAdult={setIsAdult}/> : null}

      {isAdult && !isSuccess ? <SearchBar data={filteredSearchData} getStrainByName={getStrainByName} /> : null}
      
      {!strainName ? null :
      <Strain
        name={strainName}
        strainRace={strainRace}
        description={strainDesc}
        medical={medical}
        positive={positive}
        negative={negative}
        imageName={strainImageName}
        setIsSuccess={setIsSuccess}
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
        filteredSearchData={filteredSearchData}
        similarStrainsList={similarStrainsList}
      />
      }

    </div>
    </ThemeProvider>
  );
};
export default App;
