require("dotenv").config();
const mongoose = require("mongoose");
const UnParsedData = require("./schema");

// this script should be run to populate a new collection with properly parsed, sorted data

mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to mongo.");
    console.log("Time to parse the data.");
    UnParsedData.find({}).then((res) => {
      const rawData = res;
      generateCaseStrings(rawData);
    });
  })
  .catch((err) => {
    console.log("Error connecting to mongo.", err);
  });

const generateCaseStrings = (rawData) => {
  var casesArray = [];
  for (var i = 0; i < rawData.length; i++) {
    const tempCaseArray = [];
    const obj = rawData[i].toObject();
    for (var j = 0; j < obj.points.length; j++) {
      tempCaseArray.push(obj.pointsData[obj.points[j]].tosdr.case);
    }
    casesArray = [...casesArray, ...tempCaseArray];
  }
  casesArray.filter((value, index) => casesArray.indexOf(value) === index);
  console.log(casesArray.length);
  casesArray.sort();
  console.log(casesArray);

  const uniqueWithSet = [...new Set(casesArray)];
  console.log(uniqueWithSet.length);
  uniqueWithSet.sort();
  console.log(uniqueWithSet);
};
