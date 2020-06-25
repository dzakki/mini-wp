const Article = require('../models/Article')
module.exports = function (req, res, next) {  
    Article
        .findById({
            _id: req.params.id
        })
        .then(article => {
            if (!article) {
                res.status(404).json({
                    message: 'id not found'
                })    
            }else{
                if (article.author == req.userId) {
                    next()
                }else{
                    res.status(401).json({
                        message: 'access forbidden'
                    })
                }
            }
        })
        .catch(err => {
            if (err.name === 'CastError') {
                res.status(404).json({
                    message: 'id not found'
                })    
            }else{
                res.status(500).json({
                    message: 'internal server error'
                })
            }
        })
}