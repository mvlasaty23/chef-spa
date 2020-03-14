import React from 'react';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

export default function RecipeListSearchBarComponent() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          id="input-search"
          value="Search"
          style={{ width: '100%', padding: '15px' }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
