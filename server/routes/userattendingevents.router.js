const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    if(req.isAuthenticated()){
        let id = req.user.id
        let queryText = `SELECT "event".event_name, "event".location, "event".date, "event".time, "user_event".event_id FROM "user_event"
                        JOIN "user" ON "user".id = "user_event".user_id
                        JOIN "event" ON "event".id = "user_event".event_id
                        WHERE "user".id = $1`
        pool.query(queryText, [id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error in GET route for userattendingevents.router', error);
            res.sendStatus(418)
        })
    }
});

module.exports = router;