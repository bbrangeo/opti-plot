require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (user) {
			res.status(401).json({
				error: true,
				message: 'Email already exists'
			});
		} else {
			User.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			}, function (err, user) {
				if (err) {
					console.log("We got an error creating the user")
					console.log(err);
					res.status(401).json(err);
				} else {
					console.log('><><>< JUST ABOUT TO SIGN THE TOKEN ><><><')
					var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
						expiresIn: 60 * 60 * 24
					})
					res.json({ user, token });
				}
			})
		}
	})
})

router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (user) {
			if (user.authenticated(req.body.password)) {
				var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
					expiresIn: 60 * 60 * 24
				})
				res.json({ user, token });
			} else {
				res.json({
					error: true,
					status: 401,
					message: 'Email or password is incorrect.'
				})
			}
		} else {
			res.json({
				error: true,
				status: 401,
				message: 'account not found'
			});
		}
	})
})

router.post('/me/from/token', (req, res) => {
	let token = req.body.token;
	if (!token) {
		res.status(401).json({
			error: true,
			message: 'You must pass a token'
		})
	} else {
		jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
			if (err) {
				res.status(401).json(err);
			} else {
				User.findById(user._id, function (err, user) {
					if (err) {
						res.status(401).json(err);
					} else {
						res.json({ user, token });
					}
				})
			}
		})
	}
})


module.exports = router;