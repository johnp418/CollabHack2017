import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      redirectToReferrer: false
    };
  }

  componentWillMount() {
    this.getCurrentUser().then(user => {
      console.log('user ? ', user);
      if (user.email) {
        this.setState({ isAuthenticated: true });
      }
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      fetch('/api/current_user', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(user => {
          resolve(user);
        });
    });
  }

  onClickLogout() {
    fetch('/api/logout', { credentials: 'include' }).then(res => {
      if (res.status === 200) {
        console.log(' redirected from server ');
        this.setState({ isAuthenticated: !this.state.isAuthenticated });
      }
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <Link className="navbar-brand" to="/">
          HOME
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/boards">
                Board
              </Link>
            </li>
          </ul>
          {this.state.isAuthenticated && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  onClick={this.onClickLogout.bind(this)}
                  className="nav-link"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          )}
          {!this.state.isAuthenticated && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
