import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import blogRouter from './routes/blog-routes'
import router from './routes/user-routes'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/user', router) //http://localhost:5000/api/user/
app.use('/api/blog', blogRouter)

mongoose
//   .connect('mongodb://localhost:27017/MoviesApp')
  .connect("mongodb+srv://pankajsoni:Mongo1996$@blogcluster.cocmlds.mongodb.net/?retryWrites=true&w=majority")
  .then(() => app.listen(5000))
  .then(() =>
    console.log('Connected TO Database and Listening TO Localhost 5000')
  )
  .catch(err => console.log(err))
