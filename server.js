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
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });
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
    const randomMessage = Math.floor(Math.random() * 6);
    const message = {author: 'monkey', text: messages[randomMessage]};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });
    }, randomTime);
  })

  .get('/parrot-message', (req, res) => {
    const message = { author: 'parrot', text: `${req.query.text}` };
    console.log(req.query)
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });
    }, randomTime);
  })

  
  .get('/bot-message', (req, res) => {
    const message = { author: 'bot', text: `Bzzt ${getBotMessage(req.query.text)}` };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });
    }, randomTime);
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

  let joke;
  const jokes = [
    "How many programmers does it take to change a light bulb? none, that's a hardware problem",
    "Whats the object-oriented way to become wealthy? Inheritance",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "What did the Java code say to the C code? You've got no class.",
    "Why are Assembly programmers always soaking wet? They work below C-level."
  ];
  const getBotMessage = (text) => {
    const commonGreetings = ["hi", "hello", "howdy"];
    const commonGoodbyes = ["goodbye", "bye"];
    let botMsg = text;
    if (joke === true) {
      
      if (text.toLowerCase().includes("no")) {
        botMsg = "Goodbye!";
        joke = false;
      } else if (text.toLowerCase().includes("yes")) {
        botMsg = jokes[Math.floor(Math.random()*5)];
        joke = false;
      }
    } else {
      if (text.toLowerCase().includes("something funny")) {
        joke = true;
        botMsg = "Do you want to hear a joke?";
      }  else {
        for (let i = 0; i < commonGreetings.length; i++) {
          if (text.toLowerCase().indexOf(commonGreetings[i]) !== -1) {
            botMsg = "Hello!";
          }
        }
        for (let i = 0; i < commonGoodbyes.length; i++) {
          if (text.toLowerCase().indexOf(commonGoodbyes[i]) !== -1) {
            botMsg = "Goodbye!";
          }
        }
      }
    }
    return botMsg;
  };