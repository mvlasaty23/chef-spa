import { GridListTile, GridListTileBar, IconButton, makeStyles } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface RecipeListItemOptions {
  img: string;
  title: string;
  author: string;
  slug: string;
}

const useStyles = makeStyles(() => ({
  titleOverlay: {
    color: 'white',
  },
  titleImage: {
    height: '180px',
  },
}));

export default function RecipeListItemComponent(options: RecipeListItemOptions) {
  const classes = useStyles();
  return (
    <>
      <GridListTile>
        <img src={options.img} alt={options.title} className={classes.titleImage} />
        <GridListTileBar
          title={options.title}
          subtitle={<span>by: {options.author}</span>}
          actionIcon={
            <IconButton
              component={RouterLink}
              to={'/recipes' + options.slug}
              aria-label={`info about ${options.title}`}
            >
              <Info className={classes.titleOverlay} />
            </IconButton>
          }
        />
      </GridListTile>
    </>
  );
}
