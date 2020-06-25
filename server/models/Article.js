const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'title is required']
    },
    slug: {
        type: String
    },
    content:{
        type: String
    },
    featured_image: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    strict: 'throw'
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article