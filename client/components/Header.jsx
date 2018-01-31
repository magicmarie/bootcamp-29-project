import React from 'react';

const Header = () => {
  return (
    <div>
      <ul id="signup-dropdown" className="dropdown-content">
        <li><a href="login.html">Login</a></li>
        <li><a href="signup.html">Signup</a></li>
      </ul>
      <nav className="navbar-purple">
        <div className="nav-wrapper left-padding">
          <a href="index.html" className="brand-logo">EventManager</a>
          <a
            href="index.html"
            data-activates="side-menu"
            className="button-collapse"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="active"><a href="index.html">Home</a></li>
            <li><a href="all-events.html">Events</a></li>
            <li><a href="all-centers.html">Centers</a></li>
            <li>
              <a
                className="dropdown-button"
                href="#!"
                data-activates="signup-dropdown"
              >
                  Login<i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>

          <ul className="side-nav" id="side-menu">
            <li className="active"><a href="index.html">Home</a></li>
            <li><a href="all-events.html">Events</a></li>
            <li><a href="all-centers.html">Centers</a></li>
            <li className="left-padding">
              <ul className="collapsible collapsible-accordion">
                <li>
                  <a className="collapsible-header" href="#">Login
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li><a href="signup.html">Login</a></li>
                      <li><a href="login.html">Signup</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;