import React, { useEffect, useState } from 'react';
import PostForm, { defaultPost } from './PostForm';
import { useNotification } from '../Context/NotificationProvider';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../Api/post';

export default function CreatePost() {
  const [postInfo, setPostInfo] = useState(null);
  const notification = useNotification(); // Use the imported useNotification directly
  const [busy, setBusy] = useState(false);
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, post } = await createPost(data); // Make sure createPost is correctly imported and defined
    setBusy(false);
    if (error) {
      notification(error); // Use the imported notification function
    }
    resetAfterSubmit && navigate(`/update-post${post.slug}`);
  };

  useEffect(() => {
    const result = localStorage.getItem('blogPost');
    if (result) {
      const oldPost = JSON.parse(result);
      setPostInfo({ ...defaultPost, ...oldPost });
    }
  }, []);

  return (
    <PostForm
      onSubmit={handleSubmit}
      initialPost={postInfo}
      busy={busy}
      postBtnTitle="Post"
      resetAfterSubmit={resetAfterSubmit}
    />
  );
}
