const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('\n⚠️  MongoDB is not running!');
    console.error('Please start MongoDB or use MongoDB Atlas:');
    console.error('1. Local: Start MongoDB service');
    console.error('2. Atlas: Update MONGO_URI in .env with your Atlas connection string\n');
    process.exit(1);
  }
};

module.exports = connectDB;
