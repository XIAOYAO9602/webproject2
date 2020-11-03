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

// path = "/""  list of Users, will always be avaiable
// path = "/userId/places" always available
// path = "/places/new" new place form, only avaiable after log in
// path="/places/:placeId" only avaiable after log in
// path="/auth" log in place, only avaiable when we are not log in
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
            {/*update user form, can view on map, delete or edit*/}
            <UpdatePlace />}
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
