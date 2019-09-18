const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    let eventId = req.params.id
    let queryText = `SELECT "user".id, "user".name, "user".username, "user".payment_username, "user".phone_number FROM "user"
                    JOIN "user_event" ON "user".id = "user_event".user_id
                    JOIN "event" ON "user_event".event_id = "event".id
                    WHERE "event".id = $1`
    // console.log('in GET router for addEventUser')
    pool.query(queryText, [eventId])
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('Error in GET router for addEventUser', error)
            res.sendStatus(418)})
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

router.delete('/:id', (req, res) => {
    // console.log(req.body);
    if (req.isAuthenticated()) {
        let id = req.params.id
        // console.log(req.params.id)
        let queryText = `DELETE FROM "user_event" WHERE "user_id" = $1`
        pool.query(queryText, [id])
            .then(results => res.sendStatus(201))
            .catch(error => {
                console.log('error in server side DELETE attendee', error);
                res.sendStatus(418)
            })
    } else { 403 }
});

module.exports = router;