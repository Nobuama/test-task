import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { arrow, calendar } from '../assets/logo/indext';
import { Search } from './Search';
import { Link } from 'react-router-dom';
import { ArticleState } from '../App';

interface ArticlesProps{
  articles: ArticleState[];
}

export const Articles: React.FC<ArticlesProps> = ({articles}) => {
  const [search, setSearch] = useState<ArticleState[]>([]);
  const truncate = (str: string, length: number) => {
    if(str.split(' ').length == length) return str;
    return str.split(' ').splice(0, length).join(' ') + '…';
  };
  const dateToMDY = (date: string) => {
    let result = new Date(date)
    .toDateString()
    .slice(4, 15)
    .split(' ')
    result[1] = result[1] + 'th,';
    return result.join(' ');
  };
  
  useEffect(() => {
    setSearch(articles);
  }, [articles]);


  return(
    <div className='wrapper'>
      <Search search={search} setSearch ={setSearch} articles={articles}/>
      <Grid container spacing={8}>
        {search?.map(art => (
          <Grid key={art.id} item xs={4}>
            <Paper className='card'>
              <img className='card_img' src={art.imageUrl} alt="" />
              <div className='card_text'>
                <Typography variant='body2' component="p" className='date'>
                  <img src={calendar} alt="" />
                  {dateToMDY(art.publishedAt)}
                </Typography>
                <Typography variant='h5' component="h2">{truncate(art.title, 6)}</Typography>
                <Typography variant='body2' component="p">{truncate(art.summary, 20)}</Typography>
                <Link to={`/${art.id}`} className='bold_text'>
                  Read more
                  <img src={arrow} alt="" />
                </Link>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
};
