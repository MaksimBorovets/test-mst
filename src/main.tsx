import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react';

import App from './App.tsx';
import UserStore from './stores/user/UserStore.ts';

import './index.css';

const userStore = UserStore.create({ users: [] });

const stores = {
  userStore,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
);
