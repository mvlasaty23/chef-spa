import { InputAdornment, TextField, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(() => ({
  searchInput: {
    width: '100%',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
}));

export default function RecipeListSearchBarComponent() {
  const classes = useStyles();
  return (
    <TextField
      id="input-search"
      value="Search"
      className={classes.searchInput}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}
