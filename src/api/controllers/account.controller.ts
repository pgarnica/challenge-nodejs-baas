import { Request, Response } from "express";
import { IAccountDto, Account } from "../models/account";

class AccountController {
  
  //getById Method
  async getById(req: Request, res: Response) {
    const account = await Account.findById(req.params.id);
    if (account) {
      const accountDto: IAccountDto = {
        name: account.name,
        balance: account.balance
      };
      res.status(200).json({ account: accountDto });
    }else
    {
      res.status(404).send("Account not found.");
    }
  }

  //get Method
  async get(req: Request, res: Response) {
    const accounts = await Account.find();
    if (accounts) {
      res.status(200).json({ accounts });
    } else {
      res.status(404).send("There is no account data.");
    }
  }

    //getBalance Method
    async getBalance(req: Request, res: Response) {
        const account = await Account.findById(req.params.id);
        if (account) {
          res.status(200).json({ balance: account.balance });
        }else
        {
          res.status(404).send("Account not found.");
        }
      }

}

export default new AccountController();
