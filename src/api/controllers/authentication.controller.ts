import { Request, Response } from "express";
import { Account } from "../models/account";
import { encrypt } from "../../crypto";
import jwt from 'jsonwebtoken'
import {authConfigs} from '../helpers/auth'

class AuthenticationController {

  //login Method
  async login(req: Request, res: Response) {
    try 
    {
        const {email, password}  = req.body;

        const encryptPassword =  encrypt(password);

        const account = await Account.findOne({name:email, password:encryptPassword});

        if (account) 
        {   
            const token = jwt.sign({ id: account.id }, authConfigs.secret, {
                expiresIn: 86400,
              });
          
               
            return res.status(200).json({token});
        } else 
        {
            return res.status(400).send("Invalid email or password.");
        }
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }
}

export default new AuthenticationController();
