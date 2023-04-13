const express = require("express");
const Card = require("../models/Card");
const auth = require("../middlewares/auth");
const User = require("../models/User");
const router = express.Router();


router.get("/", auth, async (req, res) => {
    try {
        //check token
        if (!req.payload.isBusiness) return res.status(400).send("Access denied. Only Business");
        //bring cards of specific user
        let cards = await Card.find({ user_id: req.payload._id });
        // console.log(user_id);
        if (!cards) return res.status(404).send("No cards for this user")
        res.status(200).send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
})




module.exports = router;



