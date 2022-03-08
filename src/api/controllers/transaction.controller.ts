import { Request, Response } from "express";
import { ITransactionDto, Transaction } from "../models/transaction";
import { Person } from "../models/person";
import { Account } from "../models/account";

class TransactionController {
  //get Method
  async P2P(req: Request, res: Response) {
    try {
      const { sender, reciever, amount } = req.body;

      const senderObject = await Person.findById(sender);
      if (!senderObject) {
        return res.status(404).json({"message": "Sender not found"});
      }

      const recieverObject = await Person.findById(reciever);
      if (!recieverObject) {
        return res.status(404).json({"message": "Receiver not found"});
      }

      const accountSender = await Account.findOne({ person: sender });
      if (accountSender.balance < amount) {
        return res.status(400).json({"message": "Not enought balance to transfer"});
      }

      const accountReciever = await Account.findOne({ person: reciever });

      const transactionDto: ITransactionDto = {
        sender: accountSender._id,
        reciever: accountReciever._id,
        amount: amount,
      };

      await Account.updateOne({_id:accountSender._id},{balance:accountSender.balance - amount});
      await Account.updateOne({_id:accountReciever._id},{balance:accountReciever.balance + amount});

      await Transaction.create(transactionDto);

      return res
        .status(200)
        .json({"message" : senderObject.name +" transfered " + amount +
                           " to " + recieverObject.name});
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }
}

export default new TransactionController();
