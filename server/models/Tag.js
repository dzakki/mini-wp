const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'name tag is required']
    }
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    strict: 'throw'
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag