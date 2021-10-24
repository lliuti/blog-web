import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage/index";
import { CreatePost } from "./pages/CreatePost/index";

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/post/create">
          <CreatePost />
        </Route>
      </Switch>
    </Router>
  );
}
