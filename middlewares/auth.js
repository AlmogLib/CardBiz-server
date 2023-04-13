const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // console.log(`${req.method}, ${req.url} `);
        const token = req.header("Authorization");
        if (!token) res.status(401).send("Access denied. No token provided")
        const payload = jwt.verify(token, process.env.JWTKEY);
        req.payload = payload;
        next();
    } catch (error) {
        res.status(401).send(error)
    }
}
