import React from "react";
import "../App.css";
import imageSources from "./imageSources";
import { Typography, Divider } from "@material-ui/core";

const SimilarStrains = (props) => {
  const { similarStrainsList, getStrainByName } = props;

  const handleLink = (item) => {
    getStrainByName(item);
  };

  return (
    <div>
      <Typography variant="h4" className="header primary">
        Similar Strains
      </Typography>
      {similarStrainsList.length !== 6 ? (
        <div>Loading</div>
      ) : (
        <div>
          {similarStrainsList.map((item, key) => (
            <button
              key={key}
              className="link"
              onClick={() => handleLink(item.name)}
            >
              <div className="other-strains-wrapper">
                <div className="other-strains">
                  <img
                    src={imageSources[Math.floor(Math.random() * 4 + 1)]}
                    alt="default"
                    className="other-strain-image"
                  />
                  <Divider className="colored-divider" />
                  <div className="other-strain-typography">
                    <Typography
                      variant="subtitle1"
                      className="header-mini primary"
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" className="header-mini primary">
                      {item.race}
                    </Typography>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarStrains;
