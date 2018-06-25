import React from "react";

import { Navbar, Nav, NavItem } from "reactstrap";

import SourceLink from "components/SourceLink";

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          <span className="text-white">
            Test site {" "} 
          </span>
          <SourceLink>SCB</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
