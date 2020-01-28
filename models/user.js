const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


let emailLengthChecker =(email)=>{
    if(!email){
        return false;
    }else{
        if(email.length<5 || email.length >30){
            return false;
        }else{
            return true;
        }
    }};
let validEmailChecker = (email) =>{
    if(!email){
        return false;
    }else{
        const regExp = new RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
        return regExp.test(email);
    }
}
    let emailValidators = [
        {
            validator: emailLengthChecker, message: 'email must be at the length of between 5 and 30'
        },
        {
            validator: validEmailChecker, message: 'must be a valid email'

        }
    ];

let usernameLengthChecker =(username)=>{
    if(!username){
        return false;
    }else{
        if(username.length<5 || username.length >30){
            return false;
        }else{
            return true;
        }
    }};
let validUsernameChecker = (username) =>{
    if(!username){
        return false;
    }else{
        const regExp = new RegExp(
            /^[a-zA-Z0-9]+$/
        );
        return regExp.test(username);
    }
}

let usernameValidators = [
    {validator: validUsernameChecker, message: "username must be valid"},
    {validator: usernameLengthChecker, message:"the length of your username must be in the range of 5-30" }

];

let passwordLengthChecker =(password)=>{
    if(!password){
        return false;
    }else{
        if(password.length<8 || password.length >30){
            return false;
        }else{
            return true;
        }
    }};
let validPasswordChecker = (password) =>{
    if(!password){
        return false;
    }else{
        const regExp = new RegExp(
            /^[a-zA-Z0-9]+$/
        );
        return regExp.test(password);
    }
}

let passwordValidators = [
    {validator: validPasswordChecker, message: "password must be valid"},
    {validator: passwordLengthChecker, message:"the length of your password must be in the range of 8-30" }

];

const userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    username: {type: String, required: true, unique: true, lowercase: true, validate:usernameValidators},
    password: {type: String, required: true, validate: passwordValidators}
});

//
userSchema.pre('save', function (next){
    if(!this.isModified('password')){
        return next();
    }
    else {
        bcrypt.hash(this.password, null, null, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    }
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema );
