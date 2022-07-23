const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/Comment')

// get comments
commentRouter.get('/:postId', (req, res, next) => {
    Comment.find({post: req.params.postId}, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// add comment
commentRouter.post('/:postId', (req, res, next) => {
    req.body.user = req.auth._id
    req.body.username = req.auth.username
    req.body.post = req.params.postId
    
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedComment)
    })
})

module.exports = commentRouter