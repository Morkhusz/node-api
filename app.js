const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
    res.send(JSON.stringify({hello: 'GET'}))
})

app.post('/', (req, res) => {
    console.log(req);
    res.send('Hello Post!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
