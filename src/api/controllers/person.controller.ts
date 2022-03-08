import { Request, Response } from "express";
import { IPersonDto, Person } from "../models/person";
import { IAccountDto, Account } from "../models/account";
import { encrypt } from "../../crypto";

const validateUniqueFields = async (email: string, cpf: string, id?:string) => {

  const personEmailFinder= await Person.findOne({ email }); 

  if(personEmailFinder)
  { 
    if(id && personEmailFinder._id.toString() !==id)
    {
      return { status: 400, message: "There is already a person with the given email!"};
    }
    else if(!id)
    {
      return { status: 400, message: "There is already a person with the given email!"};
    }
  }
   
  const personCpfFinder= await Person.findOne({ cpf }); 

  if(personCpfFinder)
  {
    if(id && personCpfFinder._id.toString() !==id)
    {
      return { status: 400, message: "There is already a person with the given CPF!"};
    }
    else if(!id)
    {
      return { status: 400, message: "There is already a person with the given CPF!"};
    }
  }
  
  return { status: 200, message: "Ok!" };
};

class PersonController {
  //POST Method

  async post(req: Request, res: Response) {
    try {
      const { email, cpf, password } = req.body;

      //check if already exists person with the given email and cpf
      var validation = await validateUniqueFields(email, cpf, undefined);

      if (validation.status !== 200) {
        return res
          .status(validation.status)
          .json({ message: validation.message });
      }

      const person = await Person.create(req.body);
      if (person) {
        const accountDto: IAccountDto = {
          name: email,
          balance: 0,
          password: encrypt(password),
          person: person._id,
        };
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
    try {
      const person = await Person.findById(req.params.id);
      if (person) {
        const personDto: IPersonDto = {
          name: person.name,
          gender: person.gender,
          birthDate: person.birthDate.toLocaleDateString(),
          email: person.email,
          cpf: person.cpf,
        };
        return res.status(200).json( personDto );
      } else {
        return res.status(404).json({"message": "Person not found."});
      }
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }

  //get Method
  async get(req: Request, res: Response) {
    try {
      const persons = await Person.find();
      if (persons) {

        let personsDtos = [] as IPersonDto[]
        persons.forEach(person => {
          const personDto: IPersonDto = {
              name : person.name,
              gender: person.gender,
              birthDate : person.birthDate.toLocaleDateString(),
              email: person.email,
              cpf: person.cpf
          };
          personsDtos.push(personDto);
        });

        return res.status(200).json({ persons: personsDtos });
      } else {
        return res.status(404).json({"message":"There is no person data."});
      }
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }

  //put Method
  async put(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({"message": "The Id parameter is mandatory."});
      }

      const { email, cpf } = req.body;

      //check if already exists person with the given email and cpf
      var validation = await validateUniqueFields(email, cpf, id);

      if (validation.status !== 200) {
        return res
          .status(validation.status)
          .json({ message: validation.message });
      }

      const person = await Person.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });

      if (person) {
        return res.status(200).json({ person });
      } else {
        res.status(404).json({"message" : "Person not found."});
      }
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }

  //delete Method
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({"message": "The Id parameter is mandatory."});
      }

      const person = await Person.findOneAndDelete({ _id: id });

      if (person) {
        res.status(200).json({"message": "Person successfully deleted"});
      } else {
        res.status(404).json({"message": "Person not found."});
      }
    } catch (error) {
      const { code, message }: any = error;
      return res.status(400).json({ code, message });
    }
  }
}

export default new PersonController();
