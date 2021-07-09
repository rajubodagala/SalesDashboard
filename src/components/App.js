import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import auth from "../components/Pages/authService";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("../containers/defaultLayout"),
  loading,
});

// Pages
const Login = Loadable({
  loader: () => import("../components/Pages/Login"),
  loading,
});


class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />          
            <Route path="/" name="Home" component={DefaultLayout} />
            {!user && <Redirect to="/login" />}
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;
