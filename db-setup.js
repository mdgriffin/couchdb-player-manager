const csv = require("csvtojson");
const nano = require("nano")("http://localhost:5984");
const playersDb = nano.use("players");
const csvFilePath = "player_dataset.csv";

csv()
  .fromFile(csvFilePath)
  .then(data => {
    playersDb.bulk({ docs: data }).then(result => {
      console.log(result);
    });
  });