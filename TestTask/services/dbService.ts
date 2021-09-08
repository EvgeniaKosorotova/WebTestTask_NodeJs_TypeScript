import express = require("express");

const mysql = require('mysql');
const config = require("../tsconfig");

var dbService = mysql.createConnection(config.db);

dbService.sendQuery = function sendQuery(query: string, response: express.Response = null) {
    dbService.query(query, (err, results) => {
        if (err) {
            console.log(err.sqlMessage);
            response?.sendStatus(400);
        }
        else {
            response?.sendStatus(200);
        }
    });
}

module.exports = dbService;