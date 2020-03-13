const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


const app = express();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const client = require('twilio')(
    process.env.TWILIO_ACCOUT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  router.post('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: 8313195973,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
          console.log(req.body)
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  });
  
module.exports = router