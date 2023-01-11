module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { ...req.body }
        if(req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(400).send())
                .catch(e => res.status(500).send(e))
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(400).send())
                .catch(e => res.status(500).send(e))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Categoria não informado.')

            // const subcategory = await app.db('categories')
            //     .where
        } catch(e) {
            
        }
    }
}