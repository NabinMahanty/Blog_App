const mongoose = require("mongoose");
const { connectionurl } = require("../config/kyes");

const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionurl);
    console.log("Connection Successful");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectMongodb;
