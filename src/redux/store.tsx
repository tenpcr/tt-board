/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/redux/reducers';

export const store = configureStore({
  reducer: rootReducer,
});

const ProviderStore = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};

export default ProviderStore;
