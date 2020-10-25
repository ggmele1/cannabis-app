import React, { useState, useEffect } from "react";
import "../App.css";
import SimilarStrains from "./SimilarStrains";
import StrainDetails from "./StrainDetails";
import imageSources from "./imageSources";
import { Container, Typography, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Strain = (props) => {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const {
    name,
    description,
    medical,
    positive,
    negative,
    imageName,
    setIsPng,
    setIsJpg,
    setIsDefault,
    isPng,
    isJpg,
    isDefault,
    strainRace,
    isSuccess,
    setIsSuccess
  } = props;

  const returnToSearch = () => {
    props.setStrainName("");
    setIsSuccess(false)
  };

  const imageFailPng = () => {
    setIsPng(!isPng);
    setIsJpg(!isJpg);
  };

  const imageFailJpg = () => {
    setIsJpg(!isJpg);
    setIsDefault(!isDefault);
  };

  return (
    <Container size="md">
      {loading ? (
        <div className="loading">
          <CircularProgress className="loading-icon" />
        </div>
      ) : (
        <div>
          {!isSuccess ? (
            <div className="center-row">
              <div className="loading">
                <Typography variant="h3" className="header decorate">
                  Sorry, we do not have that strain.
                </Typography>
                <div className="button-margin">
                  <Link to="/search">
                    <button
                      type="submit"
                      className="btn-fill btn-bottom long"
                      onClick={() => returnToSearch()}
                    >
                      Back To Search
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="strain-component">
              {imageName && isPng ? (
                <div className="image-wrapper">
                  <img
                    className="strain-image"
                    src={`https://images.leafly.com/flower-images/${imageName}.png`}
                    onError={imageFailPng}
                    alt="Strain"
                  />
                </div>
              ) : null}
              {imageName && isJpg ? (
                <div className="image-wrapper">
                  <img
                    className="strain-image"
                    src={`https://images.leafly.com/flower-images/${imageName}.jpg`}
                    onError={imageFailJpg}
                    alt="Strain"
                  />
                </div>
              ) : null}
              {imageName && isDefault ? (
                <div className="image-wrapper">
                  <img
                    src={imageSources[Math.floor(Math.random() * 4 + 1)]}
                    alt="default"
                    className="strain-image"
                  />
                </div>
              ) : null}

              <StrainDetails
                description={description}
                medical={medical}
                positive={positive}
                negative={negative}
                name={name}
                strainRace={strainRace}
              />

              <SimilarStrains
                race={strainRace}
                getStrainByName={props.getStrainByName}
                similarStrainsList={props.similarStrainsList}
              />

              <div className="back-button-wrapper">
                <div className="button-margin">
                  <Link to="/search">
                    <button
                      type="submit"
                      className="btn-fill btn-bottom long"
                      onClick={() => returnToSearch()}
                    >
                      Back To Search
                    </button>
                  </Link>
                </div>
                <div className="button-margin">
                  <Link to="/browse">
                    <button className="btn-fill btn-bottom long green">
                      All Strains
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};
export default Strain;
