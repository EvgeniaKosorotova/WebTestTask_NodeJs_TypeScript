import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';

import index from './routes/index';

const bodyParser = require('body-parser');
const debug = require('debug')('my express app');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err[ 'status' ] = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err[ 'status' ] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});