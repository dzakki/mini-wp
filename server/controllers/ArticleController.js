const Article = require('../models/Article')
class ArticleController {
    static create(req, res, next){
        const form = req.body
        Article
            .create({
                title: form.title,
                slug: ArticleController.generateSlug(form.title),
                content: form.content,
                featured_image: form.featured_image,
                author: req.userId,
                tags: form['tags']
            })
            .then(article => {
                res.status(201).json({
                    article
                })
            })
            .catch(next)
    }

    static getBySlug(req, res, next){
        Article
            .findOne({ slug: req.params.slug })
            .populate('tags')
            .populate({ path: 'author', select: 'email' })
            .then(article => {
                res.status(200).json({
                    article
                })
            })
            .catch(next)
    }

    static get(req, res, next){
        Article
            .findById({_id: req.params.id})
            .populate('tags')
            .populate({ path: 'author', select: 'email' })
            .then(article => {
                res.status(200).json({
                    article
                })
            })
            .catch(next)
    }

    static getAll(req, res, next){
        Article
            .find()
            .sort({created_at: -1})
            .populate('tags')
            .populate({ path: 'author', select: 'email' })
            .then(articles => {
                res.status(200).json({
                    articles
                })
            })
            .catch(next)
    }

    static getAllByTag(req, res, next){
        Article
            .find({
                tags: {
                    $in: [req.params.tag]
                }
            })
            .sort({created_at: -1})
            .populate('tags')
            .populate({ path: 'author', select: 'email' })
            .then(articles => {
                res.status(200).json({
                    articles
                })
            })
            .catch(next)
    }

    static getAllByAuthor(req, res, next){
        Article
            .find({
                author: req.userId
            })
            .sort({created_at: -1})
            .populate('tags')
            .populate({ path: 'author', select: 'email' })
            .then(articles => {
                res.status(200).json({
                    articles
                })
            })
            .catch(next)
    }

    static update(req, res, next){
        const form = req.body
        const data = {
            title: form.title,
            slug: ArticleController.generateSlug(form.title),
            content: form.content,
            featured_image: form.featured_image,
            tags: form.tags
        }
        if (form.featured_image) {
            data.featured_image = form.featured_image
        }
        Article
            .updateOne({ _id: req.params.id }, data)
            .then(result => {
                return Article.findOne({ _id: req.params.id })
            })
            .then(article => {
                res.status(200).json({
                    article
                })
            })
            .catch(next)
    }

    static delete(req, res, next){
        Article
            .deleteOne({_id: req.params.id})
            .then(article => {
                res.status(200).json({
                    article
                })
            })
            .catch(next)
    }

    static generateSlug(title){
        return title.split(' ').join('-') + '.html'
    }
}
module.exports = ArticleController
