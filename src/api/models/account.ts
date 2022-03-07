import mongoose from "mongoose";
import { IPersonDto } from "./person";

export interface IAccountDto {
    name:string;
    balance:Number;
    password?:string;
    person?:IPersonDto;
}

const accountSchema = new mongoose.Schema({
    name: {type : String, required :true, unique:true},
    password:{type:String, required:true},
    balance: {type:Number, required:true},
    person: {type:mongoose.Schema.Types.ObjectId, ref:'Person', unique:true}
})

const Account = mongoose.model('Account', accountSchema,"Account");

export {Account}