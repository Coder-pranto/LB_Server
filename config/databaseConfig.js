const mongoose = require('mongoose');
const uri =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/logic_vhai_backend';
  

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(uri);
    console.log(uri.slice(0,12));
    console.log('> Database Connected...'.bgCyan);
  } catch (error) {
    console.error(`> Error while connecting to MongoDB: ${error.message}`.underline.red);
    process.exit(1); // Stop the server if the database connection fails
  }
};

module.exports = connectDatabase;
