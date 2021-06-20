const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnParsedDataSchema = new Schema(
  {
    _id: mongoose.ObjectId // necessary to be able to query by ID normally in mongoose
  },
  { strict: false }
);

module.exports = mongoose.model("UnParsedData", UnParsedDataSchema);
