const express = require('express')
const app = express()
app.use(express.json())
const port = 8000
const animeHandler = require('./handlers/anime/animeHandler');
// animes
app.get('/animes', animeHandler.get);
app.post('/animes', animeHandler.create);
app.get('/animes/:id', animeHandler.getOne);
app.put('/animes/:id', animeHandler.update);
app.delete('/animes/:id', animeHandler.delete);
// episodios
// app.get('/animes/:id/ep', getEPHandler);
// app.post('/animes/:id/ep', createEPHandler);
// app.put('/animes/:id/ep', updateEPHandler);
// app.delete('/animes/:id/ep', deleteEPHandler);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
