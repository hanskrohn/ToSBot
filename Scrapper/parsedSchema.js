const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  quoteText: String,
  quoteDoc: String,
  companyName: String,
  companySlug: String,
  needsModeration: Boolean,
});

const parsedDataSchema = new Schema(
  {
    case: String,
    rating: String,
    snippets: [snippetSchema],
  },
  { strict: false }
);

module.exports = mongoose.model("ParsedData", parsedDataSchema);
