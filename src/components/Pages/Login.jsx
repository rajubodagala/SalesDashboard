import React from "react";
import { Button, Container, Form } from "reactstrap";
import Joi from "joi-browser";
import FromFunc from "./formfunc";
import auth from "./authService";
import "./login.css";

class Login extends FromFunc {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    //Call the server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location =  "/"; // <Route exact path="/home" name="Home" component={DefaultLayout} />
      // this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  signUpButton = () => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };
  signInButton = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };

  render() {
    if (auth.getCurrentUser() != null) return (window.location.href = "/");
    return (
      <React.Fragment>
        <Container className="container" id="container">
        
          <div className="form-container sign-in-container">
            <Form onSubmit={this.handleSubmit} className="ng-pristine ng-valid">
              <h3>Sign In</h3>
              {this.renderInput("username", "User Name")}
              <span className="sprite txt" />
              {this.renderInput("password", "Password", "password")}
              <span className="sprite password" />
           
              {this.renderButton("Login")}
              <div className="loginContainer" />
            </Form>
          </div>
        
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;
