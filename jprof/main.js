const express = require('express')
const app = express()
const port = 4204

app.get('/lab/backends/js', (req, res) => {
    console.log(`${req.method} ${req.url}`)
    res.send('Hello Express!')
})

app.listen(port, () => {
    console.log(`Express serving port ${port}`)
})

// node main.js