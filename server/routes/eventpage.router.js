const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('req.user:', req.user.id);
        let id = req.user.id
        let queryText = `SELECT * FROM "event" WHERE "user_id" = $1;`;
        console.log('in GET router')
        pool.query(queryText, [id])
            .then(results => res.send(results.rows))
            .catch(error => {
                console.log('Error in GET route server side', error);
                res.sendStatus(418)
            })
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;