import React from 'react';
import './assets/styles/styles.css';
import { Articles } from './components/Articles';
import {Routes, Route, Link} from 'react-router-dom';
import { Page } from './components/Page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Articles/>}/>
        <Route path='/search' element={<Page img="" title=''/>} />
      </Routes>
    </div>
  );
}

export default App;
