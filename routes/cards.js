const express = require("express");
const Card = require("../models/Card");
const joi = require("joi")
const auth = require("../middlewares/auth");
const router = express.Router();

const cardSchema = joi.object({
    name: joi.string().required().min(2),
    description: joi.string().required().min(2),
    address: joi.string().required().min(2),
    phone: joi.number().required(),
    image: joi.string().required().min(2),
    website: joi.string().required().min(2),
    _id: joi.string()
});

router.post("/", auth, async (req, res) => {
    try {
        // check isBussines
        if (!req.payload.isBusiness) return res.status(400).send("Access denied. Only Bussines")
        // joi validation
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(400).send("Wrong body")
        // creat new card
        card = new Card({ ...req.body, user_id: req.payload._id })
        // save card
        await card.save();
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/:cardId", auth, async (req, res) => {
    try {
        // check token
        if (!req.payload) return res.status(400).send("Access denied. Only Users");
        //find card details
        let specificCard = await Card.findOne({ _id: req.params.cardId });
        if (!specificCard) return res.status(404).send("No such card");
        // return details
        res.status(200).send(specificCard);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.put("/:cardId", auth, async (req, res) => {
    try {
        // check token
        if (!req.payload.isBusiness) return res.status(400).send("Access denied. Only Business");
        // joi validation
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(400).send("Wrong body")
        // find and update
        let newCard = await Card.findOneAndUpdate({ _id: req.params.cardId }, req.body, { new: true });
        if (!newCard) return res.status(400).send("No such card");
        //send the new card
        res.status(200).send(newCard);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/:cardId", auth, async (req, res) => {
    try {
        // check token
        if (!req.payload.isBusiness) return res.status(400).send("Access denied. Only Business");
        // find and remove
        let newCard = await Card.findOneAndRemove({ _id: req.params.cardId });
        if (!newCard) return res.status(400).send("No such card");
        //send the new card
        res.status(200).send("Card removed successfully")
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get("/", auth, async (req, res) => {
    try {
        let cards = await Card.find()
        res.status(200).send(cards);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.put("/", auth, async (req, res) => {
    try {
        // check token
        if (!req.payload) return res.status(400).send("Access denied. Only Users");
        // joi validation
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(400).send("Wrong body")
        // find and update
        let newCard = await Card.findOneAndUpdate({ _id: req.params.cardId }, req.body, { new: true });
        if (!newCard) return res.status(400).send("No such card");
        //send the new card
        res.status(200).send(newCard);
    } catch (error) {
        res.status(400).send(error);
    }
})




module.exports = router;


