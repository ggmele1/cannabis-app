import React from "react";
import "../App.css";
import { Container, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  marginAutoContainer: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
  },
}));

const Landing = () => {
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
          <Typography variant="body2" className="body-small">
            Cannabis is a drug and should be consumed legally and responsibly.
          </Typography>
          <Typography variant="h6" className="primary header-small span">
            Are you over 21?
          </Typography>
          <div className="button-wrapper">
            <div className="button-margin">
              <Link to="/search">
                <button
                  type="submit"
                  className="btn-fill btn-bottom"
                  // onClick={() => props.setIsAdult(true)}
                >
                  Yes I Am
                </button>
              </Link>
            </div>
            <div className="button-margin">
              <button type="submit" className="btn-fill btn-bottom">
                No I Am Not
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
