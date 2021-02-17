const express = require('express');
const router = express.Router();

const User = require("../models/User");

//GET -> obtenir tous les utilisateurs
router.get('/', async (req, res, next) => {
    try {
        let foundUsers = await User.find();
        res.json(foundUsers);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

//GET -> obtenir un utilisateur par id
router.get('/:id', async (req, res, next) => {
    try {
        let foundUser = await User.findById(req.params.id);
        res.json(foundUser);
    } catch (error) {
        res.status(404).json({message:error});
    }

});

//POST -> créer un nouvel utilisateur
router.post('/',async (req, res, next) => {
    let user = new User({
        prenom: req.body.prenom,
        nom: req.body.nom,
        username: req.body.prenom+'.'+req.body.nom,
        email: req.body.email,
        password: req.body.password,
        personnage:{
            img: req.body.personnage.img
        }
    });
    try{
        let savedUser = await user.save();
        res.json(savedUser);
    } catch(error){
        res.status(400).json({message:error});
    }
});

//DELETE -> supprimer un utilisateur
router.delete('/:id', async (req, res, next) => {
    try {
        let deletedUser = await User.deleteOne({_id: req.params.id});
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

//UPDATE -> modifier les données d'un utilisateur
router.put('/:id', async (req, res) => {
    try {
        let deletedUser = await User.updateOne(
            {_id: req.params.id},
            {$set:{
                    prenom: req.body.prenom,
                    nom: req.body.nom,
                    email: req.body.email,
                    password: req.body.password,
                    personnage:{
                        img: req.body.personnage.img
                    }
                }});
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

module.exports = router;