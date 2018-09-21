const csv = require("csvtojson");
const nano = require("nano")("http://localhost:5984");
const clubsDb = nano.use("clubs");
const playersDb = nano.use("players")

const csvFilePath = "player_dataset.csv";

csv()
  .fromFile(csvFilePath)
  .then(data => {
    //insertBulk(data);
    insertPlayers(data)
  });

function insertBulk (data) {
  let clubs = {};
  let docs = []

  data.forEach(player => {
    let clubName = player["Club"]
    let clubKey = clubName.replace(" ", "_").toLowerCase();
    
    if (clubs.hasOwnProperty(clubKey)) {
      clubs[clubKey].players.push(player)
    } else {
      clubs[clubKey] = {
        name: clubName,
        players: [].concat(player)
      }
    }
  })

  Object.keys(clubs).forEach(key => {
    docs.push(clubs[key]);
  })

  clubsDb.bulk({docs: docs}).then((body) => {
    console.log(body);
  });
}

function insertPlayers (players) {
  playersDb.bulk({docs: players}).then((body) => {
    console.log(body);
  });
}