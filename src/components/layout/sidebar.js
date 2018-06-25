import React from 'react';

import bn from 'utils/bemnames';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink as BSNavLink

} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import {

  MdWeb,
  MdArrowDropDownCircle,

} from 'react-icons/lib/md';

import SourceLink from 'components/SourceLink';

import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
//import logo200Image from 'assets/img/logo/logo_200.png';
import scb_logo from 'assets/img/logo/scb_logo.png';

const sidebarBackground = {

  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navItems = [
  { to: '/minmax', name: 'minmax', exact: false, Icon: MdWeb },
  { to: '/products', name: 'products', exact: false, Icon: MdArrowDropDownCircle },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand" >

              <div className="text-white">
                velocity
              </div>

              <img
                src={scb_logo}
                width="53"
                height="80"
                className="pr-2"
                alt=""
              />

            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}


          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
