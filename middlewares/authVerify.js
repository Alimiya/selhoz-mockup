const jwt = require("jsonwebtoken")

function authVerify (req, res, next) {
    const token = req.header("Authorization")
    if (!token) return res.status(401).json({error:"Access Denied"})

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET)
        req.user = JSON.stringify(verified)
        next()
    } catch (error) {
        res.status(401).json({error:"Invalid token or session expired"})
    }
}

module.exports = authVerify
