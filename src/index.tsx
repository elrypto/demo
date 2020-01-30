import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouteComponentProps } from '@reach/router';
import 'regenerator-runtime/runtime'; //allows async without babel
import './bootstrap.min.css';
import './fixed.css';
import './style.css';
import 'antd/dist/antd.css';

import App from './App';
import Main from './pages/Main';
import Config from './pages/Config';
import Play from './pages/Play';
import Basic from './pages/Basic';
import Result from './pages/Result';
import NotFound from './pages/NotFound';
import Test from './pages/Test';

/*
  RouterPage router allows normal component pages to work as React Router components
*/
const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

ReactDOM.render(
  <Router>
    <App path="/">
      <RouterPage pageComponent={<Main />} path="/" />
      <RouterPage pageComponent={<Config />} path="/config" />
      <RouterPage pageComponent={<Play />} path="/play" />
      <RouterPage pageComponent={<Result />} path="/result" />
      <RouterPage pageComponent={<Test />} path="/test" />
      <RouterPage pageComponent={<Basic />} path="/transitionless" />
      <RouterPage pageComponent={<NotFound />} default />
    </App>
  </Router>,
  document.getElementById('root')
);
