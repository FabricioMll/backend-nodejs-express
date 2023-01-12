module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    
    const save = (req, res) => {
        const article = { ...req.body }
        if(req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informado')
            existsOrError(article.categoryId, 'Categoria não informado')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo vazio')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(e => res.status(500).send(e))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(200).send())
                .catch(e => res.status(500).send(e))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles').where({ id: req.params.id }).del()
            try {
                notExistsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch(e) {
                res.status(400).send()
            }            
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(e => res.status(500).send())
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(e => res.status(500).send(e))
    }

    return { save, remove, get, getById }
}