// had to write this to revert DB after I accidentally wrote to unparseddatas collection.

// DO NOT RUN.

require("dotenv").config();
const mongoose = require("mongoose");
const UnParsedData = require("./schema");

mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    UnParsedData.find({})
      .sort({ _id: -1 })
      .limit(240)
      .then((res) => {
        const idArray = [];
        for (var i = 0; i < res.length; i++) {
          res[i].toObject();
          idArray.push(res[i]["_id"]);
        }
        console.log(idArray);
        console.log(idArray[idArray.length - 1]);
        UnParsedData.deleteMany({ _id: { $in: idArray } }).then((res) => {
          console.log(res);
        });
      });
  });
