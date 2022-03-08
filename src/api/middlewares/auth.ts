import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {authConfigs} from '../helpers/auth'

export const validateToken = (req : any, res:Response, next:any) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided." });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(401).json({ message: "Invalid Token" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    jwt.verify(token,authConfigs.secret,(err:any, decoded:any)=>{
        if (err) {
            return res.status(401).json({ message: "Invalid Token"});
          }
          req.accountId = decoded.id;
          return next(); 
    })
}