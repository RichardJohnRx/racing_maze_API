const express = require('express');
const router = express.Router();

const Partie = require('../models/Partie');
const User = require('../models/User');

//GET -> obtenir les parties d'un utilisateur / Obtenir les parties publiques / Obtenir tous les parties
router.get('/', async (req,res) => {
    try {
        let foundParties;
        if (req.query.userId != null) {
            foundParties = await Partie.find({'users.user.id': req.query.userId});
        } else if(req.query.type != null) {
            if(req.query.type === 1){
                foundParties = await Partie.find({type: req.query.type});
            } else {
                foundParties = {message:'Unauthorized value in \'type\' parameter'}
            }
        } else {
            foundParties = await Partie.find();
        }
        res.json(foundParties);
    }catch (error) {
        // res.status(400).json({error: 'parameter \'userId\' not defined'});
        res.status(400).json({message:error});
    }
});

//GET -> obtenir une partie par id / obtenir une partie par code
router.get('/:id', async (req,res) => {
    try {
        let foundPartie;
        if(isNaN(req.query.code)){
            foundPartie = await Partie.findById(req.params.id);
        } else {
            foundPartie = await Partie.findOne({code:req.params.id})
        }

        res.json(foundPartie);
    } catch (error) {
        res.status(404).json({message:error});
    }
});

//POST -> créer une partie
router.post('/',async (req, res) => {
    let partie = new Partie({
        difficulte: req.body.difficulte,
        type: req.body.type
    });
    if(req.body.code != null && req.body.type === 2){
        partie.code = req.body.code;
    }
    try{
        let savedPartie = await partie.save();
        res.json(savedPartie);
    } catch(error){
        res.status(400).json({message:error});
    }
});

//DELETE -> supprimer une partie
router.delete('/:id', async (req, res, next) => {
    try {
        let deletedPartie = await Partie.deleteOne({_id: req.params.id});
        res.json(deletedPartie);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

//PUT -> modifier les données d'une partie / ajouter un utilisateur à une partie
router.put('/:id', async (req, res) => {
    try{
        let modifiedPartie;
        if(req.body.user != null){
            let foundUser = await User.findById(req.body.user.id);
            modifiedPartie = await Partie.updateOne(
                {_id: req.params.id},
                {
                    $push:{
                        users: {
                            user:{
                                prenom: foundUser.prenom,
                                nom: foundUser.nom,
                                username: foundUser.username,
                                personnage: foundUser.personnage
                            },
                            place: null,
                            score: null,
                            temps: null
                        }
                    }
                }
            );
        } else {
            modifiedPartie = await Partie.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        difficulte: req.body.difficulte,
                        type: req.body.type
                    }
                }
            );
        }
        res.json(modifiedPartie);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

module.exports = router;