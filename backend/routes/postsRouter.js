const express = require('express')
const postsRouter = express.Router()
const Post = require('../models/Post')

// get all posts
postsRouter.get('/', (req, res, next) => {
    Post.find().populate('user').exec((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// get user posts
postsRouter.get('/user', (req, res, next) => {
    Post.find().populate('user').exec({user: req.auth._id}, (err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// get post by category
postsRouter.get('/search/categories', (req, res, next) => {
    Post.find({ categories: req.query.categories }, (err, category) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(category)
    })
})

// save one
postsRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newPost = new Post(req.body)
    newPost.save((err, savedPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedPost)
    })
})

// update one
postsRouter.put('/:postId', (req, res, next) => {
    Post.findOneAndUpdate({_id: req.params.postId, user: req.auth._id}, req.body, {new: true}, (err, updatePost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatePost)
    })
})

// delete one
postsRouter.delete('/:postId', (req, res, next) => {
    Post.findOneAndDelete({_id: req.params.postId, user: req.auth._id}, (err, deletePost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted post ${deletePost.title} from the database`)
    })
})

module.exports = postsRouter

