import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function DashboardComponent() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>Dashboard</h1>
      </Grid>
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              UoM Calculator
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/uomcalc" size="small">Go</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recipes
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/recipes" size="small">Go</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Ingredients
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/recipes" size="small">Go</Button>
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
            <Button component={Link} to="/recipes" size="small">Go</Button>
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
            <Button component={Link} to="/recipes" size="small">Go</Button>
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
            <Button component={Link} to="/recipes" size="small">Go</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
