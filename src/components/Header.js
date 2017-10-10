import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    console.log("renderContent", this.props.auth);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Login with Google</a>;
      default:
        return <a href="/api/logout">Logout</a>;
    }
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/">
              VanKorea
            </Link>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">

              <li>
                <Link to="/posts">
                  Buy/Sell <span className="sr-only">(current)</span>
              </Link>
              </li>
              <li>
                <a>Link</a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>{this.renderContent()}</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
