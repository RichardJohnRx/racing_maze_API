//import {ObjectID} from "bson";
const mongoose = require("mongoose");

const personnage = new mongoose.Schema({
    img: String,
    theme: Number,
    description: String
});

const user = new mongoose.Schema({
    prenom: String,
    nom: String,
    username: String,
    personnage: personnage
});

const userData = new mongoose.Schema({
    user: user,
    type: Number, // 1 - Créateur, 2 - Invité
    place: Number,
    score: Number,
    temps: String
});

const labyrinthPosition = new mongoose.Schema({
    col: Number,
    row: Number,
    eastWall: Boolean,
    northWall: Boolean,
    southWall: Boolean,
    westWall: Boolean,
    visited: Boolean
});

const position = new mongoose.Schema({
    col:Number,
    row:Number
});

const coffre = new mongoose.Schema({
    coffre: Number,
    position: position
});

const coffres = new mongoose.Schema({
    nombre: Number,
    img: String,
    positions:[coffre]
});

const cle = new mongoose.Schema({
   img: String,
   position: position
});

const labyrinthe = new mongoose.Schema({
    positions:[[labyrinthPosition]],
    coffres: coffres,
    cle: cle
});

const schema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    difficulte: {
        type:Number, // 1 - Facile, 2 - Moyenne, 3 - Difficile
        required: true,
    },
    type: {
        type: Number, // 1 - Publique, 2 - privée
        default: 1
    },
    code: {
        type:String,
        unique: true
    },
    created_at : {
        type: Date,
        default: Date.now
    },
    createur: userData,
    users : {
        type: [userData],
        default: null
    },
    labyrinthe:{
        type: labyrinthe,
    }
});

module.exports = mongoose.model("Partie", schema);