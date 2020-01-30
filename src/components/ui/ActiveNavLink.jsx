import React from 'react';
import { Link } from '@reach/router';

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'nav-link active' } : null;
};

const ActiveNavLink = props => (
  <Link getProps={isActive} className="nav-link" {...props} />
);

export default ActiveNavLink;
