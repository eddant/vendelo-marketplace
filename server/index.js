import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'

import articuloRouter from './routes/articulos.js'
import userRouter from './routes/user.js'

const app = express()

dotenv.config()

app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(fileUpload())
app.use(cors())

app.use('/api/articulos', articuloRouter)
app.use('/api/user', userRouter)

cloudinary.config({ 
    cloud_name: 'dpr5dgeah', 
    api_key: '972864686846586', 
    api_secret: 'D9jSEL5ZzMxW9tXcwJaINmraFhU' 
  });

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Connected to PORT: ${PORT}`)))
    .catch((error) => console.log(error))