import { connect } from "mongoose";

export async function connectMongo() {
    try {
      await connect(
        "mongodb+srv://rodriguezalanandres:IvN4KD6Shwqb1miH@backendcoder.l9fmynx.mongodb.net/?retryWrites=true&w=majority"
      );
      console.log("plug to mongo!");
    } catch (e) {
      console.log(e);
      throw "can not connect to the db";
    }
  }