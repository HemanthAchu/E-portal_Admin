import React from 'react'

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
function Navbars() {
  return (
    <>
    <Navbar expand="lg" className="shadow">
      <Container>
        <Navbar.Brand href="/"><h2 className='text-secondary'>
        E Portal</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
           
            <Link to="/complaints"> <Button className='me-2  mb-1'>Compliants</Button></Link>
            <Link to="/wastereport"> <Button className='me-2  mb-1'>Waste reports</Button></Link>
            <Link to="/connect"> <Button className='me-2  mb-1'>Admin Status</Button></Link>
            <Link to="/lists"> <Button className='me-2  mb-1'>Update List</Button></Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  )
}

export default Navbars
