// context/UserContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';

interface UserState {
  name: string;
  email: string;
}

interface UserAction {
  type: 'SET_USER';
  payload: UserState;
}

const initialState: UserState = {
  name: '',
  email: '',
};

export const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}>({ state: initialState, dispatch: () => {} });

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
