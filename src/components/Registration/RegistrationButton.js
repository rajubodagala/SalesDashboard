import React, { Component } from "react";
import { Container } from "../styled-components";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Modal from "../common/modalconfirm";
import DialogWrapper from "../common/Dialog";
import RegistrationForm from "./RegistrationForm"
import setDate from "date-fns/fp/setDate";

class RegistrationButton extends Component {
  constructor() {
    super();
    this.state = {     
      modal: false,
      selectedDate: new Date(),    
      isOpen: false
    };
  }

  async componentDidMount() {
    
  }
  handleCanceltoggle = () => {
    this.setState({ modal: false });
  };
  handleToggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleDelete = async user => {   

    this.setState({ modal: false });
  };
  
  buttonOnClick=()=>
  {
    this.setState({ isOpen: true})
  }
  refreshDash = (redate) => {
    this.props.refreshDash(redate);
    this.setState({ isOpen: !this.state.isOpen })
  };
  render() {   
    return (
          <Container className="navbar-nav ml-auto">
            <Fab onClick={this.buttonOnClick} size="small" color="primary" aria-label="add">
              <AddIcon  />
            </Fab>
            <Modal
                  modalflag={this.state.modal}
                  toggle={this.handleToggle}
                  cancelToggle={this.handleCanceltoggle}
                  onModalSubmit={this.handleDelete}
                />
                <DialogWrapper
                  isOpen={this.state.isOpen}
                  toggle={() => this.setState({ isOpen: !this.state.isOpen })}
                  size="lg"
                >
                  <RegistrationForm
                    toggle={() => this.setState({ isOpen: !this.state.isOpen })}
                    refreshDashboard={this.refreshDash}
                  />
                </DialogWrapper>
          </Container>
     );
  }
}

export default RegistrationButton;
