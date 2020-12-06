'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');
let tellJoke = false;

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
  //get cat
  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });
    }, randomTime);
  })

  //get monkey 
  .get('/monkey-message', (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const message = { author: 'monkey', text: messages[Math.floor(Math.random() * 5)] };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
  })

  //get parrot
  .get('/parrot-message', (req, res) => {
    const text = req.query;
    const author = { author: 'parrot'};
    const message = {...author, ...text};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
    console.log(req.query)
  })

  // get bot
  .get('/bot-message', (req, res) => {
      const text = req.query;
      //console.log(req.query);
      //let tellJoke = false;
      const getBotMessage = (text) => {
        //console.log(text.text + "test")
        const commonGreetings = ["hi", "hello", "howdy"];
        const commonGoodbyes = ["bye", "goodbye", "ciao"];
        const jokes = ["How many tickles does it take to make an octopus laugh? Ten tickles.",
                       "Did you hear about the cheese factory that exploded in France? There was nothing left but de Brie.",
                       "Why aren't koalas actual bears? They don't meet the koalafications.",
                       "What do you call it when Batman skips church? Christian Bale.",
                       "What did the janitor say when he jumped out of the closet? SUPPLIES!",
                       "I can’t take my dog to the park because the ducks keep trying to bite him. I guess that’s what I get for buying a pure bread dog."];
        let botMsg = "";
        let commonHellos = false;
        let commonFarewells = false;

        commonGreetings.forEach((hello) => {
          if (text.text.toLowerCase().includes(hello)) 
              commonHellos = true;
        });

        commonGoodbyes.forEach((goodbye) => {
          if (text.text.toLowerCase().includes(goodbye)) 
              commonFarewells = true;
        });

        if (text.text.toLowerCase() === "something funny") {
          tellJoke = true;
          botMsg = "Want to hear a joke? Yes or No";
        } else if (tellJoke == true && text.text.toLowerCase() === "yes") {
          botMsg = `${jokes[Math.floor(Math.random() * jokes.length)]}  Another one? Yes or no`;
        } else if (tellJoke == true && text.text.toLowerCase() === "no") {
          botMsg = "Goodbye!";
        } else if (commonHellos) {
          botMsg = "Bzzt Hello";
        } else if (commonFarewells) {
          botMsg = "Bzzt Goodbye";
        } else {
          botMsg = `Bzzt ${req.query.text}`;
        }
        
        return botMsg;
      };

    const message = { author: 'bot', text: `${getBotMessage(text)}`};

    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
    //console.log(req.query.text)
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
  