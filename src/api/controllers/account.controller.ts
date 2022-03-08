import { Request, Response } from "express";
import { IAccountDto, Account } from "../models/account";

class AccountController {
  //getById Method
  async getById(req: Request, res: Response) {
    try {
      const account = await Account.findById(req.params.id).populate('person');
      if (account) {
        const accountDto: IAccountDto = {
          name: account.name,
          balance: account.balance,
          person: {
            name : account.person.name,
            gender: account.person.gender,
            birthDate : account.person.birthDate,
            email: account.person.email,
            cpf: account.person.cpf
          }
        };
        res.status(200).json({ account: accountDto });
      } else {
        res.status(404).json({"message":"Account not found"})
      }
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }

  //get Method
  async get(req: Request, res: Response) {
    try {
      const accounts = await Account.find().populate('person');
      if (accounts) {

        let accountsDtos = [] as IAccountDto[]
        accounts.forEach(account => {
          const accountDto: IAccountDto = {
            name: account.name,
            balance: account.balance,
            person: {
              name : account.person.name,
              gender: account.person.gender,
              birthDate : account.person.birthDate.toLocaleDateString(),
              email: account.person.email,
              cpf: account.person.cpf
            }
          };
          accountsDtos.push(accountDto);
        });

        res.status(200).json({ accounts : accountsDtos });
      } else {
        res.status(404).json({"message":"There is no account data."});
      }
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }

  //getBalance Method
  async getBalance(req: Request, res: Response) {
    try {
      const account = await Account.findById(req.params.id);
      if (account) {
        res.status(200).json({ balance: account.balance });
      } else {
        res.status(404).json({"message":"Account not found."})
      }
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }
}

export default new AccountController();
