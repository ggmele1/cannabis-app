import React from "react";
import "../App.css";
import imageSources from "./imageSources";
import { Typography, Divider, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
const StrainMini = (props) => {
  const preSelect = [
    "Cali Kush",
    "Gelato",
    "OG Kush",
    "Ice Queen",
    "lime Haze",
    "Blueberry",
  ];
  let count = 0;

  const handleLink = (item) => {
    props.getStrainByName(
      preSelect[preSelect.indexOf(item.toString()).toString()]
    );
  };

  return (
    <Container size="md">
      <div className="center-row">
        {preSelect.map((item, key) => (
          <Link to="strain">
            <button key={key} className="link" onClick={() => handleLink(item)}>
              <div className="other-strains-wrapper">
                <div className="other-strains">
                  <img
                    src={imageSources[count++]}
                    alt="default"
                    className="other-strain-image"
                  />
                  <Divider className="colored-divider" />
                  <div className="other-strain-typography">
                    <Typography
                      variant="subtitle1"
                      className="header-mini primary"
                    >
                      {item}
                    </Typography>
                    <Typography variant="body2" className="header-mini primary">
                      Sativa
                    </Typography>
                  </div>
                </div>
              </div>
            </button>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default StrainMini;
