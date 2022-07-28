import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
// import { authActions } from "../store";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../store'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const sendRequest = async () => {
    const res = await axios
      .post(`http://localhost:5000/api/user/login`, {
        email: inputs.email,
        password: inputs.password
      })
      .catch(err => alert(err.message))
    const data = res.data
    return data
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(inputs)
    sendRequest()
      .then(data => localStorage.setItem('userId', data.user._id))
      .then(() => navigate('/movies'))
      .then(() => dispatch(authActions.login()))
  }

  const handleChange = e => {
    setInputs(obj => ({
      ...obj,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display='flex'
          flexDirection={'column'}
          alignItems='center'
          justifyContent={'center'}
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant='h2' padding={3} textAlign='center'>
            Login
          </Typography>
          <TextField
            name='email'
            value={inputs.email}
            type={'email'}
            onChange={handleChange}
            placeholder='Email'
            margin='normal'
          />
          <TextField
            name='password'
            value={inputs.password}
            type={'password'}
            placeholder='Password'
            onChange={handleChange}
            margin='normal'
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ borderRadius: 2, marginTop: 3 }}
            color='warning'
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Login
// 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 (PAT)
