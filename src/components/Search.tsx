import React from 'react';
import {Input, Paper} from '@mui/material';
import { ArticleState } from '../App';
import { searchIcon } from '../assets/logo/indext';

interface SearchProps {
  search: ArticleState[] | undefined,
  articles: ArticleState[] | undefined,
  setSearch: React.Dispatch<React.SetStateAction<ArticleState[]>>,
}
export const Search: React.FC<SearchProps> = ({search, setSearch, articles}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (search && articles) {
      let str = e.target.value.toLowerCase();

      if(e.target.value.length === 0){setSearch(articles)}
      
      const searchByTitle = articles.filter(el => el.title.toLowerCase().includes(str));
      const searchByContent = articles.filter(el => el.summary.toLowerCase().includes(str));
      const unique = new Set(searchByTitle.concat(searchByContent));
      const arr = Array.from(unique);
      const result = arr.map(item => {
        let newTitle = item.title.replace(
          new RegExp(str, 'gi'),
          match => `<mark>${match}</mark>`
        )
        let newSum = item.summary.replace(
          new RegExp(str, 'gi'),
          match => `<mark>${match}</mark>`
        )
        return {
          ...item,
          title: newTitle,
          summary: newSum,
        }
      })
      
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