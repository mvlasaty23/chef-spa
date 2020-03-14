import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouterOutlet from './AppRouterOutlet';

export default function App() {
  return (
    <main>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="title">
              Food
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <AppRouterOutlet />
        </Container>
      </Router>
    </main>
  );
}
