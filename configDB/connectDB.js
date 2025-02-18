const { default: mongoose } = require("mongoose");

const logger = require("../config/logger");
exports.connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mdshaon2200:mdshaon2200@cluster0.qiqof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    // logger.info("DB connected");
    console.log("DB connected");
    
  } catch (error) {
    console.log(error.message);
  }
};
