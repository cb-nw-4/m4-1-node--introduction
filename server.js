'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

const messages = [
  "Don’t monkey around with me.",
  "If you pay peanuts, you get monkeys.",
  "I fling 💩 at you!",
  "🙊",
  "🙈",
  "🙉",
  "What is a monkey’s favourite dance move? The banana split.",
  "I like to move it move it",
  "Who's a monkey's favourite Hogwarts teacher? Professor SnAPE!",
  "How do you open a banana? With a monKEY!",
  "What sort of monkeys feel unwell? Gor-ILL-as!",
  "🍌",
  "🍌🍌",
  "🍌🍌🍌",
  "🐒",
  "🐵",
  "🌴",
  "🥥"
];

let somethingFunny = false; 

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
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get('/monkey-message', (req, res) => {
    const randomMessageIndex = Math.floor(Math.random() * (messages.length-1));
    let randomMessage = messages[randomMessageIndex];
    const message = { author: 'monkey', text: randomMessage };
    const randomTime = Math.floor(Math.random() * 3000); 
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get('/parrot-message', (req, res) => {
    const message = { author: 'parrot', text: req.query.message };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
    console.log(req.query);
  })

  .get('/bot-message', (req, res) => {
    const getBotMessage = (text) => {
      let botMsg; 
      const commonGreetings = ["hi", "hello", "howdy"];
      const commonGoodbyes = ["goodbye","bye","bye bye","xoxo","peace out","toodles"];
      botMsg = 'Bzzt "'+text+'"';
      commonGreetings.forEach ((item)=> {
        if (text.toLowerCase().includes(item)) {
          botMsg = "Bzzt Hello!";
        };
      });
      commonGoodbyes.forEach ((item)=> {
        if (text.toLowerCase().includes(item)) {
          botMsg = "Bzzt Take care!";
        };
      });
      const jokes = ["How do you get a squirrel to like you?\n Act like a nut.",
      "Why don't eggs tell jokes?\n They'd crack each other up.",
      "I don't trust stairs. They're always up to something.",
      "What do you call someone with no body and no nose?\n Nobody knows.",
      "Did you hear the rumor about butter?\n Well, I'm not going to spread it!",
      "Why couldn't the bicycle stand up by itself?\n It was two tired.",
      "What do you call a fake noodle?\n An impasta."
      ]; 
      if(text.toLowerCase().includes("something funny")) {
        botMsg = "Do you want to hear a joke? Yes/No";
        somethingFunny = true; 
      };
      if(text.toLowerCase().includes("yes") && somethingFunny) {
        botMsg = `${jokes[Math.round(Math.random()*(jokes.length-1))]} \n For another one reply: Yes/No`;
      };
      if(text.toLowerCase().includes("no") && somethingFunny ) {
        botMsg = "Bzzt Goodbye";
        somethingFunny = false; 
      };
      return botMsg; 
    };
    const message = { author: 'bot', text: getBotMessage(req.query.message) };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
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
