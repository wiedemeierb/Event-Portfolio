
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const createEventRouter = require('./routes/createevent.router');
const userPageRouter = require('./routes/userpage.router');
const eventPageRouter = require('./routes/eventpage.router');
const allUsersRouter = require('./routes/allusers.router')
const addItemRouter = require('./routes/addItem.router')
const addEventUserRouter = require('./routes/addeventuser.router')
const userAttendingEvents = require('./routes/userattendingevents.router')


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/event', createEventRouter);
app.use('/api/usereventpage', userPageRouter)
app.use('/api/eventpage', eventPageRouter)
app.use('/api/allusers', allUsersRouter)
app.use('/api/additem', addItemRouter)
app.use('/api/addeventuser', addEventUserRouter)
app.use('/api/userattendingevents', userAttendingEvents)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
