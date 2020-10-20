import React, { useState, useEffect } from "react";
import "./App.css";
import SimilarStrains from './SimilarStrains';
import {
  Typography,
  Container,
  Chip,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";
import image from "./images/image.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cards: {
    marginTop: 25,
    background: "#ebebeb",
    borderRadius: 10,
    maxWidth: 600,
  },
  chipWrapper: {
    display: "flex",
    marginTop: 8,
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

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
    isDefault    
  } = props;



  const returnToSearch = () => {
    props.setIsSuccess(false);
    props.setStrainName("");
  }

  const imageFailPng = () => {
    setIsPng(!isPng);
    setIsJpg(!isJpg);
  };

  const imageFailJpg = () => {
    setIsJpg(!isJpg);
    setIsDefault(!isDefault);
  }

  const classes = useStyles();
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
            <img src={image} alt="default" className="strain-image" />
          </div>
        ) : null}
        <div className="strain-header-wrapper">
        <Typography variant="h3" className="header decorate">
          {name}
        </Typography>
        <Typography variant="h5" className="sub-header decorate">
          {props.strainRace}
        </Typography>
        </div>
        <Typography variant="h6" className="secondary">
          description
        </Typography>
        <Typography variant="body1" className="primary body">
          {description}
        </Typography>
        <Typography variant="h4" className="header primary">
          Effects
        </Typography>

        <Card className={classes.cards}>
          <CardContent>
            <Typography variant="h6" className="secondary">
              Used for
            </Typography>
            <Divider />
            {medical.length > 1 ? (
              <div className={classes.chipWrapper}>
                {medical.map((item) => (
                  <Chip label={item} variant="outlined" />
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className={classes.cards}>
          <CardContent>
            <Typography variant="h6" className="secondary">
              positive
            </Typography>
            <Divider />
            {positive.length > 1 ? (
              <div className={classes.chipWrapper}>
                {positive.map((item) => (
                  <Chip label={item} variant="outlined" />
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className={classes.cards}>
          <CardContent>
            <Typography variant="h6" className="secondary">
              negative
            </Typography>
            <Divider />
            {negative.length > 1 ? (
              <div className={classes.chipWrapper}>
                {negative.map((item) => (
                  <Chip label={item} variant="outlined" />
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
        <Typography variant="h4" className="header primary">
          Similar Strains
        </Typography>

        <SimilarStrains race={props.strainRace} getStrainByName={props.getStrainByName} similarStrainsList={props.similarStrainsList}/>
       
        <div className="back-button-wrapper">
        <button type="submit" className="btn-fill btn-bottom long" onClick={() => returnToSearch()}>
              Back To Search
        </button>
        </div>

      </div>
    </Container>
  );
};
export default Strain;
