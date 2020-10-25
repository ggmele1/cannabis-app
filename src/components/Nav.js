import React from "react";
import logo from "./images/DopestData.png";
import "../App.css";
import {Link} from "react-router-dom";

const Nav = (props) => {
  const { setIsSuccess, setStrainName, setNoStrainError } = props;
  const returnToSearch = () => {
    setIsSuccess(false);
    setStrainName("");
    setNoStrainError(false);
  };

  return (
    <Link to="/search">
    <button className="link" onClick={() => returnToSearch()}>
      <div className="nav">
        <img src={logo} alt="logo" className="logo" />
      </div>
    </button>
    </Link>
  );
};

export default Nav;
