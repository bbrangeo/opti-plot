import React from 'react';

export const RootContext = React.createContext({
  user: null,
  updateUser: () => {}  
})