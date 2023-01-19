import React from 'react';
import {TextField, IconButton} from '@mui/material';
import { Articles, ArticleState } from './Articles';

interface SearchProps {
  articles: ArticleState[] | undefined,
  setArticles: React.Dispatch<React.SetStateAction<ArticleState[]>>,
}
export const Search: React.FC<SearchProps> = ({articles, setArticles}) => {

  const onChange = (e: Event & {target: HTMLInputElement}) => {
    if (articles) {
      setArticles(articles.filter(el => el.title == e.target.value));
    }
  }

  return(
    <form>
      <TextField 
      placeholder='Search...'
      className='searchbar'
      size='small'
      variant="outlined"
      onChange={() => onChange}
      >
      </TextField>
      <IconButton type="submit" aria-label="search">
        {/* <SearchIcon style={{ fill: "blue" }} /> */}
      </IconButton>
    </form>
  )
};