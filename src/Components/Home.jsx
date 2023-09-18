import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../Api/post';
import PostCard from './PostCard';
import { useNotification } from '../Context/NotificationProvider';
import { useSearch } from '../Context/SearchProvider';
import { deletePost } from '../Api/post';

let pageNo = 0;
const POST_LIMIT = 9;

const getPaginationCount = (length) => {
  const division = length / POST_LIMIT;
  if (division % 1 !== 0) {
    return Math.floor(division) + 1;
  }
  return division;
};

export default function Home() {
  const samplePosts = [
    {
      id: 1,
      title: "Sample Post 1",
      content: "This is the content of Sample Post 1.",
      author: "Author 1",
    },
    {
      id: 2,
      title: "Sample Post 2",
      content: "This is the content of Sample Post 2.",
      author: "Author 2",
    },
    {
      id: 3,
      title: "Sample Post 3",
      content: "This is the content of Sample Post 3.",
      author: "Author 3",
    },
  ];

  const { searchResults } = useSearch();
  const [posts, setPosts] = useState(samplePosts);
  const [totalPostCount, setTotalPostCount] = useState(samplePosts.length);
  const paginationCount = getPaginationCount(totalPostCount);
  const [paginationArr, setPaginationArr] = useState([]);
  const [updateNotification] = useNotification();

  const fetchPosts = async () => {
    const result = await getAllPosts(pageNo, POST_LIMIT);

    if (result.error) return updateNotification('error', result.error);

    const { posts: fetchedPosts, postCount } = result.data;

    setPaginationArr(Array.from({ length: paginationCount }, (_, i) => i));
    setPosts(fetchedPosts);
    setTotalPostCount(postCount);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchMorePosts = (index) => {
    pageNo = index;
    fetchPosts();
  };

  const handleDelete = async ({ id }) => {
    const confirmed = window.confirm('Are you Sure?');
    if (!confirmed) return;

    const { error, message } = await deletePost(id);

    if (error) return updateNotification('error', error);
    updateNotification('success', message);

    const newPosts = posts.filter((p) => p.id !== id);
    setPosts(newPosts);
  };

  return (
    <div>
      <div className='grid grid-cols-3 gap-3 pb-5'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onDeleteClick={() => handleDelete(post)} />
          ))
        ) : null}
      </div>

      {paginationArr.length > 1 && !Array.isArray(searchResults) ? (
        <div className="py-5 flex justify-center items-center space-x-3">
          {paginationArr.map((index) => (
            <button
              key={index}
              onClick={() => fetchMorePosts(index)}
              className={index === 0 ? 'text-blue-500 border-b-2 border-b-blue-500' : 'text-gray-500'}
            >
              {index + 1}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
