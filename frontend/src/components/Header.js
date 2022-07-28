import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../store'

const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  // console.log(isLoggedIn);

  const [value, setValue] = useState(0)
  return (
    <AppBar
      position='sticky'
      sx={{
        background:
          'linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)'
      }}
    >
      <Toolbar>
        <Typography variant='h4'>MoviesApp</Typography>
        {isLoggedIn && (
          <Box sx={{ margin: 'auto' }} display='flex'>
            <Tabs
              textColor='inherit'
              value={value}
              onChange={() => (value === 0 ? setValue(1) : setValue(0))}
            >
              <Tab LinkComponent={Link} to='/Movies' label='ALL MOVIES'></Tab>
              <Tab LinkComponent={Link} to='/myMovies' label='MY MOVIES'></Tab>
              <Tab
                LinkComponent={Link}
                to='/Movies/add'
                label='ADD MOVIES'
              ></Tab>
            </Tabs>
          </Box>
        )}
        <Box display='flex' marginLeft='auto'>
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to='/login'
                variant='contained'
                sx={{ margin: 1, borderRadius: 10 }}
                color='warning'
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to='/signup'
                variant='contained'
                sx={{ margin: 1, borderRadius: 10 }}
                color='warning'
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to='/login'
              variant='contained'
              sx={{ margin: 1, borderRadius: 10 }}
              color='warning'
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
