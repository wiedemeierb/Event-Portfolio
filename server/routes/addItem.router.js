const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in POST for Items', req.body);
    const added_item = req.body.added_item;
    const cost = req.body.cost;
    
    const queryText = `INSERT INTO "items" (item, cost) VALUES ($1, $2)`;
    pool.query(queryText, [added_item, cost])
    .then(() => res.sendStatus(201))
    .catch((error) => {
        console.log(error)
        res.sendStatus(500)
    });
});

module.exports = router;