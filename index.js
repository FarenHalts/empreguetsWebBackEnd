const express = require('express')

const app = express()

app.listen(3000, () => console.log('To rodando'));

app.get('/teste-get', (req, res) => res.send('Get funcionando '))