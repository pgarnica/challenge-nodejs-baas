import { Request, Response } from "express";
import { IPersonDto, Person } from "../models/person";
import { IAccountDto, Account } from "../models/account";
import {encrypt} from '../../crypto'

const validateUniqueFields =  async (email:string, cpf:string) =>
{
  if (await Person.findOne({ email })) {
    return { status: 400,
             message: 'There is already a person with the given email!'};
  }else  if (await Person.findOne({ cpf })) {
    return { status: 400,
      message: 'There is already a person with the given CPF!'};
  }else  {
    return { status: 200,
      message: 'Ok!'};
  }
}

class PersonController {
  //POST Method

  async post(req: Request, res: Response) {
    try {
      const { email, cpf, password } = req.body;

      //check if already exists person with the given email and cpf
      var  validation = await validateUniqueFields(email,cpf);

      if(validation.status !== 200)
      {
        return res.status(validation.status).json({ message:validation.message });
      }
       
      const person = await Person.create(req.body);
      if(person)
      {
        const accountDto: IAccountDto =
        {
          name : email,
          balance: 0,
          password: encrypt(password),
          person : person._id
        }
        await Account.create(accountDto);
      }

      return res.status(201).json(person);
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }

  //getById Method
  async getById(req: Request, res: Response) {
    const person = await Person.findById(req.params.id);
    if (person) {
      const personDto: IPersonDto = {
        name: person.name,
        gender: person.gender,
        birthDate: person.birthDate.toLocaleDateString(),
        email: person.email,
        cpf:person.cpf
      };
      res.status(200).json({ person: personDto });
    }else
    {
      res.status(404).send("Person not found.");
    }
  }

  //get Method
  async get(req: Request, res: Response) {
    const persons = await Person.find();
    if (persons) {
      res.status(200).json({ persons: persons });
    } else {
      res.status(404).send("There is no person data.");
    }
  }

  //put Method
  async put(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("The Id parameter is mandatory.");
    }

    const { email, cpf } = req.body;

    //check if already exists person with the given email and cpf
    var  validation = await validateUniqueFields(email,cpf);

    if(validation.status !== 200)
    {
      return res.status(validation.status).json({ message:validation.message });
    }

    const person = await Person.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (person) {
      res.status(200).json({ person });
    } else {
      res.status(404).send("Person not found.");
    }
  }

  //delete Method
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("The Id parameter is mandatory.");
    }

    const person = await Person.findOneAndDelete({ _id: id });

    if (person) {
      res.status(200).send("Person successfully deleted");
    } else {
      res.status(404).send("Person not found.");
    }
  }
}

export default new PersonController();
