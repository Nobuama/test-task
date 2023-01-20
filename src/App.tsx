import React, { useState } from 'react';
import './assets/styles/styles.css';
import { Articles, ArticleState } from './components/Articles';
import {Routes, Route, Link} from 'react-router-dom';
import { Page } from './components/Page';

function App() {
  const [page, setPage] = useState<ArticleState>();

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Articles setPage={setPage} page={page}/>}/>
        <Route path='/:id' element={<Page img={page?.imageUrl} title={page?.title}/>} />
      </Routes>
    </div>
  );
}

export default App;
