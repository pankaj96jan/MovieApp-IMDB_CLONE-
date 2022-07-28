import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import { Grid } from '@mui/material'

const Movies = () => {
  const [blogs, setBlogs] = useState()
  const sendRequest = async () => {
    const res = await axios
      .get('http://localhost:5000/api/blog')
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs))
  }, [])
  // console.log(blogs);
  return (
    <Grid container spacing={2}>
      {blogs &&
        blogs.map((blog, index) => (
          <Grid key={blog._id} item xs={4}>
            <MovieCard
              id={blog._id}
              isUser={localStorage.getItem('userId') === blog.user}
              {...blog}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default Movies
