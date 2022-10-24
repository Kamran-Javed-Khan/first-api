const express = require('express');
const router = express.Router();
const User = require('../model/user');

//get all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).send('Error');
    }
});

//create new
router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).send('Error');
    }
});

//find by id
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.status(200).json(foundUser);
    } catch (err) {
        res.status(400).send('No user with given id');
    }
});

//update
router.patch('/:id', async (req, res) => {
    console.log(req.body);
    try {
        const foundUser = await User.updateOne(
            { _id: req.params.id },
            { $set: { email: req.body.email } }
        );
        res.status(200).json(foundUser);
    } catch (err) {
        res.status(400).send('No user with given id');
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.remove({_id: req.params.id});
        res.status(200).send(deletedUser);
    } catch (err) {
        res.status(400).send('No user with given id');
    }
});

module.exports = router;