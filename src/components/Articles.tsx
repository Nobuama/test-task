import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { calendar } from '../assets/logo/indext';
import { Search } from './Search';
import {Routes, Route, Link} from 'react-router-dom';
import { Page } from './Page';

interface ArticlesProps {
  setPage: React.Dispatch<React.SetStateAction<ArticleState | undefined>>;
  page:ArticleState | undefined;
}

export interface ArticleState {
  id: string,
  title: string,
  url: string,
  imageUrl: string,
  publishedAt: Date,
  updatedAt: string,
  summary: string,
};

export const Articles: React.FC<ArticlesProps> = ({setPage, page}) => {
  const [articles, setArticles] = useState<ArticleState[]>([]);
  const [search, setSearch] = useState<ArticleState[]>([]);

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
  
  useEffect(() => {
    setSearch(articles);
  }, [articles]);
  
  const findById = (e: React.MouseEvent<HTMLDivElement>) => {
      setPage(articles.find(article => article.id === (e.target as Element).id));
      console.log(page);
  };

  const truncate = (str: string) => {
    return str.split(' ').splice(0, 22).join(' ') + '…';
  };

  return(
    <>
    <Search search={search} setSearch ={setSearch} articles={articles}/>
    <Box>
      <Grid container spacing={8}>
        {search?.map(art => (
          <Grid key={art.id} item xs={4} onClick={findById}>
            <Paper style={{'height': '530px'}}>
              <img src={art.imageUrl} alt="" style={{'height': '217px', 'width' : '400px'}}/>
              <Typography align='left' variant='body2' component="p">
                <img src={calendar} alt="" />
                {new Date(art.publishedAt).toDateString()}
              </Typography>
              <Typography align='left' variant='h5' component="h2">{art.title}</Typography>
              <Typography align='left' variant='body2' component="p">{truncate(art.summary)}</Typography>
              <Link id={art.id} to={`/${art.id}`} className='card__bnt'>Read more</Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  )
};
