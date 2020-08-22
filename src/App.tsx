import React from 'react';
import { hot } from 'react-hot-loader';
import MainApp from './components/MainApp';

function App() {
  return <MainApp />;
}

export default process.env.NODE_ENV === 'development' ? hot(module)(App) : App;
