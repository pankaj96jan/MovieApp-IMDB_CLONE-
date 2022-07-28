import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../store'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  })
  const isSignUp = useSelector(state => state.isSignUp)
  console.log(isSignUp, 'signUp')

  const sendRequest = async () => {
    const res = await axios
      .post(`http://localhost:5000/api/user/signup`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      })
      .catch(err => alert(err.message))

    const data = res.data
    console.log(data, 'signup')

    return data
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(() => dispatch(authActions.signUp())).then(()=>navigate("/login"))
  }

  const handleChange = e => {
    setInputs(obj => ({
      ...obj,
      [e.target.name]: e.target.value
    }))
  }
  return (
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
          Signup
        </Typography>

        <TextField
          name='name'
          value={inputs.name}
          onChange={handleChange}
          placeholder='Name'
          margin='normal'
        />
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
  )
}

export default Signup
