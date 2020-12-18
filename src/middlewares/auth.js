const jwt = require('jsonwebtoken')

exports.verifyAccess = (req, res, next) =>{
  const authorization = req.headers.authorization
  if (!authorization){
    res.status(401).json({
        'status': '401',
        'messages': 'Server, need token'
    })
  }

  let token = authorization.split(" ")
  token = token[1]
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if(err){
        if (err.name === 'JsonWebTokenError'){
            res.status(401).json({
              'status': '401',
              'messages': 'invalid token'
            })
          } else if (err.name === 'TokenExpiredError') {
            res.status(401).json({
              'status': '401',
              'messages': 'Token Expired'
            })
          }
    }
    console.log('isi decode', decoded.id)
    req.userId = decoded.id
    req.email = decoded.email
    req.roleId = decoded.roleId
    next()
  })
}