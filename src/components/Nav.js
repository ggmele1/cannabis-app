import React from "react";
import logo from "./images/DopestData.png";
import "../App.css";
const Nav = (props) => {
  const { setIsSuccess, setStrainName } = props;
  const returnToSearch = () => {
    setIsSuccess(false);
    setStrainName("");
  };

  return (
    <button className="link" onClick={() => returnToSearch()}>
      <div className="nav">
        <img src={logo} alt="logo" className="logo" />
      </div>
    </button>
  );
};

export default Nav;
