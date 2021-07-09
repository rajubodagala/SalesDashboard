import React, { useState } from 'react';
import UserImg from "../assets/images/pimage.jpg";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Container, Nav } from "../components/styled-components";
import auth from '../components/Pages/authService'

const Header = (props) => { 
    const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
   <React.Fragment>
     <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
     <Container className="navbar-brand h1 mb-0 text-large font-medium">
       Sales Dashboard
     </Container>
     <Container className="navbar-nav ml-auto">
       <Container className="user-detail-section">
         <span className="pr-2">Hi, {auth.getCurrentUser()}</span>
         <span className="img-container" onClick={handleClick}>
           <img src={UserImg} className="rounded-circle" alt="user" />
         </span>
         <Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
 >  
 
        <MenuItem onClick={props.signOut}>Logout</MenuItem>
 </Menu>
       </Container>
     </Container>
   </Nav>
   </React.Fragment>
  );
};


export default Header;
