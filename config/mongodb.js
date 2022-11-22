const mongoose = require("mongoose");
const uri =
  "mongodb+srv://mrscrap420:MrScrap0001@mrscrap.72tnser.mongodb.net/?retryWrites=true&w=majority";

const connectDB = () => {
  try {
    mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to Mongodb...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
