import React, { useState } from "react";
import './App.css';
import { Switch, Route, useParams, Redirect } from "react-router-dom";
import AuthService from '../../services/auth-services';

import Home from './Home';
import ProjectList from '../Projects/ProjectList';
import ProjectDetails from '../Projects/ProjectDetails';
import AddProjectForm from '../Projects/Forms/AddProjectForm';
import EditProjectForm from '../Projects/Forms/EditProjectForm';
import Profile from '../Profile/Profile';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Navbar from "../Navbar/Navbar";
import ProtectedRoute from "../Auth/ProtectedRoute";
import EditProfileForm from "../Profile/Forms/EditProfileForm";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const getLoggedInUser = (userObject) => {
    setLoggedInUser(userObject);
  };

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .isAuthenticated()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  fetchUser();

  // return (
  //   <div className="App">
  //    <h1>this is the landing page (for now)</h1>
  //    <Switch>
  //       <Route exact path="/" component={Home} />
  //       <Route exact path="/signup" render={() => <Signup getUser={getLoggedInUser} />} />
  //       <Route exact path="/login" component={Login} />
  //       <Route exact path="/profile/:id" component={Profile} />
  //       <Route exact path="/projects" component={ProjectList} />
  //       <Route exact path="/projects/:id" component={ProjectDetails} />
  //       <Route exact path="/projects/:id/edit" component={EditProjectForm} />
  //       <Route path="/projects/create" component={AddProjectForm} />
  //     </Switch>
  //   </div>
  // );

  return loggedInUser ? (
    <section className="App">
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
      <Switch>
        <Route 
        getUser={getLoggedInUser}
        exact path="/login" 
        render={() => <Redirect to="/profile"/>}

        />
        <ProtectedRoute
          user={loggedInUser}
          exact path="/projects/create"
          component={AddProjectForm}
        />
        
        <ProtectedRoute
          user={loggedInUser}
          exact path="/projects"
          component={ProjectList}
        />
        
        <ProtectedRoute
          user={loggedInUser}
          exact path="/profile"
          component={Profile}
        />
        <ProtectedRoute
          user={loggedInUser}
          exact path="/profile/:id/edit"
          component={EditProfileForm}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/projects/:id"
          component={ProjectDetails}
        />
      </Switch>
    </section>
  ) : (
    <section className="App">
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />

      <Switch>
        
        <Route
          exact
          path="/signup"
          render={() => <Signup getUser={getLoggedInUser} />}
        />
        <Route
          exact
          path="/login"
          render={() => <Login getUser={getLoggedInUser} />}
        />
        <Route
          exact
          path="/"
          render={() => <Home getUser={getLoggedInUser} />}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/projects/:id"
          component={ProjectDetails}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/projects"
          component={ProjectList}
        />
      </Switch>
    </section>
  );
}

export default App;
