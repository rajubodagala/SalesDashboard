import React, { Component } from "react";
import Loadable from "react-loadable";
import {  Switch, Route, Redirect } from 'react-router-dom';
import { Container, Nav } from "../components/styled-components";
import auth from "../components/Pages/authService";


import 'react-dropdown/style.css';
import '../style.css';
import "bootstrap/dist/css/bootstrap.css";
import '@fortawesome/fontawesome-free/css/all.css';
import Header from './header';

const loading = () => (
    <div className="animated fadeIn pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse" />
    </div>
  );
const Dashboard = Loadable({
    loader: () => import("../components/Dashboard"),
    loading,
  });

class DefaultLayout extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }
   signOut=(e)=> {
    auth.logout();
    this.props.history.push("/login");
  }
  componentDidMount() {
   
  }

  render() {
    if (auth.getCurrentUser() === null) return <Redirect to="/login" />;
    return (
      <Container>
          <Header   signOut={(e)=>this.signOut()} >
          
          </Header>
        <Switch>      
            <Route exact path="/" name="Dashboard" component={Dashboard} />
                </Switch>
      </Container>
    );
  }
}

export default DefaultLayout;
