import mongoose from "mongoose";
import { IAccountDto } from "./account";

export interface ITransactionDto {
    sender:IAccountDto;
    reciever:IAccountDto;
    amount:Number;
}

const transactionSchema = new mongoose.Schema({
    sender: {type:mongoose.Schema.Types.ObjectId, ref:'Account'},
    reciever: {type:mongoose.Schema.Types.ObjectId, ref:'Account'},
    amount: {type:Number, required:true},
    transactionDate:{type:Date, required:true, default:Date.now}
})

const Transaction = mongoose.model('Transaction', transactionSchema,"Transaction");

export {Transaction}
