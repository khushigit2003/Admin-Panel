import React from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { useState } from 'react';
import SearchBar from './Components/SearchBar';
import CreatePost from './Components/CreatePost';
import Home from './Components/Home';
import DeviceView from './Components/DeviceView';
import HomeNew from './Components/HomeNew';

export default function App() {
    const [closedNav, setClosedNav] = useState(false); //closedNav and setClosedNav are state properties used to toggle the navbar
 
    const toggleNav = () => {
      setClosedNav(!closedNav); //if closedNav is false , it'll make it true and vice versa
    };
  
    const getNavWidth = () => (closedNav ? 'w-16 ' : 'w-56 ');
  
    return (
      <div className='flex'>
        <div className={getNavWidth() + " min-h-screen  transition-width border border-r"}>
          <div className='sticky top-0'>
          <Navbar closed={closedNav}/>
          </div>
        </div>
  
        <div className='flex-1 min-h-screen'>
        <div className='sticky top-0'>
          <div className="flex item-center p-2 space-x-2">
          <button onClick={toggleNav}>
            {closedNav ? (
            <AiOutlineMenuUnfold size={25} />):
            (<AiOutlineMenuFold size={25} />)}
          </button>
  
           <SearchBar /> 
          </div>
          </div>
          
  
  
          <div className='max-w-screen-lg mx-auto'>
            <Routes>
              <Route path='/' element={<HomeNew/>} />
              <Route path='/create-post' element={<CreatePost/>} />
              {/* <Route path='/update-post/:slug' element={<UpdatePost/>} />
              <Route path='*' element={<NotFound/>} /> */}
              <Route Path='/device-view' element={<DeviceView/>}/>
            </Routes>
            
          </div>
        </div>
      </div>
  )
}
