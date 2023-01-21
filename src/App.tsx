import { useEffect, useState } from 'react';
import './assets/styles/index.css';
import { Articles } from './components/Articles';
import {Routes, Route, } from 'react-router-dom';
import { Page } from './components/Page';

export interface ArticleState {
  id: string,
  title: string,
  url: string,
  imageUrl: string,
  publishedAt: string,
  updatedAt: string,
  summary: string,
};

function App() {
  const [articles, setArticles] = useState<ArticleState[]>([]);

  useEffect(() => {
    fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=100')
      .then(res => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then(data => setArticles(data))
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Articles articles={articles}/>}/>
        <Route path='/:id' element={<Page/>} />
      </Routes>
    </div>
  );
}

export default App;
