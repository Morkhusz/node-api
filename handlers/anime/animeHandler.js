var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '0.0.0.0',
        user: 'root',
        password: '123456',
        database: 'anime_api'
    },
    log: {
        warn(message) {
            console.log(message);
        },
        error(message) {
            console.log(message);
        },
    }
});

exports.get = (req, res) => {
    knex.select()
        .table('animes')
        .then(animes => {
            res.json(
                {
                    animes
                }
            );
        }).catch(error => res.status(400).json({error}))
}

exports.create = (req, res) => {
    req = req.body;
    if (!req || !req.name) {
        return res.status(422)
            .json({
                error: 'O campo Nome é obrigatório'
            })
    }

    knex('animes')
        .where('name', req.name)
        .first()
        .then(anime => {
            if (anime) {
                return res.status(422)
                    .json({ error: 'Já existe um anime com este nome!' })
            }

            knex('animes')
                .insert({ name: req.name })
                .then(rows => {

                    if (rows == 0) {
                        return res.status(406)
                            .json({ error: 'Não sei o que rolou' })
                    }

                    return res.json({ success: 'Anime criado com sucesso!' })
                })
                .catch(error => res.status(400).json(error))
        })
}

exports.getOne = (req, res) => {
    knex('animes')
        .where('id', req.params.id)
        .first()
        .then(anime => {
            if (!anime) {
                return res.status(404)
                    .json({error: 'Anime não encontrado'})
            }

            return res.json(
                anime
            );
        }).catch(error => res.status(400).json({ error }))
}

exports.update = (req, res) => {
    let params = req.params
    req = req.body;
    if (!req || !req.name) {
        return res.status(422)
            .json({
                error: 'O campo Nome é obrigatório'
            })
    }
    knex('animes')
        .where('id', params.id)
        .update({name: req.name})
        .then(rows => {
            if (rows) {
                return res.json({success: 'Anime atualizado com sucesso'})
            }

            return res.status(404).json({error: 'Anime não encontrado'})
        })
        .catch(error => res.status(400).json({error}))

}

exports.delete = (req, res) => {
    knex('animes')
        .where('id', req.params.id)
        .del()
        .then(rows => {
            if (rows == 0) {
                return res.status(404)
                    .json({error: 'Anime não encontrado'})
            }

            return res.json({success: true});
        })
        .catch(error => res.status(400).json({error}))
}
