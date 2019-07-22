import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Login } from '../Login';

describe('Login page components unit test', () => {
  it('it should render all the necessary compoents', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(queryByTestId('username')).toBeTruthy();
    expect(queryByTestId('password')).toBeTruthy();
    expect(queryByTestId('submit')).toBeTruthy();
  });
});
