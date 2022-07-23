const express = require('express')
const authRouter = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// signUp
authRouter.post('/signup',(req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('That username is already taken'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(200).send({token, user: savedUser.withoutPassword()})
        })
    })
})

// login
authRouter.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next( new Error('Username or Password are incorrect'))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error('Username or Password are incorrect'))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error('Username or Password are incorrect'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword()})
        })
    })
})

// change username
authRouter.put('/user/username', (req, res, next) => {
    username: req.body.username
    User.findOneAndUpdate({user: req.auth._id, username: req.body.username}, req.body, {new: true}, (err, newName) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(newName)
    })
})

module.exports = authRouter