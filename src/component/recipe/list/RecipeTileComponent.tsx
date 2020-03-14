import React from 'react';
import { GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { Info } from '@material-ui/icons';

export interface RecipeTileComponentProps {
  img: string;
  title: string;
  author: string;
}
export default function RecipeTileComponent({ img, title, author }: RecipeTileComponentProps) {
  console.log('Rendering ', title);
  return (
    <GridListTile key={img}>
      <img src={img} alt={title} />
      <GridListTileBar
        title={title}
        subtitle={<span>by: {author}</span>}
        actionIcon={
          <IconButton aria-label={`info about ${title}`}>
            <Info />
          </IconButton>
        }
      />
    </GridListTile>
  );
}
