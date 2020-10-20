import React from "react";
import "../App.css";
import imageSources from "./imageSources";
import { Typography, Divider } from "@material-ui/core";

const StrainMini = (props) => {
  const preSelect = ["Jack Herer", "Gelato", "OG Kush"];
  let count = 0;

  const handleLink = (item) => {
    props.getStrainByName(
      preSelect[preSelect.indexOf(item.toString()).toString()]
    );
  };

  return (
    <div>
      {preSelect.map((item, key) => (
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
                <Typography variant="subtitle1" className="header-mini primary">
                  {item}
                </Typography>
                <Typography variant="body2" className="header-mini primary">
                  Sativa
                </Typography>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StrainMini;
