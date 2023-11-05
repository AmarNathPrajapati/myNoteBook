var jwt = require('jsonwebtoken');

const JWT_SECRET = "Amarisgood$programmar";

const fecthuser = (req, res ,next) =>{
    //getting user from token and appending  Id;
    //getting token from header
    const token = req.header('auth-token');
    if (!token){
        // 401 for access denied
        res.status(401).send({error:"please enter valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({error:"please enter valid token"}); 
    }
    // fetching id for jwt token
}
module.exports = fecthuser