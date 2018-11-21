import React, { Component } from 'react';
import {current} from 'graphql/queries';
import {logout} from 'graphql/mutations';
import {graphql, compose} from 'react-apollo';
import {Link} from 'react-router-dom';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';
import {UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';


class MyNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    this.props.logout().then(() => window.location.replace('/'))
  }

  loggedOutLinks = (user) => {
    return <React.Fragment>
      <NavItem>
        <NavLink tag={Link} to={'/login'}>Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to={'/signup'}>Signup</NavLink>
      </NavItem>
    </React.Fragment>
  }

  loggedInLinks = (user) => {
    return <React.Fragment>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {user.firstName}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <NavLink onClick={this.handleLogout}>Logout</NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment> 
  }

  navLinks = () => {
    let {loading, user} = this.props.current;
    if(loading) return null;
    if(!user) return this.loggedOutLinks(user);
    else return this.loggedInLinks(user);
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.navLinks()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default compose(
  graphql(current, {name: 'current'}),
  graphql(logout, {name: 'logout'})
)(MyNavbar)