// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const sendMailTo = require('../modules/mailer');
// const router = require('express').Router();
// const CronJob = require('cron').CronJob;

// router.post('/', rejectUnauthenticated, (req, res) => {
//     new CronJob(new Date(req.body.date), function() {
//         sendMailTo(req.body.email, req.body.message);
//         this.stop();
//     }, null, true, 'America/Chicago');
//     res.sendStatus(200);
// });

// module.exports = router;