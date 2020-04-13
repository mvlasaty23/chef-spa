import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouterOutlet from './AppRouterOutlet';
import { SwipeableMenuComponent } from './component/navigation/SwipeableMenuComponent';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = (open: boolean) => () => setMenuOpen(open);
  return (
    <main>
      <Router>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" className="title">
              Food
            </Typography>
            <IconButton onClick={toggleMenu(!menuOpen)} edge="end" color="inherit" aria-label="menu">
              <Menu />
              <SwipeableMenuComponent open={menuOpen} toggleMenu={toggleMenu} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <AppRouterOutlet />
        </Container>
      </Router>
    </main>
  );
}
