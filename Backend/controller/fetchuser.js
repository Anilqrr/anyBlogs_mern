import JWT from 'jsonwebtoken';

const fetchuser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({success:false,msg:'No token, authorization denied'});
    }
    try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({success:false,msg:'Token is not valid'});
    }
}

export default fetchuser;