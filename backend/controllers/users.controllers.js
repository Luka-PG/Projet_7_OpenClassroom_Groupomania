/* Import des modules necessaires */
const User = require("../models/users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ encoding: "latin1" });
const fs = require("fs");

/* Controleur recupération all users */
exports.getAllUser = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

/* Controleur inscription */
exports.signup = async (req, res, next) => {
  User.findOne({ email: req.body.email }, async function (err, emailExists) {
    if (!emailExists) {
      const salt = await bcrypt.genSalt();

      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        try {
          await User.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            imageUrl: req.body.imageUrl,
            presentation: req.body.presentation,
            email: req.body.email,
            password: hash,
            role: req.body.role
          });
          res.json({ msg: "Inscription réussie" });
        } catch (error) {
          console.log(error);
        }
      })
    } else {
      return res.status(400).json({ msg: "Cette adresse email existe déjà" });
    }
  });


};

/* Controleur login */
exports.login = async (req, res, next) => {

  try {
    User.findOne({ email: req.body.email }, async function (err, user) {
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ msg: "Mot de passe erroné" });
        const userId = user._id;
        const nom = user.nom;
        const prenom = user.prenom;
        const imageUrl = user.imageUrl;
        const email = user.email;
        const presentation = user.presentation;
        const role = user.role;
        const createdAt = user.createdAt;
        const accessToken = jwt.sign({ userId, nom, prenom, imageUrl, email, presentation, role, createdAt }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1d'
        });
        res.json({ accessToken });
      } else {
        return res.status(400).json({ msg: "l'addresse email n'existe pas" });
      }

    });
  } catch (error) {
    return res.status(500).json({ msg: "Il y à un problèmes sur le BackOffice" });
  }
}
