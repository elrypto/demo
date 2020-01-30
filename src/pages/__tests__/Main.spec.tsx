import * as React from 'react';
import { render } from 'react-testing-library';

import Main from '../Main';

/**
 * Example snapshot test
 */
it('inserts text in h1', () => {
  const { asFragment } = render(<Main />);
  expect(asFragment()).toMatchSnapshot();
});
