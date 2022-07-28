import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MovieCard = ({ description, image, title, isUser, id }) => {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/myMovies/${id}`)
  }

  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`)
    const data = await res.data
    return data
  }

  const handleDelete = () => {
    deleteRequest().then((data)=>console.log(data))
    .then(()=>navigate("/"))
    .then(()=>navigate("/Movies"))
  }
  return (
    <Card
      sx={{
        // maxWidth: "40%",
        margin: 'auto',
        mt: 2,
        padding: 1,
        boxShadow: '5px 5px 10px #ccc',
        ':hover': {
          boxShadow: '10px 10px 20px #ccc'
        }
      }}
    >
      <CardMedia component='img' image={image} alt='Paella dish' />
      <Typography variant='h5'>{title}</Typography>
      <CardContent>
        <Typography variant='body2' color=''>
          <i>{description}</i>
        </Typography>
        {isUser && (
          <Box>
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <BorderColorIcon />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{ marginLeft: 'auto' }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default MovieCard
