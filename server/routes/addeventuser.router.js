const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {

    let eventId = req.params.id
    let queryText = `SELECT "user".name, "user".username, "user".payment_username FROM "user"
                    JOIN "user_event" ON "user".id = "user_event".user_id
                    JOIN "event" ON "user_event".event_id = "event".id
                    WHERE "event".id = $1`
    // console.log('in GET router for addEventUser')
    pool.query(queryText, [eventId])
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('Error in GET router for addEventUser', error)
            res.sendStatus(418)
        })
});

router.post('/', (req, res) => {
    // console.log('in POST router for addEventUser', req.body);
    const added_user = req.body.user_id;
    const event = req.body.event_id;

    const queryText = `INSERT INTO "user_event" (user_id, event_id) VALUES ($1, $2)`;
    pool.query(queryText, [added_user, event])
    .then(() => res.sendStatus(201))
    .catch((error) => {
        console.log(error)
        res.sendStatus(500)
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;