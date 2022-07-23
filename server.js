const path = require("path")
const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt: jwt } = require('express-jwt')
const port = process.env.PORT || 9000
const secret = process.env.SECRET || 'some secret passphrase here for local development'

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'client', 'build')))

// connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true},
    console.log('Connected to the DB')
)

// routes
app.use('/auth', require('./routes/authRouter'))
app.use('/api', jwt({secret, algorithms: ['HS256']}))
app.use('/api/posts', require('./routes/postsRouter'))
app.use('/posts', require('./routes/postsRouter'))
app.use('/api/comments', require('./routes/commentRouter'))

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

// Server
app.listen(port, () => {
    console.log(`Port is running on server ${port}`)
})