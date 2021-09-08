import express = require('express');

const router = express.Router();
const db = require("../services/dbService");

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index');
});

router.post("/firstQuery", function (req, res) {
    if (req.body) {
        var query: string = `UPDATE account SET clientTypeName = '${req.body.type}'`;

        db.sendQuery(query, res);
    }
    else {
        res.sendStatus(400);
    }
});

router.post("/secondQueryV1", function (req, res) {
    if (req.body) {
        var query: string = `UPDATE account SET individualName  = '${req.body.indName}' 
            where account.name in ('${req.body.names}')`;

        db.sendQuery(query, res);
    }
    else {
        res.sendStatus(400);
    }
});

router.post("/secondQueryV2", function (req, res) {
    if (req.body) {
        var query: string = `UPDATE account SET individualName  = '${req.body.indName}'
            where account.individualId in (SELECT individual.id
            FROM individual
            join client on individual.clientId = client.id
            where client.name in ('${req.body.names}'))`;

        db.sendQuery(query, res);
    }
    else {
        res.sendStatus(400);
    }
});

export default router;