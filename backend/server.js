const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt: jwt } = require('express-jwt')

// middleware
app.use(express.json())
app.use(morgan('dev'))

// connect to DB
mongoose.connect('mongodb://0.0.0.0:27017/bloggerdb',
    console.log('Connected to the DB')
)

// routes
app.use('/auth', require('./routes/authRouter'))
app.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/posts', require('./routes/postsRouter'))
app.use('/posts', require('./routes/postsRouter'))
app.use('/api/comments', require('./routes/commentRouter'))

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    res.send({errMsg: err.message})
})

// Server
app.listen(9000, () => {
    console.log('Port is running on server 9000')
})