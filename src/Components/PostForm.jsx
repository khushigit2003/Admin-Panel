import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import {ImSpinner11 , ImSpinner3, ImEye , ImFilePicture , ImFilesEmpty} from "react-icons/im";
import { useNotification } from '../Context/NotificationProvider';
import { uploadImage } from '../Api/post';
import Markdown from './Markdown';
import DeviceView from './DeviceView';

export const defaultPost = {
  title:'',
  thumbnail:'',
  featured:false,
  content:'',
  tags:'',
  meta:'',
}

export default function PostForm({initialPost , resetAfterSubmit, postBtnTitle, onSubmit}) {
  const [postInfo , setPostInfo] = useState({...defaultPost});
  const {title , content, featured , tags , meta } = postInfo ; 
  const [SelectedThumbnailURL , setSelectedThumbnailURL] = useState(' ');
  const [ImageURLToCopy , setImageURLToCopy] = useState(' ');
  const [imageUploading , setImageUplaoding]= useState(false);
  const [displayMarkdown , setdisplayMarkdown] = useState();
  const [showDeviceView , setshowDeviceView] = useState(false);
  const [busy , setBusy] = useState(false);

  const {updateNotification} = useNotification()

  useEffect(()=>{
    if(initialPost){
        setSelectedThumbnailURL(initialPost?.thumbnail);
    }
    setPostInfo({...initialPost});
    return () =>{
        if(resetAfterSubmit) resetForm();
    }
  },[initialPost , resetAfterSubmit]);

   const handleImageUpload = async({target }) => {

  if(imageUploading) return;

   const file= target.files[0];
   if(!file.type?.include("image")){
    return updateNotification("error " , "This is not an Image");
   }

   setImageUplaoding(true)

   const formData = new FormData()
   formData.append('image' , file);
   const {error , image} = await uploadImage(formData);
   setImageUplaoding(false)
   if(error) return updateNotification('error' , error)
   setImageURLToCopy(image);

};

const handleOnCopy = () => {
  const textToCopy = `![Add Image Description]]$({ImageURLToCopy})`
  navigator.clipboard.writeText(ImageURLToCopy);
};


  const handleChange = ({target}) => {
    const{value , name , checked} = target;

    if(name==='thumbnail'){
      const file = target.files[0];
      if(!file.type.includes('image')){
        return alert("This is not at image")
      }
      setPostInfo({...postInfo, thumbnail: file});
      return setSelectedThumbnailURL(URL.createObjectURL(file))
    };

    if(name==='featured')
    localStorage.setItem('blogPost' ,JSON.stringi({...postInfo , featured:checked}))
    return setPostInfo({...postInfo , [name]: checked});

    if(name==='tags'){
    const newTags = tags.split(', ');
      if(newTags.length > 4){
    updateNotification("warning" , "Only first 4 tags will be selected")
  }
  }

  if(name==="meta" && meta?.length >= 150 ){
    setPostInfo({...postInfo, meta: value.substring(0,149)});
  }
  else{

    const newPost = {...postInfo,[name]:value}
    setPostInfo({...newPost});

    localStorage.setItem('blogPost' ,JSON.stringi({...newPost}))
  }

  };

  const resetForm = () =>{
    setPostInfo({...defaultPost})
    localStorage.removeItem('blogPost');
  }
  

  const handleSubmit= (e) => {
  e.preventDefault();
  const {title , content, featured , tags , meta } = postInfo;

  if(!title.trim()) return updateNotification('error' , "title is missing!")
  if(!content.trim()) return updateNotification('error' , "content is missing!")
  if(!tags.trim()) return updateNotification('error' , "tags is missing!")
  if(!meta.trim()) return updateNotification('error' , "meta is missing!")

  const slug = title
  .toLowerCase()
  .replace(/[^a-zA-Z]/g,' ')
  .split(' ')
  .filter(item=> item.trim())
  .join('-')

  const newTags = tags.split(',')
  .map(item=> item.trim())
  .splice(0,4);

  const formData = new formData();

  const finalPost = {...postInfo , tags : JSON.stringify(newTags) , slug};
  for (let key in finalPost){
    formData.append(key , finalPost[key])
  }
   
  onSubmit(formData);
  if(resetAfterSubmit) resetForm()
  };

  return ( 
    <>
    <form onSubmit={handleSubmit} className="p-2 flex">
      <div className="w-9/12 h-screen space-y-3  flex flex-col">
      <div className="flex items-centre justify-between">
        <h1 className='text-xl font-semibold text-gray-700'>
          Create New Post
        </h1>

        <div onClick={resetForm}
        className="flex items-center space-x-5">
          <button  type="button" className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition'>
          <ImSpinner11/>
          <span>Reset</span>
          </button>

          <button onClick={() => setshowDeviceView(true)} type="button" className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition'>
          <ImEye/>
          <span>View</span>
          </button>

          <button className='h-10 w-36 hover:ring-1 bg-blue-500 rounded
           text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition'>
          {busy ? <ImSpinner3 className="animate-spin mx-auto text-xl"/> : postBtnTitle}
          </button>
        </div>
        </div> 

       <div className='flex'>
       <input name='featured' onChange={handleChange} id='featured' type='checkbox' hidden></input>
       <label className=" select-none flex items-centre space-x-2 text-gray-700 cursor-pointer group" htmlFor='featured'>
        <div className='w-4 h-4 rounded-full border border-blue-500 flex items-center group-hover:border-blue-500 justify-center'>
          { featured && (<div className='w-2 h-2 rounded-full bg-blue-500  group-hover:border-blue-500 '></div>)}
        </div>
        <span className=' group-hover:border-blue-500 '>Featured</span>
       </label>
       </div>

      
       <input 
       onFocus={() => setdisplayMarkdown(false)}
       value={title}
       name='title'
       onChange={handleChange}
       type='text' className='text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold' placeholder='Post Title'></input>
      
     <div className="flex space-x-2">
        <div>
      <input onChange={handleImageUpload} id="image-input" type='file' hidden></input>
       <label htmlFor="image-input" className='flex items-center space-x-2 px-3 ring-1 ring-gray-700 rounded h-10 text-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer'>
          <span>Place Image</span>
          {!setImageUplaoding ?  <ImFilePicture /> : <ImSpinner3 className="animate-spin"/> }
          </label>
      </div> 

      {ImageURLToCopy && ( <div className='fle-1 flex justify-between bg-gray-400 rounded overflow-hidden'>
        <input type="text" value={ImageURLToCopy} className='bg-transparent px-2' disabled />
        <button onClick={handleOnCopy} type="button" className='texts-xs flex flex-col items-center justify-center p-1 bg-gray-700 text-white w-full self-stretch'>
          <ImFilesEmpty />
        <span>Copy</span>
        </button>
      </div>)}
      </div>   


       <textarea
        onFocus={() => setdisplayMarkdown(true)}
        onChange={handleChange} value={content}
       name='content' 
       className='resize-none outline-none focus:ring-1 rounded p-2 w-full flex-1 font-mono tracking-wide text-lg' placeholder='### Markdown'></textarea>
      <div>
       <label className='text-gray-500' htmlFor='tags'>Tags</label>
       <input onChange={handleChange} value={tags}
       name='tags' type='text' id="tags" className='outline-none focus:ring-1 rounded p-2 w-full ' placeholder='Tag one , Tag two'></input>
      </div> 

      <div>
       <label className='text-gray-500' htmlFor='meta'>Meta Description  {meta ? meta.length : 0}/150 </label>
       <textarea onChange={handleChange} value={meta}
       name='meta' className='resize-none outline-none focus:ring-1 rounded p-2 h-28 w-full ' placeholder='### Mrakdown'></textarea>
      </div> 
      </div>

      <div className="w-1/4 px-2 relative">
         <h1 className='text-xl font-semibold text-gray-700 mb-2'> General Mardkdown Rules</h1>
         <div>
         <input onChange={handleChange} 
         name='thumbnail' id="thumbnail" type='file' hidden></input>
         <label className='cursor-pointer' htmlFor='thumbnail'>
         {SelectedThumbnailURL ? (
          <img className='aspect-video shadow-sm rounded' src= {SelectedThumbnailURL} alt="" />
         ): <div className="border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center">
         
            
            <span>Select Thumbnail</span>
            <span className='text-xs'>Recommend Size</span>
            <span className='text-xs'>1280 * 720</span>
          </div>
         }  
         </label>
         </div>

         <div className="absolute top-1/2 -translate-y-1/2">
           {displayMarkdown && ( <Markdown/>)}
        </div>


         
      </div>
    </form>
    <DeviceView title={title} 
    content={content}
    thumbnail={SelectedThumbnailURL}
    visible={showDeviceView}
    onClose={() => setshowDeviceView(false)}/>
    </>
  );
}
 