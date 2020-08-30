const fs = require('fs');
const { exit } = require('process');

exports.get = (req, res) => {
    animes = JSON.parse(fs.readFileSync(__dirname + '/animes.json'));
    res.json(
        {
            animes
        }
    );
}

exports.create = (req, res) => {
    req = req.body;
    if (!req || !req.name) {
        return res.status(422)
            .json({
                error: 'O campo Nome é obrigatório'
            })
    }

    animes = JSON.parse(fs.readFileSync(__dirname + '/animes.json'));

    if (animes.filter(anime => anime.name == req.name)) {
        return res.status(422)
            .json({
                error: 'Este anime já existe'
            })
    }

    let highestId = 0;
    animes.forEach(function (anime) {
        if (anime.id > highestId) highestId = anime.id;
    });

    let anime = {
        id: highestId + 1,
        name: req.name
    };

    animes.push(anime);
    fs.writeFileSync(__dirname + '/animes.json', JSON.stringify(animes, null, 2))

    res.json(
        {success: true}
    );
}

exports.getOne = (req, res) => {
    animes = JSON.parse(fs.readFileSync(__dirname + '/animes.json'));
    let anime = animes.find(anime => anime.id == req.params.id);
    if (anime) {
        return res.json(anime);
    }

    return res.status(404)
        .json({
            error: 'Anime não encontrado'
        })
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
    animes = JSON.parse(fs.readFileSync(__dirname + '/animes.json'))
    let anime = animes.find(anime => anime.id == parseInt(params.id))
    let index = animes.findIndex(anime => anime.id == parseInt(params.id) )

    if (anime) {
        anime = {
            id: parseInt(anime.id),
            name: req.name
        }
        animes[index] = anime
        fs.writeFileSync(__dirname + '/animes.json', JSON.stringify(animes, null, 2))

        res.json(
            { success: true }
        );
    }

    return res.status(404)
        .json({
            error: 'Anime não encontrado'
        })
}

exports.delete = (req, res) => {
    animes = JSON.parse(fs.readFileSync(__dirname + '/animes.json'));
    let index = animes.findIndex(anime => anime.id == parseInt(req.params.id));
    if (index > -1) {
        animes.splice(index, 1);
        fs.writeFileSync(__dirname + '/animes.json', JSON.stringify(animes, null, 2))
    
        return res.json({
            success: true
        })
    }

    return res.status(404)
        .json({
            error: 'Anime não encontrado'
        })
}
