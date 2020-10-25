import React, { useState } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FormHelperText,
  FormControl,
  NativeSelect,
  Container,
  Typography,
} from "@material-ui/core";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "race", label: "Strain Race", minWidth: 100 },
];

const useStyles = makeStyles({
  table: {
    margin: "auto",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  button: {
    margin: "1rem",
  },
  wrapper: {
    width: "100%",
  },
  container: {
    maxHeight: "100%",
  },
  pagination: {
    width: "100%",
    marginBottom: "10px",
  },
});

const AllStrains = (props) => {
  const {
    allStrains,
    getStrainByName,
    setIsSuccess,
    setStrainName,
    setNoStrainError,
  } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [strainTypeLabel, setStrainTypeLabel] = useState("All");
  const [strainsTable, setStrainsTable] = useState(allStrains);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNameClick = (name) => {
    getStrainByName(name);
  };

  const handleChange = (event) => {
    setStrainTypeLabel(event.target.value);
    handleTypeChange(event.target.value);
  };

  const handleTypeChange = (race) => {
    if (race === "all") {
      setStrainsTable(allStrains);
      setPage(0);
    } else {
      const filtered = allStrains.filter((type) => {
        return type.race === race;
      });
      setStrainsTable(filtered);
      setPage(0);
    }
  };

  const returnToSearch = () => {
    setIsSuccess(false);
    setStrainName("");
    setNoStrainError(false);
  };

  return (
    <Container className={classes.table}>
      {strainsTable.length < 2 ? null : (
        <Paper className={classes.wrapper}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    key="name"
                    align={columns.align}
                    style={{ minWidth: columns.minWidth }}
                  >
                    Name
                  </TableCell>

                  <TableCell
                    key="race"
                    align={columns.align}
                    style={{ minWidth: columns.minWidth }}
                  >
                    <FormControl className={classes.formControl}>
                      <FormHelperText>Strain Type</FormHelperText>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={strainTypeLabel}
                        name="age"
                        onChange={handleChange}
                        inputProps={{ "aria-label": "age" }}
                      >
                        <option value={"all"}>All</option>
                        <option value={"indica"}>Indica</option>
                        <option value={"sativa"}>Sativa</option>
                        <option value={"hybrid"}>hybrid</option>
                      </NativeSelect>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {strainsTable
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell key={columns.id} align={columns.align}>
                          <Link to="/strain">
                            <button
                              className="link"
                              onClick={() => handleNameClick(row.name)}
                            >
                              {row.name}
                            </button>
                          </Link>
                        </TableCell>

                        <TableCell key={columns.id} align={columns.align}>
                          <Typography
                            variant="body2"
                            className="header-mini primary"
                          >
                            {row.race}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Paper className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[25, 100, 500]}
              component="div"
              count={strainsTable.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Paper>
      )}

      <div className={classes.button}>
        <Link className="center-row" to="/search">
          <button
            className="btn-fill btn-bottom full"
            onClick={() => returnToSearch()}
          >
            Back To Search
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default AllStrains;
