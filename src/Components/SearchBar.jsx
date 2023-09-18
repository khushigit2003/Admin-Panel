import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useSearch } from '../Context/SearchProvider';

export default function SearchBar() {
  const {handleSearch , resetSearch , searchResult} = useSearch();

  const [query , setQuery ] = useState('');
  
  const handleSubmit= (e) =>{
    e.preventDefault()
    if(!query.trim()) return;
    handleSearch(query);
  }   

const handleReset = (e) => {
  resetSearch();  
  setQuery('');
   
};

const handleKeyDown = (e) => {
  if((e.key==='Escape')) { 
    setQuery("");
    resetSearch();
}};

  return (
    <div>
      <form  className="relative" onSubmit={handleSubmit}>
        <input 
        value = {query} 
        onKeyDown={handleKeyDown}
        onChange={({target})=> setQuery(target.value)}
        placeholder="Search..."
        className  = " border border-gray-500 outline-none rounded p-1 ring focus:ring-1 ring-blue-500 w-56" />
        {searchResult.length ? < button onClick={handleReset} className='absolute top-1/2 
        -translate-y-1/2 textgray700 '>
          <AiOutlineClose/>
          </button> : null}
      </form>
    </div>
  )
};
