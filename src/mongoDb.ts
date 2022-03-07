import mongoose from 'mongoose';
import  dotenv from 'dotenv'

const options : any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
   };

   export default {
    mongoose,
    connect: () => {
      mongoose.Promise = Promise
      dotenv.config();
      return mongoose.connect('mongodb://' + (process.env.MONGODB_LOCAL|| 'localhost'),options)
    },
    disconnect: (done: any) => {
      mongoose.disconnect(done)
    }
  }

