import bodyParser from 'body-parser';
import cors from 'cors';

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors)
}