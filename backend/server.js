import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import connectDB from './config/db.js'

import userRoutes from './routers/userRoutes.js'

connectDB();

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Server is ready...')
})

app.listen(port, () => console.log(`Server has connected on port ${port}`))