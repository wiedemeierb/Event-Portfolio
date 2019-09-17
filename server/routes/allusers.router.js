const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "user";';
    // console.log('in GET router for allusers')
    pool.query(queryText)
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('Error in GET for allusers.router', error)
        res.sendStatus(418)
    })
});

module.exports = router;