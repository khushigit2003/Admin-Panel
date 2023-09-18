import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import { useNotification } from '../Context/NotificationProvider';
import NotFound from './NotFound';
import { getPost } from '../Api/post';

export default function UpdatePost() {

   const {slug} = useParams();
   const {updateNotification} = useNotification();
   const {notFound , setNotFound} = useState(false);
   const[postInfo , setPostInfo] = useState(null);
   const [busy, setBusy] = useState(false);


   const fetchPosts = async() =>{
    const { error , post} = await getPost(slug)
    if(error) {
        setNotFound(true);
        return updateNotification('error' , error);
    }

    console.log(post);

    setPostInfo({...post, tags:post.tags?.join(', ')})
   };

   useEffect(() => {
    fetchPosts();
   },[]);
   
   const handleSubmit = async(data) =>{
    setBusy(true);
   const{error,post }= await UpdatePost( postInfo.id, data);
   setBusy(false);
   if(error){
    return updateNotification(error);
   }
   setPostInfo({...post , tags:post.tags?.join(', ')});
  };

  if(notFound) return <NotFound/>;



  return (
    <PostForm 
    onSubmit={handleSubmit}
     initialPost={postInfo} 
     busy={busy}
     postBtnTitle="Update"
     resetAfterSubmit
     />
  );
}
