import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const MovieDetail = () => {
  const [inputs, setInputs] = useState({})
  const [movie, setMovie] = useState()
  const navigate = useNavigate()

  const id = useParams().id

  const labelStyle = {
    mb: 1,
    mt: 2,
    fontSize: '24px',
    fontWeight: 'bold'
  }
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch(err => alert(err.message))
    const data = res.data
    return data
  }
  useEffect(() => {
    fetchDetails().then(data => {
      setMovie(data.blog)
      setInputs({
        title: data.blog.title,
        description: data.blog.description
      })
    })
  }, [id])

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description
      })
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }

  const handleChange = e => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    sendRequest()
      .then(data => console.log(data))
      .then(() => navigate('/myMovies'))
  }

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={2}
            borderColor='orange'
            borderRadius={5}
            boxShadow='10px 10px 20px #ccc'
            padding={3}
            margin={3}
            display='flex'
            flexDirection={'column'}
            width='80%'
          >
            <Typography
              fontWeight={'bold'}
              padding={3}
              color='grey'
              variant='h2'
              textAlign={'center'}
            >
              update Movie
            </Typography>
            <InputLabel sx={labelStyle}>Title</InputLabel>
            <TextField
              name='title'
              value={inputs.title || ''}
              onChange={handleChange}
              margin='normal'
              variant='outlined'
              placeholder='name'
            />
            <InputLabel sx={labelStyle}>Description</InputLabel>
            <TextField
              name='description'
              value={inputs.description || ''}
              onChange={handleChange}
              margin='normal'
              variant='outlined'
              placeholder='Description'
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant='contained'
              color='warning'
              type='submit'
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  )
}

export default MovieDetail
