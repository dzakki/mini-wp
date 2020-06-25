module.exports = function (err, req, res, next) {  
    console.log(err)
    let status = 500
    message = 'internal server error'

    switch (err.name) {
        case 'ValidationError':
            status = 400
            message = err.message
            break;
        case 'MongoError':
            status = 409
            message = ''
            for (const key in err.keyValue) {
                message += `${key}: ${err.keyValue[key]} has been used. `
            }
            break;
        default:
            break;
    }

    res.status(status).json({
        message
    })
}

// driver: true,
// name: 'MongoError',
// index: 0,
// code: 11000,
// keyPattern: { title: 1 },
// keyValue: { title: 'express js' },