import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Articles } from './components/Articles';
import { Search } from './components/Search';

function App() {
  return (
    <div className="App">
      <Search/>
      <Articles/>
    </div>
  );
}

export default App;
