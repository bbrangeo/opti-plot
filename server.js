require('dotenv').config();
const express = require('express');


const app = express();
const port = process.env.PORT || 3001;

app.get('*', (req,res) => {
	res.send('it works')
})


const server = app.listen(port, () => {
	console.log(`🔥 server running on ${port} 🔥`)
})