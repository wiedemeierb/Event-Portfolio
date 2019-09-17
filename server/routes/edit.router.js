const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * PUT route template
 */
router.put('/:id', (req, res) => {
    console.log('req.params is:', req.params);
    console.log('req.body is:', req.body)
    let id = req.body.id
    let name = req.body.name;
    let payment_username = req.body.payment_username;
    let phone_number = req.body.phone_number;
    let username = req.body.username;

    const queryText = `
        UPDATE "user" SET "name"=$1, 
        "payment_username"=$2,
        "phone_number"=$3,
        "username"=$4
        WHERE id=$5;`;
        pool.query(queryText, [name, payment_username, phone_number, username, id])
        .then((result) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with edit put', error)
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;

// username: '',
//         name: '',
//         phone_number: '',
//         payment_username: '',
//         id: 0,