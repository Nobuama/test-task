import React from 'react';
import {TextField, IconButton} from '@mui/material';
import { ArticleState } from './Articles';

interface SearchProps {
  search: ArticleState[] | undefined,
  articles: ArticleState[] | undefined,
  setSearch: React.Dispatch<React.SetStateAction<ArticleState[]>>,
}
export const Search: React.FC<SearchProps> = ({search, setSearch, articles}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (search && articles) {
      if(e.target.value.length === 0){setSearch(articles)}
      
      const searchByTitle = articles.filter(el => el.title.toLowerCase().includes(e.target.value.toLowerCase()));
      const searchByContent = articles.filter(el => 
        el.summary.toLowerCase()
        .includes(e.target.value.toLowerCase()));
      const unique = new Set(searchByTitle.concat(searchByContent));
      const result = Array.from(unique);
      setSearch(result);
    }
  };

  return(
    <form>
      <TextField 
      placeholder='Search...'
      className='searchbar'
      size='small'
      variant="outlined"
      onChange={handleChange}
      >
      </TextField>
      <IconButton type="submit" aria-label="search"/>
    </form>
  )
};