const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnParsedDataSchema = new Schema({

}, { strict: false });

module.exports = mongoose.model('UnParsedData', UnParsedDataSchema);