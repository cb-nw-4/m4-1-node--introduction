'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // CAT
  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow'};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // MONKEY
  .get('/monkey-message', (req, res) => {
    const messages = [
      "Monkey see, monkey do",
      "MONKEY!",
      "You're a silly monkey!",
      "No more monkeying around"
    ];
    let randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(randomMessage);
    const message = { author: 'monkey', text: randomMessage};
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, 2000);
  })

    // PARROT 
    .get('/parrot-message', (req, res) => {
      const text = req.query.text;
      const message = { author: 'parrot', text };
      setTimeout(() => {
        res.status(200).json({ status: 200, message });
      }, 1000);
      console.log(req.query);
    })

    // BOT
    .get('/bot-message', (req, res) => {
      const text = req.query.text;
      const message = { author: 'bot', text };
      setTimeout(() => {
        res.status(200).json({ status: 200, message });
      }, 1000);
    })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));