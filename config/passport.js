const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt') // Estratégia de autenticação
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = { // isto é requerido pelo passport-jwt
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))
            .catch(e => done(e, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}