const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    // let queryText = 'SELECT * FROM "items" WHERE "event_id" = $1;';
    let queryText = `SELECT "user".name, "user".username, "user".payment_username FROM "user"
                    JOIN "user_event" ON "user".id = "user_event".user_id
                    JOIN "event" ON "user_event".event_id = "event".id
                    WHERE "event".id = $1`
    console.log('in GET router for addEventUser')
    pool.query(queryText, [req.params.id])
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('Error in GET router for addEventUser', error)
            res.sendStatus(418)
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;