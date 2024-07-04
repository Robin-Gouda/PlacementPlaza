import mongoose from "mongoose";

const mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(`Error occoured MongoDb Connection : ${err}`);
  });
