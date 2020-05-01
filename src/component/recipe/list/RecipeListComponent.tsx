import { Breadcrumbs, Grid, GridList, Link, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { BehaviorSubject } from 'rxjs';
import RecipeListItemComponent, { RecipeListItemOptions } from './RecipeListItemComponent';
import RecipeListSearchBarComponent from './RecipeListSearchBarComponent';

const tileData: RecipeListItemOptions[] = [
  {
    title: 'Käsekrainer',
    img: 'burger.jpg',
    author: 'Grandmaster Flash',
    slug: '/kasekrainer',
  },
  {
    title: 'Burger1',
    img: 'burger.jpg',
    author: 'Grandmaster Flash',
    slug: '/kasekrainer',
  },
  {
    title: 'Burger2',
    img: 'burger.jpg',
    author: 'Grandmaster Flash',
    slug: '/kasekrainer',
  },
  {
    title: 'Burger3',
    img: 'burger.jpg',
    author: 'Grandmaster Flash',
    slug: '/kasekrainer',
  },
  {
    title: 'Burger4',
    img: 'burger.jpg',
    author: 'Grandmaster Flash',
    slug: '/kasekrainer',
  },
];
const data$ = new BehaviorSubject(tileData);

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    marginTop: theme.spacing(1),
  },
  titleOverlay: {
    color: 'white',
  },
  recipeList: {
    justifyContent: 'center',
    listStyleType: 'none',
  },
}));

export default function RecipeListComponent() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState<RecipeListItemOptions[]>([]);
  useEffect(() => {
    const sub = data$.subscribe(data => setRecipes(data), console.error);
    return () => {
      if (sub && sub.closed === false) {
        sub.unsubscribe();
      }
    };
  });
  const theme = useTheme();
  const onSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const cols = onSmallScreen === true ? 2 : 4;
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Breadcrumbs className={classes.breadcrumbs}>
            <Link color="inherit" component={RouterLink} to="/">
              Home
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/recipes" aria-current="page">
              Recipes
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <RecipeListSearchBarComponent />
      </Grid>
      <GridList cols={cols} className={classes.recipeList}>
        {recipes.map(tile => (
          <RecipeListItemComponent key={tile.title} {...tile} />
        ))}
      </GridList>
    </div>
  );
}
