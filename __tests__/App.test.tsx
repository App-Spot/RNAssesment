import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

test('App renders without crashing', () => {
  const { getByText } = render(<App />);
  expect(getByText('Welcome')).toBeTruthy(); // Adjust to text in your App component
});