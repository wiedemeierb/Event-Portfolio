const express = require('express');
const pool = require('../modules/pool');
const eventRouter = express.Router();


/**
 * GET route template
 */
eventRouter.get('/', (req, res) => {

});

/**
 * POST route template
 */
eventRouter.post('/createevent', (req, res) => {
    // console.log('got to eventRouter POST')
    const event_name = req.body.event_name;
    // console.log(event_name)
    const location = req.body.location;
    const date = req.body.date;
    const time = req.body.time;
    const description = req.body.description;
    const user_id = req.user.id;

    const queryText = 'INSERT INTO "event" (event_name, location, date, time, description, user_id) VALUES ($1, $2, $3, $4, $5, $6)';
    pool.query(queryText, [event_name, location, date, time, description, user_id])
    .then(() => res.sendStatus(201))
    .catch((error) => {
        console.log(error)
        res.sendStatus(500)
    });
});

eventRouter.post('/logout', (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});

module.exports = eventRouter;
