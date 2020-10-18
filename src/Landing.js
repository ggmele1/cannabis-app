import React from "react";
import "./App.css";
import { Container, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  marginAutoContainer: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
  },
}));

const Landing = (props) => {
  const classes = useStyles();
  return (
    <div className="landing">
      <Container maxWidth="md" className={classes.marginAutoContainer}>
        <div className="landing-info">
          <Typography variant="h3" className="primary header">
            A free & simple cannabis information app.
          </Typography>
          <Typography variant="h6" className="primary body">
            We have a large database of cannabis data. Search a cannabis strain
            and get some{" "}
            <Box component="span" className="primary header span">
              Dope Data.
            </Box>
          </Typography>
        </div>
        <div className="disclaimer">
          <Typography variant="h6" className="primary header span">
            Are you over 21?
          </Typography>
          <Typography variant="body2">
            Cannabis is a drug and should be consumed legally and responsibly.
          </Typography>
          <div className="button-wrapper">
            <button type="submit" className="btn-fill btn-bottom" onClick={() => props.setIsAdult(true)}>
              Yes I am
            </button>
            <button type="submit" className="btn-fill btn-bottom">
              No I am Not
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
