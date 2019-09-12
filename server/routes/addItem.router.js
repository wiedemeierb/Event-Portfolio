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
    const user = req.user.id;
    const event = req.body.event_id;

    const queryText = `INSERT INTO "items" (item, cost, user_id, event_id) VALUES ($1, $2, $3, $4)`;
    // const queryText = `INSERT INTO "items" (item, cost, user_id) VALUES ($1, $2, $3)`;
    pool.query(queryText, [added_item, cost, user, event])
    .then(() => res.sendStatus(201))
    .catch((error) => {
        console.log(error)
        res.sendStatus(500)
    });
});

module.exports = router;