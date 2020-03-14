import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Breadcrumbs,
  Link,
  makeStyles,
} from '@material-ui/core';
import { Info } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { BehaviorSubject } from 'rxjs';
import RecipeListSearchBarComponent from './RecipeListSearchBarComponent';

interface RecipeTileComponentProps {
  img: string;
  title: string;
  author: string;
  slug: string;
}

const tileData: RecipeTileComponentProps[] = [
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
const data$: BehaviorSubject<RecipeTileComponentProps[]> = new BehaviorSubject(tileData);

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    marginTop: theme.spacing(1),
  },
}));

export default function RecipeListComponent() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState<RecipeTileComponentProps[]>([]);
  useEffect(() => {
    const sub = data$.subscribe(data => setRecipes(data), console.error);
    return () => {
      if (sub && sub.closed === false) {
        sub.unsubscribe();
      }
    };
  });
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Breadcrumbs className={classes.breadcrumbs}>
            <Link color="inherit" component={RouterLink} to="/">
              Home
            </Link>
            <Link color="inherit" component={RouterLink} to="/recipes">
              Recipes
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <RecipeListSearchBarComponent />
      <GridList cellHeight={180} cols={3}>
        {recipes.map(tile => (
          <GridListTile key={tile.title}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton component={RouterLink} to={'/recipes' + tile.slug} aria-label={`info about ${tile.title}`}>
                  <Info style={{ color: 'white' }} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
