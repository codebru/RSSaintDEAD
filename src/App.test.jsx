import React from 'react';
import { render } from '@testing-library/react';
import AppWithStore from './App';

test('renders without crashing', () => {
  const { baseElement } = render(<AppWithStore />);
  expect(baseElement).toBeDefined();
});
