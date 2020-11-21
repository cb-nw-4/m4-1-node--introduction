'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

let wantAJoke = false;


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
    const message = {author: 'cat', text: 'Meow'};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
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
  
    let monkeyMessage = messages[Math.floor(Math.random() * messages.length)];

    const message = {author: 'monkey', text: monkeyMessage};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
  })


  .get('/parrot-message', (req, res) => {
    const text = req.query.text;
    const message = {author: 'parrot', text};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
  })

  
  .get('/bot-message', (req, res) => {
    const query = req.query;
    const commonGreetings = ["hi", "hello", "howdy"];
    const commonGoodbyes = ["goodbye", "bye", "farewell"];

    const jokes = [
      "If you see a robbery at an Apple Store does that make you an iWitness?",
      "Don't trust atoms. They make up everything!",
      "Two guys walk into a bar, the third one ducks.",
    ];
    let theJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const getBotMessage = (text) => {
      let botMsg = "";
      
      if (text.toLowerCase() === "something funny") {
        botMsg = "Do you want to hear a joke? Yes or no.";
        wantAJoke = true;
      } else if (text.toLowerCase() === "yes" && wantAJoke === true) {
        botMsg = `${theJoke}. Want another joke?`
        wantAJoke = true;
      } else if (text.toLowerCase() === "no" && wantAJoke === true) {
        botMsg = "No joke for you. Goodbye.";
        wantAJoke = false;
      } 
      else if (commonGreetings.includes(text.toLowerCase())) {
        botMsg = "Bzzt Hello.";
      } 
      else if (commonGoodbyes.includes(text.toLowerCase())) {
          botMsg = "Bzzt Goodbye";
      } 
      else {
        botMsg = `Bzzt ${text}`;
      }
      return botMsg;
    }

    const message = {author: 'bot', text: getBotMessage(query.text)};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
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
