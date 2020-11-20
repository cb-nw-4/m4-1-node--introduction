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
  .get('/cat-message', (req, res) => {
    console.log("cat")
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get('/monkey-message', (req, res) => {
    console.log("monkey endpoint" )
    const messageArr = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const randomNum = Math.floor(Math.random() * messageArr.length);
    const textExample = messageArr[randomNum];
    console.log(textExample, 'testing');
    const message = { author: 'monkey', text: textExample};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(300).json({ status: 300, message })
    }, randomTime)
  })

  .get('/parrot-message', (req, res) => {
    console.log("parrot")
    const message = { author: 'parrot', text: 'Polly want a crackers?' };
    const randomTime = Math.floor(Math.random() * 3000);
    console.log(req.query.text);
    setTimeout(() => {
      res.status(400).json({ status: 400, message });
    }, randomTime);
    console.log(req.query);
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
