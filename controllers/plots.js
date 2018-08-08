const express = require('express')
const router = express.Router()

// /plots
router.get('/', (req, res) => {
	res.send('plots')
})

module.exports = router;