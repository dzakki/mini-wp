const Tag = require('../models/Tag')
class TagController {

    static create(req, res, next){
        Tag
            .create({
                name: req.body.name
            })
            .then(tag => {
                res.status(201).json({
                    tag
                })
            })
            .catch(next)
    }

    static bulkCreate(req, res, next){
        const form  = TagController.convertArrToArrObj(req.body.tags)
        Tag
            .insertMany(form)
            .then(tags => {
                res.status(201).json({
                    tags
                })
            })
            .catch(next)
    }

    static convertArrToArrObj(arrs){
        const result = []
        for (let i = 0; i < arrs.length; i++) {
            result.push({
                name: arrs[i]
            })
        }
        return result
    }

    static get(req, res, next){
        Tag
            .findOne({
                _id: req.params.id
            })
            .then(tag => {
                res.status(200).json({
                    tag
                })
            })
            .catch(next)
    }

    static getAll(req, res, next){
        Tag
            .find()
            .sort({ name: -1 })
            .then(tags => {
                res.status(200).json({
                    tags
                })
            })
            .catch(next)
    }

    static update(req, res, next){
        Tag
            .updateOne({_id: req.params.id}, { name: req.body.name })
            .then(tag => {
                res.status(200).json({
                    tag
                })
            })
            .catch(next)
    }

    static delete(req, res, next){
        Tag
            .deleteOne({_id: req.params.id})
            .then(tag => {
                res.status(200).json({
                    tag
                })
            })
            .catch(next)
    }

}
module.exports = TagController