const express = require('express');
const gClients = require('./../util/gestionnaires').gClients;
const gVentes = require('./../util/gestionnaires').gVentes;
const { validate, Joi } = require('express-validation');
const auth = require('./../middleware/auth');
const router = express.Router();

const adresseIdValidation = {
  params: Joi.object({
    idClient: Joi.number().integer().required()
  })
};

const panierItemIdValidation = {
  params: Joi.object({
    idClient: Joi.number().integer().required(),
    idItem: Joi.number().integer().required()
  })
};

const supprimerPanierValidation = {
  params: Joi.object({
    idClient: Joi.number().integer().required()
  })
};

const nouveauClientValidation = {
  body: Joi.object({
    prenom: Joi.string().required(),
    nom: Joi.string().required(),
    age: Joi.number().integer().positive().required(),
    adresse: Joi.string().required(),
    pays: Joi.string().required(),
    courriel: Joi.string().email().required(),
    mdp: Joi.string().required()
  })
};

const modifierClientValidation = {
  params: Joi.object({
    idClient: Joi.number().integer().required()
  }),
  body: Joi.object({
    prenom: Joi.string(),
    nom: Joi.string(),
    age: Joi.number().integer().positive(),
    adresse: Joi.string(),
    pays: Joi.string()
  })
};

const rechercherClientValidation = {
  query: Joi.object({
    prenom: Joi.string(),
    nom: Joi.string(),
    age: Joi.number().integer().positive(),
    pays: Joi.string(),
    adresse: Joi.string(),
    courriel: Joi.string()
  })
};

const nouveauItemPanierValidation = {
  params: Joi.object({
    idClient: Joi.number().integer().required()
  }),
  body: Joi.object({
    idProduit: Joi.number().integer().required(),
    quantite: Joi.number().integer().positive().required()
  })
};

const modifierPanierValidation = {
  params: Joi.object({
    idClient: Joi.number().integer().required(),
    idItem: Joi.number().integer().required()
  }),
  body: Joi.object({
    quantite: Joi.number().integer().required()
  })
};

/**
 * Ajoute un nouveau client. S'utilise avec une requ??te de type POST.
 * Il faut passer dans le corps de la requ??te une description compl??te sous forme de JSON.
 */
router.post('/', validate(nouveauClientValidation), gClients.ajouteClient.bind(gClients));

/**
 * Retourne l'ensemble des clients. On peut filtrer les r??sultats.
 * On peut chercher sur le prenom, nom, age, adresse et pays
 * La requ??te pour filtrer sera de la forme /clients?prenom=bla&nom=blo&age=2&pays=Canada&adresse=adre
 * Attention les espaces ne sont pas permis, il faut les remplacer par %20
 */
router.get('/', validate(rechercherClientValidation, {}, {}), gClients.recupereClient.bind(gClients));

/**
 * Retourne le client ayant l'id :idClient
 */
router.get('/:idClient', validate(adresseIdValidation, {}, {}), auth.localParam, gClients.recupereClient.bind(gClients));

/**
 * Modifie un client. Le id dans l'adresse est obligatoire. Les autres informations dans le body sont optionnelles.
 * Au moins une devrait toutefois ??tre modifi??e, sinon la requ??te est un peu inutile
 */
router.put('/:idClient', validate(modifierClientValidation, {}, {}), auth.localParam, gClients.modifierClient.bind(gClients));

/**
 * Efface un client. Attention, c'est permanent!
 */
router.delete('/:idClient', validate(adresseIdValidation, {}, {}), auth.localParam, gClients.effaceClient.bind(gClients));

/**
 * R??cup??re le panier d'un client.
 */
router.get('/:idClient/panier', validate(adresseIdValidation, {}, {}), auth.localParam, gClients.recuperePanier.bind(gClients));

/**
 * R??cup??re l'item :idItem du panier du client :idClient.
 */
router.get('/:idClient/panier/:idItem', validate(panierItemIdValidation, {}, {}), auth.localParam, gClients.recuperePanier.bind(gClients));

/**
 * Ajoute un item au panier d'un client.
 */
router.post('/:idClient/panier', validate(nouveauItemPanierValidation, {}, {}), auth.localParam, gClients.ajoutePanier.bind(gClients));

/**
 * Modifie un item dans un panier. On peut seulement modifier la quantit??. Une quantit?? positive augmente,
 * une quantit?? n??gative diminue. (ancienneQt?? + modification)
 */
router.put('/:idClient/panier/:idItem', validate(modifierPanierValidation, {}, {}), auth.localParam, gClients.modifiePanier.bind(gClients));

/**
 * Retire un item d'un panier.
 */
router.delete('/:idClient/panier/:idItem', validate(panierItemIdValidation, {}, {}), auth.localParam, gClients.retirerPanier.bind(gClients));

/**
 * Commander le panier.
 */
router.post('/:idClient/panier', validate(supprimerPanierValidation, {}, {}), auth.localParam, gVentes.ajouterVente.bind(gClients));

module.exports = router;
