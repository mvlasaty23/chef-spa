import {
  Grid,
  InputAdornment,
  TextField,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import React, { useState } from 'react';
import burger from './burger.jpg';
import { Link as RouterLink } from 'react-router-dom';
import { Kitchen, OutdoorGrill, Cake } from '@material-ui/icons';
import { Ingredient, Servings } from '../../domain/model';
import { servingsCalculator } from '../../domain/servingsCalculator/servings.calculator';

const initialServings: Servings = {
  ingredients: [
    new Ingredient('Öl', { amount: 2, unitOfMeasure: 'EL' }),
    new Ingredient('Käsekrainer', { amount: 2, unitOfMeasure: 'Stk' }),
    new Ingredient('Brot', { amount: 2, unitOfMeasure: 'Scheiben' }),
    new Ingredient('Senf', { amount: 1, unitOfMeasure: 'Portion' }),
    new Ingredient('Ketchup', { amount: 1, unitOfMeasure: 'Portion' }),
    new Ingredient('Chili', { amount: 1, unitOfMeasure: 'Stk' }),
    new Ingredient('Essiggurke', { amount: 1, unitOfMeasure: 'Stk' }),
    new Ingredient('Frucade', { amount: 1, unitOfMeasure: 'Flasche' }),
    new Ingredient('Spiegel Eiere', { amount: 2, unitOfMeasure: 'Stk' }),
    new Ingredient('sautierte Champignons', { amount: 6, unitOfMeasure: 'Stk' }),
  ],
  servingPerPerson: 1,
  ingredientsTotal: 3,
};
const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    marginTop: theme.spacing(1),
  },
  titleImage: {
    maxWidth: '95%',
  },
  ingredientsHeadline: {
    marginTop: theme.spacing(0),
    marginBottom: '5px',
  },
  ingredientsList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 180,
    marginBottom: '15px',
    paddingTop: 0,
  },
  ingredientListItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  ingredientListItemText: {
    marginBottom: 0,
    marginTop: 0,
  },
  inputAmount: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  durationDivider: {
    margin: '5px',
  },
}));

export default function RecipeComponent() {
  const classes = useStyles();
  const [amountPerServing, setAmountPerServing] = useState(120);
  // const [servingsPerPerson, setServingsPerPerson] = useState(4);
  const [servings, setServings] = useState(initialServings);
  const handleServingPersonChange = (desiredServings: number) =>
    setServings(servingsCalculator({ servings, desiredServings }));
  const handleChange = (setFn: (val: number) => void) => {
    return ({ target: { value } }: React.ChangeEvent<any>) => setFn(parseInt(value, 10));
  };
  const theme = useTheme();
  const onSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Breadcrumbs className={classes.breadcrumbs}>
          <Link color="inherit" component={RouterLink} to="/">
            Home
          </Link>
          <Link color="inherit" component={RouterLink} to="/recipes">
            Recipes
          </Link>
          <Link color="textPrimary" component={RouterLink} to="/recipes/kasekrainer" aria-current="page">
            Käsekrainer
          </Link>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          Käsekrainer
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Veröffentlich von Grandmaster Flash am 23.02.2020
        </Typography>
      </Grid>
      <Grid item lg={9} md={9} sm={12} xs={12}>
        <img src={burger} alt="Burger" className={classes.titleImage} />
      </Grid>
      {subText(onSmallScreen === true)}
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <Typography variant="h4" gutterBottom>
          Zutaten
        </Typography>
        <List className={classes.ingredientsList}>
          {servings.ingredients.map((ingredient, idx) => (
            <ListItem key={idx} className={classes.ingredientListItem}>
              <ListItemText className={classes.ingredientListItemText} primary={ingredient.displayString()} />
            </ListItem>
          ))}
        </List>
        <TextField
          id="input-total-ingredients"
          label="Portion pro Person"
          value={amountPerServing}
          onChange={handleChange(setAmountPerServing)}
          type="number"
          className={classes.inputAmount}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">Gramm</InputAdornment>,
          }}
        />
        <TextField
          id="input-person"
          label="Portionen"
          value={servings.servingPerPerson}
          onChange={handleChange(handleServingPersonChange)}
          type="number"
          className={classes.inputAmount}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">Personen</InputAdornment>,
          }}
        />
        <Typography>
          <Kitchen /> Vorbereitung 3 Minuten
        </Typography>
        <Typography>
          <OutdoorGrill />
          Zubereitung 10 Minuten
        </Typography>
        <Divider light className={classes.durationDivider} />
        <Typography>
          <Cake />
          <strong>Aufwand 13 Minuten</strong>
        </Typography>
      </Grid>
      {subText(onSmallScreen === false)}
      <Grid item xs={12}>
        <Typography variant="h4">Benötigte Werkzeuge</Typography>
        <Typography variant="body2">
          <i>Schneidbrett, Tourniermesser, Brotmesser, Pfanne</i>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Vorbereitung</Typography>
        <Typography variant="body1" component="ol">
          <li>Eine Scheibe Brot</li>
          <li>Teller mit einer Portion Senf</li>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Zubereitung</Typography>
        <Typography variant="body1" component="ol">
          <li>Käsekrainer aus der Packung nehmen</li>
          <li>Pfanne mit etwas Öl erhitzen</li>
          <li>Käsekrainer vorsichtig in die Pfanne legen</li>
          <li>Käsekrainer bei mittlerer Hitze etwa 5 Minuten auf beiden Seiten braten</li>
          <li>
            In der Zwischenzeit Brot auf das Schneibrett legen und eine Scheibe davon abschneiden. Brot wieder
            verstauen.
          </li>
          <li>Teller vorbereiten, mit einer Portion Senf, der vorbereiteten Scheibe Brot.</li>
          <li>Ist die Krainer gut angebraten, lege die Wurst auf den Teller</li>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Anrichten</Typography>
        <Typography variant="body1">
          Lege die Krainer in die mitte des Tellers um die zentrale Rolle der Wurst zu Symbolisieren. Nappiere kleine
          Tupfer Senf um die Krainer um einen abstrakten Aspekt würziger Sauce als Beilage an zu bieten.
        </Typography>
      </Grid>
    </Grid>
  );
}

function subText(display: boolean) {
  if (display === true) {
    return (
      <Grid item xs={12}>
        <Typography variant="subtitle2">Exquisite Mahlzeit zu jeder Uhrzeit.</Typography>
        <Divider />
      </Grid>
    );
  } else {
    return <span />;
  }
}
