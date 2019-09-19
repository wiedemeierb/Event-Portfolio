const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    
        // console.log('req.user:', req.user.id);
        let id = req.user.id
        let queryText = `SELECT * FROM "event" WHERE "user_id" = $1;`;
        // console.log('in GET router')
        pool.query(queryText, [id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error in GET route server side', error);
            res.sendStatus(418)
        })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // console.log(req.body, req.user);

        let id = req.params.id
        let queryText1 = `DELETE FROM "items" WHERE "event_id" = $1`
        pool.query(queryText1, [id])
        .then((result) => {
            let queryText2 = `DELETE FROM "event" WHERE "user_id" = $1 AND "id" = $2`
            pool.query(queryText2, [req.user.id, req.params.id])
                .then((result) => res.sendStatus(201))
                .catch(error => {
                    console.log('error in server side DELETE', error);
                    res.sendStatus(418)
        })
        })
});

module.exports = router;
