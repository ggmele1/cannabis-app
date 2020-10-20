import React, { useState } from "react";
import { TextField, Typography, Container } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import StrainMini from './StrainMini.js';
import './App.css';


const useStyles = makeStyles((theme) => ({
  marginAutoContainer: {
    marginTop: 25,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    fontFamily: 'Lato',
    fontWeight: '900',
    marginTop: 25,
    marginBottom: 10,
    background: '#31ab65',
    color: '#141414',
    border: '2px solid',
    borderRadius: 3,
  },
  textInput: {
    fontFamily: 'Lato',
    fontWeight: '900',
  },
  links: {

  }
}));

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    props.getStrainByName(inputValue);
  };


  const classes = useStyles();
  return (
    <div className="search">
      <Container size="md" className={classes.marginAutoContainer}>
        <Typography variant="h3" className="primary header">
          Search a cannabis strain.
        </Typography>
      <Autocomplete
      disableClearable
        className={classes.input}
        loadingText="Loading"
        freeSolo="true"
        id="combo-box-demo"
        options={props.data}
        getOptionLabel={(option) => option.name}
        style={{ width: 340, }}
        renderInput={(params) => (
        <TextField {...params} label="Search Strain" variant="filled" className={classes.textInput}/>
        )}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      />
      <button className="btn-fill btn-bottom" onClick={() => handleSubmit()}>Search</button>
          <Typography variant="h6" className="secondary">
            Popular Searches
          </Typography>
      <div className="suggestions">

          <StrainMini getStrainByName={props.getStrainByName}/>
      </div>
      </Container>
    </div>
  );
};
export default SearchBar;
