const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const studentListRouter = require('./routes/studentList.router');
const teacherListRouter = require('./routes/teacherList.router');
const addStudentRouter = require('./routes/addStudent.router');
const addUserRouter = require('./routes/addUser.router');
const studentEventRouter = require('./routes/studentEvent.router');
const emailRouter = require('./routes/email.router');

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
app.use('/api/studentList', studentListRouter);
app.use('/api/teacherList', teacherListRouter);
app.use('/api/addStudent', addStudentRouter);
app.use('/api/addUser', addUserRouter);
app.use('/api/studentEvent', studentEventRouter)
app.use('/api/email', emailRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
