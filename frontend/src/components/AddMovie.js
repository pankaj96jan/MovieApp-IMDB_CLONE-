import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddMovie = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: ''
  })

  const labelStyle = {
    mb: 1,
    mt: 2,
    fontSize: '24px',
    fontWeight: 'bold'
  }

  const sendRequest = async () => {
    const res = await axios
      .post('http://localhost:5000/api/blog/add', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem('userId')
      })
      .catch(err => alert(err.message))
    const data = await res.data
    return data
  }

  const handleSubmit = e => {
    e.preventDefault()
    sendRequest().then((data)=>console.log(data)).then(()=>navigate('/myMovies'))
    // console.log(inputs)
  }
  const handleChange = e => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
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
            Post Your Movie
          </Typography>
          <InputLabel value={inputs.title} sx={labelStyle}>
            Title
          </InputLabel>
          <TextField
            name='title'
            onChange={handleChange}
            margin='normal'
            label='name'
            variant='outlined'
            placeholder='name'
          />
          <InputLabel value={inputs.description} sx={labelStyle}>
            Description
          </InputLabel>
          <TextField
            name='description'
            onChange={handleChange}
            margin='normal'
            label='description'
            variant='outlined'
            placeholder='Description'
          />
          <InputLabel value={inputs.image} sx={labelStyle}>
            ImageURL
          </InputLabel>
          <TextField
            name='image'
            onChange={handleChange}
            margin='normal'
            label='Image'
            variant='outlined'
            placeholder='Image link...'
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
    </div>
  )
}

export default AddMovie
