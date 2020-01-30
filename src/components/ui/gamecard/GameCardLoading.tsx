import React from 'react';
import ContentLoader from 'react-content-loader';

const GameCardLoading = () => (
  <ContentLoader viewBox="0 0 400 200">
    <rect x="10" y="15" rx="2" ry="2" width="100%" height="15" />
    <rect x="10" y="55" rx="2" ry="2" width="100%" height="50" />
    <rect x="10" y="125" rx="2" ry="2" width="100%" height="10" />
    <rect x="10" y="145" rx="2" ry="2" width="100%" height="10" />
  </ContentLoader>
);

export default GameCardLoading;
