const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://rishi:Rishi1234@cluster0.uaicufx.mongodb.net/primetrade?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
