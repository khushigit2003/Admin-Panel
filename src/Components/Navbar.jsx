import React from 'react'
import { AiOutlineHome,AiFillFileAdd} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';

const NavItem = ({to , value ,closed , Icon}) => {

    const commonClasses = "flex items-center space-x-2 w-full p-2 block whitespace-nowrap";
    const activeClass = commonClasses + ' bg-blue-500 text-white';
    const inActiveClass = commonClasses + ' text-gray-500';
    

  return (
    <NavLink className={({isActive})=>
        (isActive ? activeClass : inActiveClass) } 
        to={to} >
                {Icon}
                <span className={closed ? "w-0 transition-width overflow-hidden"  : " w-full transition-width overflow-hidden"}>
                {value}
                </span>
        </NavLink>
  )
};

export default function Navbar({closed}) {
    return (
        <nav>
            <div className='flex justify-centre p-3'>
                <img  className="w-14" src="./logo512.png"  alt="" />
            </div>
            <ul>
                <li><NavItem closed={closed} to='/' value='Home' Icon={<AiOutlineHome size={25} />}/></li>
                <li><NavItem closed={closed} to='/create-post' value='CreatePost' Icon={<AiFillFileAdd size={25} />}/></li>  
            </ul>
        </nav>
      )
    };
    
