import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { calendar } from '../assets/logo/indext';
import { Search } from './Search';

export interface ArticleState {
  id: number,
  title: string,
  url: string,
  imageUrl: string,
  publishedAt: Date,
  updatedAt: string,
};

export const Articles: React.FC = () => {
  const [articles, setArticles] = useState<ArticleState[]>();

  useEffect(() => {
    fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=100')
      .then(res => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then(data => setArticles(data));
		}, []);
  
  return(
    <>
    <Search articles={articles} setArticles={setArticles}/>
    <Box>
      <Grid container spacing={8}>
        {articles?.map(art => (
          <Grid item xs={4}>
            <Paper style={{'height': '530px'}}>
              <img src={art.imageUrl} alt="" style={{'height': '217px', 'width' : '400px'}}/>
              <Typography align='left' variant='body2' component="p">
                <img src={calendar} alt="" />
                {new Date(art.publishedAt).toDateString()}
              </Typography>
              <Typography align='left' variant='h5' component="h2">{art.title}</Typography>
              <Typography align='left' variant='body2' component="p">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui dolorem facere quae sint sunt quasi a eius quidem, eum nesciunt cumque voluptates...</Typography>
              <Button className='card__bnt'>Read more</Button>
              </Paper>
            </Grid>
        ))}
      </Grid>
    </Box>
    </>
  )
};
