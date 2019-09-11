const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
    let queryText = 'SELECT * FROM "user";';
    // console.log('in GET router for allusers')
    pool.query(queryText)
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('Error in GET route for allusers.router', error)
        res.sendStatus(418)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;