import React, { Children , createContext, useContext , useEffect, useRef, useState} from 'react';

export const NotificationContext = createContext();
 
let timeoutid;

export default function NotificationProvider({ children }) {

    const [Notification , setNotification] = useState({
        type:'',
        value:''
    });

    const[BackgroundColor , setBackgroundColor] = useState();

    const notificationRef= useRef()

    const updateNotification = (type , value)=>{
       
        if(!type || !value) return ;
        if(timeoutid) clearTimeout(timeoutid);

        switch(type){
            case 'error':
                setBackgroundColor("bg-red-400");
                break;
            case 'warning':
                setBackgroundColor("bg-orange-400");
                break; 
            case 'success':
                setBackgroundColor("bg-green-400");
                break;  
            default:
                setBackgroundColor("bg-red-400");

                setNotification({type , value});
                timeoutid = setTimeout(() => {
                    setNotification({type : ' ' , value: ' '});
                } , 3000);
        }
    };

   
useEffect(() => {
    notificationRef.current?.classList.remove('bottom-14' , 'opacity-0')
    notificationRef.current?.classList.add('bottom-10' , 'opacity-1')
    //return () => {
        //notificationRef.current?.classList.remove('bottom-14' , 'opacity-0')
       // notificationRef.current?.classList.remove('bottom-10' , 'opacity-1')
    //}
} , [Notification.value]);
  return (
    <>
    
        <NotificationContext.Provider value={{Notification , updateNotification}}>
           { children }
        </NotificationContext.Provider>
        {Notification.value ? <p ref={notificationRef} className={BackgroundColor + "rounded-full p-2 text-white fixed bottom-14 opacity-0 left-1/2 -translate-x-1/2 transition duration-150 ease-linear"} >{Notification.value}</p> : null
        }
      
    </>
  )
};

export const useNotification = () => useContext(NotificationContext);
