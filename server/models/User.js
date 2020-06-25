const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    role: {
        type: String,
        enum: ['Admin', 'Author']
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    strict: 'throw'
})


UserSchema.pre('save', function (next) {  
    this.password = hashPassword(this.password)
    next();
})

const User = mongoose.model('User', UserSchema)
module.exports = User