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

  .get('/bot-message', (req, res) => {

    let text = "";
    let jokeRequest = false;
    const commonGreetings = ["hi", "hello", "howdy", "hola", "bonjour"];
    const commonGoodbyes = ["bye", "adios", "ciao", "peace", "good-bye", "goodbye"];
    const funnyJokes = ["Time flies like an arrow, fruit flies like a banana.", "I told my doctor that I broke my arm in two places. He told me to stop going to those places.", "What do you call it when Batman skips church? Christian Bale.", "What's orange and sounds like a parrot? A carrot.", "I used to be addicted to soap, but I'm clean now."];
    const somethingFunny = "something funny";

    // if (req.query.text === "something funny" || req.query.text === "Something funny") {
    //   text = funnyJokes[Math.floor(Math.random() * funnyJokes.length)]

    if (somethingFunny.includes(req.query.text.toLowerCase())) {
      text = "Do you want to hear a joke? Reply YES or NO";
    } else if (req.query.text === "YES" || req.query.text === "yes") {
      text = funnyJokes[Math.floor(Math.random() * funnyJokes.length)]
    } else if (req.query.text === "NO" || req.query.text === "no") {
      text = "Oh. Ok. Bye then."
    } else if (commonGreetings.includes(req.query.text.toLowerCase())) {
      text = "Hello!";
    } else if (ommonGoodbyes.includes(req.query.text.toLowerCase())) {
      text = "Goodbye!";
    } else {
      text = "Bzzt " + req.query.text;
    }

    const message = { author: "bot", text };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message })
    }, randomTime);
  })

  .get('/parrot-message', (req, res) => {

    const text = req.query.text;
    const message = { author: "parrot", text };
    const randomTime = Math.floor(Math.random() * 3000);
    console.log(req.query.text);
    setTimeout(() => {
      res.status(200).json({ status: 200, message })
    }, randomTime);
    })

  .get('/monkey-message', (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const message = { author: 'monkey', text: messages[Math.floor(Math.random() * messages.length)] };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message })
    }, randomTime);
  })

  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message })
    }, randomTime);
  });

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
