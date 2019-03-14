import React, {Component} from 'react';

export default class Navbar extends Component {
  
  
  render() {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span className="navbar-clients">{this.props.users} User{this.props.users === 1 ? '' : 's'} Connected</span>
        </nav>
    )
  }
}