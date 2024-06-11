const express = require('express');
const router = express.Router();
const Pyment = require('../models/pyment');

//Create a new pyment
router.post('/', async (req, res) => {
    const { courseID, userId ,title, category, price } = req.body;
    const pyment = new Pyment({ courseID, userId ,title, category, price });
    try {
        await pyment.save();
        res.status(201).send(pyment);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Read all pyments

router.get('/', async (req, res) => {
    try {
        const pyments = await Pyment.find();
        res.send(pyments);
    } catch (error) {
        res.status(500).send
    }
});



module.exports = router;