import { Alert, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'

const UserMovies = () => {
  const [blogs, setBlogs] = useState()
  const id = localStorage.getItem('userId')
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch(err => Alert(err.message))
    const data = await res.data
    return data
  }
  useEffect(() => {
    sendRequest().then(data => setBlogs(data.user.blogs))
  }, [])
  // console.log(blogs, 'myblogs')
  return (
    <Grid container spacing={2}>
      {blogs &&
        blogs.map(blog => (
          <Grid key={blog._id} item xs={4}>
            <MovieCard id={blog._id} isUser={true} {...blog} />
          </Grid>
        ))}
    </Grid>
  )
}

export default UserMovies
