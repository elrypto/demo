import React from 'react';
import { Link } from '@reach/router';
import Octicon, { Rocket, MortarBoard, Dash, Beaker } from '@primer/octicons-react';
import { Tooltip } from 'antd';
import ActiveNavLink from '../components/ui/ActiveNavLink';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">
          <Octicon size="medium" icon={MortarBoard} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div id="navbarResponsive" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Tooltip title="Normal (spring transitions)">
                <ActiveNavLink className="nav-link" to="/play">
                  <Octicon size="small" icon={Rocket} />
                </ActiveNavLink>
              </Tooltip>
            </li>
            <li className="nav-item">
              <Tooltip title="Basic version (no transitions)">
                <ActiveNavLink className="nav-link" to="/transitionless">
                  <Octicon size="small" icon={Dash} />
                </ActiveNavLink>
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
