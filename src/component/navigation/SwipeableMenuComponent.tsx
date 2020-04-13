import { List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer, ListSubheader } from '@material-ui/core';
import { Exposure, LibraryBooks } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

export interface MenuOptions {
  open: boolean;
  toggleMenu: (open: boolean) => React.EventHandler<any>;
}

const useStyles = makeStyles(() => ({
  active: {
    cursor: 'not-allowed',
    opacity: 0.5,
    textDecoration: 'none',
    pointerEvents: 'none',
  },
}));

export function SwipeableMenuComponent({ open, toggleMenu }: MenuOptions) {
  const classes = useStyles();
  return (
    <SwipeableDrawer anchor="right" open={open} onClose={toggleMenu(false)} onOpen={toggleMenu(true)}>
      <div style={{ width: 'auto' }} role="presentation" onKeyDown={toggleMenu(false)}>
        <List>
          <ListSubheader>Rezeptbuch</ListSubheader>
          <ListItem component={NavLink} button key="recipe" to="/recipes" activeClassName={classes.active} exact>
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="Rezepte" />
          </ListItem>
          <ListItem component={NavLink} button key="calc" to="/uomcalc" activeClassName={classes.active}>
            <ListItemIcon>
              <Exposure />
            </ListItemIcon>
            <ListItemText primary="Einheitenrechner" />
          </ListItem>
          {/* <ListSubheader>Know-How</ListSubheader> */}
        </List>
      </div>
    </SwipeableDrawer>
  );
}
