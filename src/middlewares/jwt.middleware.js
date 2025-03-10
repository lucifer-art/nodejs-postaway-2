import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send("Unauthorized user");
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = payload.userID;
    } catch(err) {
        return res.status(401).send("Unauthorized user");
    }
    next();
}

export default jwtAuth;