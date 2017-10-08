import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <a href="http://localhost:5000/auth/google">Log In with Google</a>
        <a href="http://localhost:5000/auth/facebook">Log In with Facebook</a>
      </div>
    );
  }
}
