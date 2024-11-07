import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import { UserContext } from '../context/UserContext';
import { apiService } from '../services/ApiService';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../services/ApiService');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('CreateAccountScreen', () => {
  const dispatchMock = jest.fn();
  const mockNavigation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <UserContext.Provider value={{ dispatch: dispatchMock }}>
        <NavigationContainer>
          <CreateAccountScreen />
        </NavigationContainer>
      </UserContext.Provider>
    );

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderComponent();
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByPlaceholderText('Email address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('shows validation errors when form inputs are invalid', async () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Full Name'), '');
    fireEvent.changeText(getByPlaceholderText('Email address'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'short');

    fireEvent.press(getByText('SIGN UP'));

    expect(getByText('Name must be 1-50 characters')).toBeTruthy();
    expect(getByText('Invalid email format')).toBeTruthy();
    expect(getByText('Password must be at least 8 characters')).toBeTruthy();
    expect(getByText('You must accept the terms and privacy policy')).toBeTruthy();
  });

  it('calls handleSubmit on valid form inputs and navigates to success screen', async () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email address'), 'john.doe@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('I agree with Terms and Privacy'));

    (apiService.createUser as jest.Mock).mockResolvedValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    fireEvent.press(getByText('SIGN UP'));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'SET_USER',
        payload: { name: 'John Doe', email: 'john.doe@example.com' },
      });
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Success');
    });
  });

  it('calls handleGoogleSignUp when Google Sign-Up button is pressed', () => {
    const { getByText } = renderComponent();

    console.log = jest.fn(); // Mock console log for testing Google Sign-Up
    fireEvent.press(getByText('Sign Up with Google'));

    expect(console.log).toHaveBeenCalledWith('Google Sign Up pressed');
  });
});
