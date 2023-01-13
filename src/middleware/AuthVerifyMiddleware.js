var jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let Token = req.headers["token-key"];
    jwt.verify(Token, "secreTKeySARIN", function (err, decode) {
        if (err) {
            res.status(400).json({ status: "Fail", data: err })
        }
        else {
            //get username from decoded token and add with headers
            let username = decode["data"]['Username']
            req.headers.username = username
            next();
        }
    })
}