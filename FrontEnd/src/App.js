import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/navigation/MainNavigation.js";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace.js";
import Login from "./user/pages/Login";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            {/* Render the users page here, only renders if the path is exactly this*/}
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            {/*Dynamic places will be shown based on the exact User Id*/}
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            {/* New places form here, we want t0 put places/new before places/:placeId because otherwise places/new will never be reached*/}
            <NewPlace />
          </Route>
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Route path="/auth">
            <Login />
          </Route>
          <Redirect to="/" />
          {/* if the usr enter anything else, then we redirect to home page which is the list of users*/}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
