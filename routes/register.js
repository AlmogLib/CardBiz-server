const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const registrSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email().min(6),
    password: joi.string().required().min(8),
    isBusiness: joi.boolean().required(),
})


router.post("/", async (req, res) => {
    try {
        // joi validation
        const { error } = registrSchema.validate(req.body);
        if (error) return res.status(400).send("Wrong body");
        // check if user exsits
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send("User already exsits");
        user = new User(req.body);
        // encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // add document to db
        await user.save();
        // generate token
        const token = jwt.sign({ _id: user._id, isBusiness: user.isBusiness }, process.env.JWTKEY);
        res.status(201).send(token);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;