import React from 'react'
import { searchPost } from '../Api/post';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationProvider';
import { createContext } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { NotificationContext } from './NotificationProvider';


const SearchContext = createContext();
export default function SearchProvider({children}) {

    const [searchResult , setSearchResult] = useState([]);
    const navigate = useNavigate();
    const { updateNotification } = useContext(NotificationContext);

    const handleSearch = async(query) => {
       const {error , posts} =  await searchPost(query);

       if(error) return updateNotification('error' , error);

       setSearchResult(posts);
       navigate("/");
    };

    const resetSearch = () => {
 
        setSearchResult([]);
     };

  return (
    <SearchContext.Provider value={{searchResult , handleSearch , resetSearch}}>
        {children}
    </SearchContext.Provider>
  )
};

export const useSearch = () => useContext(SearchContext)
