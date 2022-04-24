const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extends: false}))
app.use('/api/goals', require('./routes/testRoutes'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server Started on Port ${port}`)
})
