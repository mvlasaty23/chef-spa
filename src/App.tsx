import { AppBar, Container, IconButton, makeStyles, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouterOutlet from './AppRouterOutlet';
import { SwipeableMenuComponent } from './component/navigation/SwipeableMenuComponent';
import { theme } from './theme';

const useStyles = makeStyles(compTheme => ({
  offset: compTheme.mixins.toolbar,
  spacedToolbar: {
    justifyContent: 'space-between',
  },
}));
export default function App() {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = (open: boolean) => () => setMenuOpen(open);
  return (
    <main>
      <Router>
        <ThemeProvider theme={theme}>
          <AppBar position="fixed">
            <Toolbar className={classes.spacedToolbar}>
              <Typography variant="h6" className="title">
                Kitchen Supreme
              </Typography>
              <IconButton onClick={toggleMenu(!menuOpen)} edge="end" color="inherit" aria-label="menu">
                <Menu />
                <SwipeableMenuComponent open={menuOpen} toggleMenu={toggleMenu} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.offset} />
          <Container>
            <AppRouterOutlet />
          </Container>
        </ThemeProvider>
      </Router>
    </main>
  );
}
