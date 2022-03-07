import mongoose from 'mongoose';

const options : any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
   };

   export default {
    mongoose,
    connect: () => {
      mongoose.Promise = Promise
      console.log("connected do database")
      return mongoose.connect('mongodb://localhost:27017/challangeBaas',options)
    },
    disconnect: (done: any) => {
      mongoose.disconnect(done)
    }
  }

