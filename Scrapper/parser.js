require("dotenv").config();
const mongoose = require("mongoose");
const UnParsedData = require("./schema");
const ParsedData = require("./parsedSchema");

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
      const caseStringMap = generateCaseStrings(rawData);
      // obtain rating and snippets for each case
      for (var i = 0; i < rawData.length; i++) {
        const companyObj = rawData[i].toObject();
        // iterate and collect each TOSDR snippet
        for (var j = 0; j < companyObj.points.length; j++) {
          const caseString =
            companyObj.pointsData[companyObj.points[j]].tosdr.case;
          const snippet = {
            quoteText: companyObj.pointsData[companyObj.points[j]].quoteText,
            quoteDoc: companyObj.pointsData[companyObj.points[j]].quoteDoc,
            companyName: companyObj.name,
            companySlug: companyObj.slug,
            needsModeration:
              companyObj.pointsData[companyObj.points[j]].needsModeration,
          };
          if (snippet.quoteText !== null) {
            // only if valid quote data is there, add it to the hashtable's key
            caseStringMap[caseString].snippets.push(snippet);
          }
          if (caseStringMap[caseString].rating == null) {
            // if the case doesn't have a rating, add one
            caseStringMap[caseString].rating =
              companyObj.pointsData[companyObj.points[j]].tosdr.point;
          }
        }
      }
      // now we can generate the final array of documents and write to MongoDB
      const finalDocumentArray = [];
      for (const property in caseStringMap) {
        finalDocumentArray.push({
          case: property,
          rating: caseStringMap[property].rating,
          snippets: caseStringMap[property].snippets,
        });
      }
      // write finalDocumentArray to MongoDB
      ParsedData.insertMany(finalDocumentArray).then((res) => {
        console.log(res);
      });
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
    if (obj.points == undefined) {
      console.log(obj);
    }
    for (var j = 0; j < obj.points.length; j++) {
      tempCaseArray.push(obj.pointsData[obj.points[j]].tosdr.case);
    }
    casesArray = [...casesArray, ...tempCaseArray];
  }
  const uniqueWithSet = [...new Set(casesArray)];
  uniqueWithSet.sort();
  var finalObj = {};
  for (var i = 0; i < uniqueWithSet.length; i++) {
    // generate object with vars as keys
    finalObj[uniqueWithSet[i]] = {};
    finalObj[uniqueWithSet[i]].rating = null;
    finalObj[uniqueWithSet[i]].snippets = [];
  }
  return finalObj;
};
