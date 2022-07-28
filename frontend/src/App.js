import { Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react'
import './App.css'
import AddMovie from './components/AddMovie'
import Login from './components/Login'
import MovieDetail from './components/MovieDetail'
import Movies from './components/Movies'
import Header from './components/Header'
import UserMovies from './components/UserMovies'
import { useDispatch, useSelector } from 'react-redux'
import Signup from './components/Signup'
import { authActions } from './store'

function App () {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(authActions.login())
    }
  }, [dispatch])
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
        {isLoggedIn && (
          <>
            <Route path='/Movies' element={<Movies />} />
            <Route path='/Movies/add' element={<AddMovie />} />
            <Route path='/myMovies' element={<UserMovies />} />
            <Route path='/myMovies/:id' element={<MovieDetail />} />
            </>
            )}
          </Routes>
      </main>
    </React.Fragment>
  )
}

export default App
