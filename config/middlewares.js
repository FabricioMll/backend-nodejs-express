// import bodyParser from 'body-parser';
// import cors from 'cors';

const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}