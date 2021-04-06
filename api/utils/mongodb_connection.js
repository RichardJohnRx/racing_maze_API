const mongoose = require("mongoose");

// const DB = process.env.dev;
// const DB_NAME = process.env.DB;
// const DB_SERVER = process.env.dev.SERVER;
// const DB_PORT = process.env.dev.LOCAL_PORT;
// console.log(DB_NAME);

//connexion à la bdd mongo
mongoose.connect(`mongodb://localhost:27017/racing_maze`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Successfully connected to DB "Racing Maze"`);
}).catch(() => {
    console.log(`Connection to DB "Racing Maze" not successful`);
});

module.exports = mongoose;