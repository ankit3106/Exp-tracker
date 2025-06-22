import jwt from 'jsonwebtoken';
import {Types} from 'mongoose';


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({success: false, message: "Unauthorized access, token missing"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded || !decoded.id || !Types.ObjectId.isValid(decoded.id)) {
            return res.status(401).json({success: false, message: "Invalid token"});
        }

        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    }
    catch(error) {
        console.error("Error in authMiddleware:", error);
        return res.status(401).json({success: false, message: "Internal server error"});
    }

}

export default authMiddleware;

    