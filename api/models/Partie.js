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
    place: Number,
    score: Number,
    temps: String
    // start_time: {
    //     type: Date,
    //     default:Date.now
    // },
    // end_time: Date
});

const schema = new mongoose.Schema({
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
    users : {
        type: [userData],
        default: null
    }
});

module.exports = mongoose.model("Partie", schema);