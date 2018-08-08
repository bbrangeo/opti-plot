const express = require('express')
const router = express.Router()

// /gardens
router.get('/', (req, res) => {
	res.send('garden')
})

module.exports = router;