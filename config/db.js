const { default: mongoose } = require("mongoose");

const MONGO_URL = "mongodb://localhost:27017/Blog";

exports.main = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};