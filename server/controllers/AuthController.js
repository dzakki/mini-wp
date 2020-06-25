const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/bcrypt')
class AuthController {

    static register(req, res, next){
        const form  = req.body
        User
            .create({
                username: form.username,
                email: form.email,
                password: form.password,
                role: 'Author'
            })
            .then(user => {
                const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET )
                res.status(200).json({
                    token
                })
            })
            .catch(next)
    }

    static login(req, res, next){
        const form = req.body
        User
            .findOne({
                username: form.username
            })
            .then(user => {
                const error = {
                    name: 'ValidationError',
                    message: 'username/password incorrect'
                }
                if (user) {
                    const isPassword = checkPassword(form.password, user.password)
                    if (isPassword) {
                        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET )
                        res.status(200).json({
                            token
                        })
                    }else{
                        throw error
                    }
                }else{
                    throw error
                }
            })
            .catch(next)
    }

    static github(req, res, next){
        const axios = require('axios')
        let usernameGithub;
        axios({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            params: {
                client_id: '567c195d2817565069d4',
                client_secret: process.env.GITHUB_SECRET,
                code: req.params.code
            },
            headers: {
                Accept: 'application/json'
            }
        })
        .then(({data}) => {
            const tokenGithub = data.access_token
            return axios({
                url: 'https://api.github.com/user',
                headers: {
                    Authorization: "token "+tokenGithub,
                    Accept: 'application/json'
                }
            })
        })
        .then(({data}) => {
            // console.log(data.login)
            usernameGithub = data.login
            return User
                    .findOne({
                        username: data.login
                    })
        })
        .then(user => {
            if (user) {
                return user
            }else{
                return User 
                            .create({
                                username: usernameGithub,
                                email: usernameGithub+usernameGithub+'@mail.com',
                                password: process.env.GITHUB_PW
                            })
            }
        })
        .then(user => {
            console.log(user._id)
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET )
            res.status(200).json({
                token,
                username: user.username
            })
        })
        .catch(next)
    }
}
module.exports = AuthController