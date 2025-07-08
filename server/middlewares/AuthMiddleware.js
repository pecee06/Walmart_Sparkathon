import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"You are not authentiated"});  
    }
    
    
    jwt.verify(token,process.env.JWT_KEY, async(err,payload)=>{
        if(err){
            return res.status(403).send("Invalid token");   
        }
        const {role} = req.body;
        if(role === 'admin'){
            if(payload.role !== 'superadmin'){
                return res.status(403).send("Unauthorized to create an admin ");
            }
        }
        if(role === 'cashier'){
            if(payload.role !== 'admin'){
                return res.status(403).send("Unauthorized to create an cashier ");
            }
        }
        req.userId = payload.userId;
    })
    next();
}