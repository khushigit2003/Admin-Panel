import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap';

const mdRules = [
    {title: "From h1 to h6 " , rule: "#Heading -> ###### Heading"},
    {title: "Blockquote" , rule: "> Your Quote"},
    {title: "Image" , rule: "![image alt](http://image_url.com)"},
    {title: "Link" , rule: "[Link Text](http://your_link.com)"},
  ];

export default function Markdown() {

    const Container = useRef();

    useEffect (() =>{
    Container.current?.classList.remove('-translate-y-5' , 'opacity-0');
    Container.current?.classList.add('-translate-y-0' , 'opacity-1');
    },[])

  return (
    <div ref={Container} className="bg-white  
    transition -translate-y-5  opacity-0">
          <h1 className='font-semibold text-center'>General Markdown Rules</h1>
          <ul>
            {mdRules.map(({title , rule}) => {
              return <li key={title}>
                <p className='font-semibold text-gray-700'>{title}</p>
                <p className='font-semibold text-gray-700 pl-2 font-mono'>{rule}</p>
              </li>
            })}
            <li className='text-centre text-blue-500'>
              <a href='https://www.markdownguide.org/' target='_blank'>Find Out More</a>
            </li>
          </ul>
         </div>
  )
}
