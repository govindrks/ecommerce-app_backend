import { verifyToken } from "../utils/jwt.util.js";

export const requireAuth = async (req,res,next)  =>{
  const header = req.headers?.authorization;
  if(!header){
    return res.status(401).json({
      message:"Authorization header missing",
      error:"Unauthorized"

    })
  }

  const token = header.split(" ")[1];
  if(!token){
    return res.status(401).json({
      message:"Token missing",
      error:"Unauthorized"
    })
  }
  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message:"Invalid token",
      error:"Unauthorized"
    })
  }
}