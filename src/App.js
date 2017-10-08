import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Board from './components/board/Board';
import Post from './components/post/Post';
import Login from './components/login/Login';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="/">
        HOME
      </a>
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
            <a className="nav-link" href="/boards">
              Board
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/board2">
              Board2
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <div>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Hello, world!</h1>
          <p>
            This is a template for a simple marketing or informational website.
            It includes a large callout called a jumbotron and three supporting
            pieces of content. Use it as a starting point to create something
            more unique.
          </p>
          <p>
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more »
            </a>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.{' '}
            </p>
            <p>
              <a className="btn btn-secondary" href="#" role="button">
                View details »
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.{' '}
            </p>
            <p>
              <a className="btn btn-secondary" href="#" role="button">
                View details »
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>
              Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Vestibulum id ligula porta felis euismod
              semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
              condimentum nibh, ut fermentum massa justo sit amet risus.
            </p>
            <p>
              <a className="btn btn-secondary" href="#" role="button">
                View details »
              </a>
            </p>
          </div>
        </div>

        <hr />

        <footer>
          <p>© Company 2017</p>
        </footer>
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="">
          <Route exact path="/" component={Home} />
          <Route exact path="/boards" component={Board} />
          <Route exact path="/boards/:id" component={Post} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    );
  }
}

export default App;
