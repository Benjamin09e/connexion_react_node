//importation des packages
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const cors = require("cors");



// appel des packages
const app = express();

app.use(cors());

dotenv.config();

app.use(express.static("/public"));

app.use(express.json());

//recuperer les données dans un fichier json
const userData = fs.readFileSync("./users.json")
const data = JSON.parse(userData)


//afficher les données 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

//verification de connexion 
app.post("/login", (req, res) => {
    let email = req.body.email;
    let mot_de_passe = req.body.mot_de_passe;
    let found = null;
    try {
        data.utilisateurs.forEach((items) => {
            if (items.email === email) {
                found = items;
                if (items.mot_de_passe === mot_de_passe) {
                    res.status(200).json(" connexion correct !!!!! ");
                } else {
                    res.status(500).json("Erreur sur le mot de passe connexion !!!!! ");
                }
            }
        });
        if (found === null) {
            res.status(500).json("Erreur de l'adresse email!!!!! ");
        }
    } catch (error) {
        res.status(500).json("Erreur de connexion !!!!! ");
    }
});

//mettre en place le port du lancement pour le server
app.listen(process.env.PORT, () => {
    console.log("Application lancer au port 5000");
});