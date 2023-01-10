function existsOrError(value, msg) {
    if(!value) throw msg
    if(Array.isArray(value) && value.lenght === 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

function notExistisOrError(value, msg) {
    try {
        existsOrError(value, msg)
    } catch(msg) {
        return
    }
    throw msg
} //continua nos 5:05 minutos