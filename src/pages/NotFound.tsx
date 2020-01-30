import React from 'react';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import { SimplePage } from '../common/Style';

const NotFound = () => (
  <SimplePage>
    The page you were looking for was not found. Go to the main page
      <Button
      type="link"
      onClick={() => {
        navigate('/');
      }}
    >
      Click here
      </Button>
  </SimplePage>
);

export default NotFound;