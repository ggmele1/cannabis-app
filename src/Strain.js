import React, { useState } from "react";
import "./App.css";
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
    race,
    description,
    medical,
    positive,
    negative,
    imageName,
  } = props;
  const [imgType, setImgType] = useState("png");
  const [imageCount, setImageCount] = useState(1);

  const returnToSearch = () => {
    props.setIsSuccess(false);
    props.setStrainName("");
  }

  const imageFail = () => {
    console.log("error");
    setImageCount(imageCount + 1);
    setImgType("jpg");
  };
  const classes = useStyles();
  return (
    <Container size="md">
      <div className="strain-component">
        {imageName && imageCount < 3 ? (
          <div className="image-wrapper">
            <img
              className="strain-image"
              src={`https://images.leafly.com/flower-images/${imageName}.${imgType}`}
              onError={imageFail}
              alt="Strain"
            />
          </div>
        ) : null}
        {imageName && imageCount === 3 ? (
          <div className="image-wrapper">
            <img src={image} alt="default" className="strain-image" />
          </div>
        ) : null}
        <Typography variant="h3" className="header decorate">
          {name}
        </Typography>
        <Typography variant="h5" className="sub-header decorate">
          {race}
        </Typography>
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
        <div className="other-strains-wrapper">
          <div className="other-strains">
            <img
              src="https://images.leafly.com/flower-images/gelato.jpg"
              alt="default"
              className="other-strain-image"
            />
            <Divider className="colored-divider" />
            <div className="other-strain-typography">
              <Typography variant="body" className="header-mini primary">
                Jack Herer
              </Typography>
              <Typography variant="body2" className="header-mini primary">
                Sativa
              </Typography>
            </div>
          </div>
          

          <div className="other-strains">
            <img
              src="https://images.leafly.com/flower-images/gelato.jpg"
              alt="default"
              className="other-strain-image"
            />
            <Divider className="colored-divider" />
            <div className="other-strain-typography">
              <Typography variant="body" className="header-mini primary">
                Jack Herer
              </Typography>
              <Typography variant="body2" className="header-mini primary">
                Sativa
              </Typography>
            </div>
          </div>

          <div className="other-strains">
            <img
              src="https://images.leafly.com/flower-images/gelato.jpg"
              alt="default"
              className="other-strain-image"
            />
            <Divider className="colored-divider" />
            <div className="other-strain-typography">
              <Typography variant="body" className="header-mini primary">
                Jack Herer
              </Typography>
              <Typography variant="body2" className="header-mini primary">
                Sativa
              </Typography>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-fill btn-bottom" onClick={() => returnToSearch()}>
              Back To Search
            </button>

      </div>
    </Container>
  );
};
export default Strain;
