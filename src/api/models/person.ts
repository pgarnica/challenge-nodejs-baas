import mongoose from "mongoose";
import { validateCPF } from "../helpers/validations.helper";

export interface IPersonDto {
    name:string;
    gender:string;
    birthDate:Date;
    email:string;
    cpf:string;
}

const personSchema = new mongoose.Schema({
    name: {type : String, required :true},
    gender : {type:String, required: false,lowercase: true, enum:['male', 'female']},
    birthDate: {type:Date, required: false},
    email: { type: String, required: true, unique: true, lowercase: true},
    createdAt: {type:Date, default:Date.now},
    cpf:{type:String, required:true, unique:true, validate:{validator:function (strCPF:string) {
        validateCPF(strCPF);
    }, message:"Invalid CPF number."}}
})

const Person = mongoose.model('Person', personSchema,"Person");

export {Person}