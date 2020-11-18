'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');
let isJokeAsk = false;

const getBotMessage = (text) => {
  const commonGreetings = ["hi", "hello", "howdy"]; 
  const commonGoodbyes = ["bye", "goodbye", "see you"];
  const commonJokes = [ "Did you hear about the claustrophobic astronaut? He just needed a little space.", 
                        "Where are average things manufactured? The satisfactory.",
                        "What did the left eye say to the right eye? Between you and me, something smells.", 
                        "What do you call a magic dog? A labracadabrador.",
                        "Talk is cheap? Have you ever talked to a lawyer?",
                        "Two artists had an art contest. It ended in a draw!",
                        "What is an astronaut’s favourite part on a computer? The space bar.",
                        "Why did the yogurt go to the art exhibition? Because it was cultured.",
                        "How do poets say hello? Hey, haven’t we metaphor?"];
  let msg = `Bzzt ${text}`;
  const smallText = text.toLowerCase();

  if (!isJokeAsk && smallText === "something funny") {
    isJokeAsk = true;     
    return 'Do you want to hear a joke? Answer YES or NO.';
  }

  if (isJokeAsk) {
    switch(smallText) {
      case "no":
        isJokeAsk = false;
        return "goodbye...";
      case "yes":
        return commonJokes[Math.floor(Math.random() * 9)] + " Do you want to hear another joke? Answer YES or NO.";
      default:
        return 'Do you want to hear a joke? Answer YES or NO.';
    }
  }
  
  commonGreetings.forEach((greeting)=>{
    if (smallText.includes(greeting))
      msg = 'Bzzt Hello';
  });

  commonGoodbyes.forEach((goobye)=>{
    if (smallText.includes(goobye))
      msg = 'Bzzt Goodbye';
  });
  return msg;
};

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

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
          res.status(200).json({ status: 200, message });
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
    const message =  { author: 'monkey', text: messages[Math.floor(Math.random() * 6)] };   
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
          res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get('/parrot-message', (req, res) => {    
    const message =  { author: 'parrot', text: req.query.text };   
    const randomTime = Math.floor(Math.random() * 3000);   
    setTimeout(() => {
          res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get('/bot-message', (req, res) => {     
    const message =  { author: 'bot', text: getBotMessage(req.query.text) };   
    const randomTime = Math.floor(Math.random() * 3000);   
    setTimeout(() => {
          res.status(200).json({ status: 200, message });
    }, randomTime);
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
  