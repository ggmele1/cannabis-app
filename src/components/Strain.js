import React from "react";
import "../App.css";
import SimilarStrains from "./SimilarStrains";
import StrainDetails from "./StrainDetails";
import imageSources from "./imageSources";
import { Container } from "@material-ui/core";

const Strain = (props) => {
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
  } = props;

  const returnToSearch = () => {
    props.setIsSuccess(false);
    props.setStrainName("");
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
          <button
            type="submit"
            className="btn-fill btn-bottom long"
            onClick={() => returnToSearch()}
          >
            Back To Search
          </button>
        </div>
      </div>
    </Container>
  );
};
export default Strain;
