import React from 'react';
import {TextField, Typography, IconButton, Input, Paper} from '@mui/material';
import { ArticleState } from '../App';
import { SearchOutlined } from '@mui/icons-material';
import { searchIcon } from '../assets/logo/indext';

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
    <div className='search_wrapper'>
      <p className='bold_text'>Filter by keywords</p>
      <Paper className='search_bar'>
        <img src={searchIcon} alt="" />
        <Input 
        placeholder='Search...'
        className='searchbar'
        onChange={handleChange}
        disableUnderline
        />
      </Paper>
      <p className='bold_text'>Results: {search?.length}</p>
    </div>
  )
};