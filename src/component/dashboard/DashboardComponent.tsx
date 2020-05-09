import { Button, Card, CardActions, CardContent, Grid, GridList, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import RecipeListItemComponent, { RecipeListItemOptions } from '../recipe/list/RecipeListItemComponent';

const recipeFeed: RecipeListItemOptions[] = [
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

const useStyles = makeStyles(theme => ({
  recipeFeedRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  recipeFeedList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
}));

export default function DashboardComponent() {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Rezept des Tages
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Random Gericht
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/uomcalc" size="small">
              Go
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Neue Rezepte
        </Typography>
      </Grid>
      <div className={classes.recipeFeedRoot}>
        <GridList className={classes.recipeFeedList}>
          {recipeFeed.map(recipe => (
            <RecipeListItemComponent key={recipe.title} {...recipe} />
          ))}
        </GridList>
      </div>
      {/* TODO: add a line with a link to recipe list*/}
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Ingredients
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/recipes" size="small">
              Go
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tools
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/recipes" size="small">
              Go
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Shopping List
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/recipes" size="small">
              Go
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Grow Guide
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/recipes" size="small">
              Go
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
