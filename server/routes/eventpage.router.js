const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        // console.log('req.user:', req.user.id);
        // console.log(req.params)
        let eventId = req.params.id
        let queryText = `SELECT * FROM "event" WHERE "id" = $1;`;
        // console.log('in event GET router')
        // console.log(eventId)
        pool.query(queryText, [eventId])
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log('Error in GET route eventpage.router', error);
                res.sendStatus(500)
            })
    }
});

module.exports = router;