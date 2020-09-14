import React from 'react';
import { Grid, TextField, Typography, Divider } from '@material-ui/core';

import { newRecipe } from '../../../domain/service/recipeService';
import { RecipeInstunctrionsEditor } from '../edit/RecipeInstructionsEditor';
export default function RecipeCreateComponent() {
  const recipe = newRecipe();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4">Titel</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <RecipeInstunctrionsEditor />
      </Grid>
      <Grid item xs={12}>
        <TextField id="input-servings-amount" label="Servings" value={recipe.title} type="number" variant="outlined" />
        <TextField id="input-servings-quantity" label="Quantity" value={recipe.title} type="text" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="input-preparation-amount"
          label="Prep Time"
          value={recipe.title}
          type="number"
          variant="outlined"
        />
        <TextField
          id="input-preparation-quantity"
          label="Quantity"
          value={recipe.title}
          type="text"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Zutaten</Typography>
      </Grid>
    </Grid>
  );
}
