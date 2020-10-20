import React from "react";
import "../App.css";
import {
  Typography,
  Chip,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const StrainDetails = (props) => {
  const { description, medical, positive, negative, name, strainRace } = props;

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
  const classes = useStyles();

  return (
    <div>
      <div className="strain-header-wrapper">
        <Typography variant="h3" className="header decorate">
          {name}
        </Typography>
        <Typography variant="h5" className="sub-header decorate">
          {strainRace}
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
                <Chip key={item} label={item} variant="outlined" />
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
                <Chip key={item} label={item} variant="outlined" />
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
                <Chip key={item} label={item} variant="outlined" />
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default StrainDetails;
