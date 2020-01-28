const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
module.exports = (router)=> {
    router.post('/register', (req,res)=>{
        if(!req.body.email){
            res.json({success: false, message: "You must provide an email", error: req.body});
        }else if(!req.body.username){
            res.json({success: false, message: "You must provide a username"});
        }else if(!req.body.password){
            res.json({success: false, message: "You must provide a password"});
        }else{
            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password
            });
            user.save((err) =>{
                if(err){
                    if(err.code === 11000){
                        res.json({success: false, message: 'username or email already exists'})
                    }else if (err.errors) {
                            if (err.errors.email) {
                                res.json({success: false, message: err.errors.email.message});
                            } else if(err.errors.username){
                                res.json({success: false, message: err.errors.username.message});
                            } else if(err.errors.password){
                                res.json({success: false, message: err.errors.password.message});
                            } else{
                                res.json({success: false, message:'cannot save user, Error: ', err});
                            }
                        }
                }else {
                    res.json({success: true, message:'new user registered successfully'});
                }
                }

            )
        }
    });

    router.get('/checkUsername/:username', (req, res)=>{
        if(!req.params.username){
            res.json({success: false, message:'Username was not provided!'})
        }else {
            User.findOne({username: req.params.username}, (err, user)=>{
                if(err){
                    res.json({success: false, message: err});
                }else{
                    if(user){
                        res.json({success: false, message: 'Username is already taken'});
                    } else{
                        res.json({success: true, message: 'Username is available'});
                    }
                }
            })
        }

    })

    router.post('/login', (req,res)=>{
        if(!req.body.username){
            res.json({success: false, message:'Username was not provided!'});
        } else{
            if(!req.body.password){
                res.json({success: false, message:'Password was not provided!'});
            }else{
                User.findOne({username: req.body.username.toLowerCase()}, (err, user)=>{
                    if(err){
                        res.json({success: false, message:'Username not found!'});
                    } else{
                        if(!user){
                            res.json({success: false, message: "Username not found"});
                        }else{
                            const validPassword = user.comparePassword(req.body.password);
                            if(!validPassword){
                                res.json({success: false, message: "password invalid"});
                            }else{
                             const token=   jwt.sign({userId: user._id}, config.secret, {exptresIn: '24h'});
                                res.json({success: true, token: token, user:{username: user.username}, message: "login success!"});
                            }
                        }

                    }
                })
            }
        }
    })


    router.get('/checkEmail/:email', (req,res)=>{
        if(!req.params.email){
            res.json({success: false, message:"email was not provided!"})
        }else{
            User.findOne({email: req.params.email}, (err, user)=>{
                if(err){
                    res.json({success: false, message: err})
                }else{
                    if(user){
                        res.json({success: false, message: "email has been registered!"})
                    } else{
                        res.json({success: true, message:"valid email"})
                    }
                }

            })
        }
    })

    return router;
}