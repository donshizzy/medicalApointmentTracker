const mongoose = require('mongoose');
const MongoURI = process.env.MongoURI;

const dbConnect = async () => {
  try {
    if (!MongoURI) {
      throw new Error("MongoURI environment variable is missing.");
    }

    await mongoose.connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to the database at ${MongoURI} successfully!`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
    throw err; 
  }
};

module.exports = dbConnect;
