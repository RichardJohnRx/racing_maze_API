const express = require('express');
const router = express.Router();

const Partie = require('../models/Partie');
const User = require('../models/User');
const Base64 = require('../utils/base64_encoder');

//GET -> obtenir les parties d'un utilisateur / Obtenir tous les parties
router.get('/', async (req,res) => {
    try {
        let foundParties;
        if (req.query.userId != null) {
            foundParties = await Partie.find({'users.user.id': req.query.userId});
        } else {
            foundParties = await Partie.find();
        }
        res.json(foundParties);
    }catch (error) {
        // res.status(400).json({error: 'parameter \'userId\' not defined'});
        res.status(400).json({message:error});
    }
});

//GET -> Obtenir les parties publiques
router.get('/publiques', async (req,res) => {
    try {
        let foundParties = await Partie.find({type: 1});
        res.json(foundParties);
    }catch (error) {
        // res.status(400).json({error: 'parameter \'userId\' not defined'});
        res.status(400).json({message:error});
    }
});

//GET -> obtenir une partie par id
router.get('/:id/id', async (req,res) => {
    try {
        let foundPartie = await Partie.findById(req.params.id);
        res.json(foundPartie);
    } catch (error) {
        res.status(404).json({message:error});
    }
});

//GET -> obtenir une partie par code
router.get('/:id/code', async (req,res) => {
    try {
        let foundPartie = await Partie.findOne({code:req.params.id});
        res.json(foundPartie);
    } catch (error) {
        res.status(404).json({message:error});
    }
});

//POST -> créer une partie
router.post('/',async (req, res) => {
    let partie = new Partie({
        nom: req.body.nom,
        difficulte: req.body.difficulte,
        type: req.body.type
    });
    if(req.body.type === 2){
        partie.code = Base64.encoder(partie._id);
    }
    try{
        let savedPartie = await partie.save();
        res.json(savedPartie);
    } catch(error){
        res.status(400).json({message:error});
    }
});

//DELETE -> supprimer une partie
router.delete('/:id', async (req, res) => {
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
                        nom: req.body.nom,
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

//PUT -> Insérer les données du labyrinthe
router.put('/:id/labyrinthe', async (req,res) => {
    try{
        let modifiedPartie = await Partie.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    labyrinthe: req.body.labyrinthe
                }
            }
        );
        res.json(modifiedPartie);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

module.exports = router;