import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardComponent from './component/dashboard/DashboardComponent';
import RecipeListComponent from './component/recipe/list/RecipeListComponent';
import RecipeComponent from './component/recipe/RecipeComponent';
import UomCalculatorComponent from './component/uomcalculator/UomCalculatorComponent';

export default function AppRouterOutlet() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <DashboardComponent />
      </Route>
      <Route exact={true} path="/uomcalc">
        <UomCalculatorComponent />
      </Route>
      <Route exact={true} path="/recipes">
        <RecipeListComponent />
      </Route>
      <Route exact={true} path="/recipes/kasekrainer">
        <RecipeComponent />
      </Route>
    </Switch>
  );
}
