'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

let initialResponse = false;

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
    const randomTime = Math.floor(Math.random() * 3000);
    const randomMessage = Math.floor(Math.random() * 6);
    const message = {author: 'monkey', text: messages[randomMessage]};
    setTimeout(() => {
      res.status(200).json({status: 200, message });
    }, randomTime);
  })

  .get('/parrot-message', (req, res) => {
    const userMessage = req.query.usertext;
    const message = { author: 'parrot', text: userMessage };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });
    }, randomTime);
  })

  .get('/bot-message', (req, res) => {
    const userMessage = req.query.usertext;
    const commonGreetings = ['hi', 'hello', 'hey', 'howdy', 'bonjour', 'salut'];
    const commonGoodbyes = ['bye', 'goodbye', 'cheerio', 'see you', 'later'];
    const jokes = [
      'What do you call a fake noodle? An Impasta!', 
      'What happens if you eat yeast and shoe polish? Every morning you will rise and shine!', 
      'What do you call a pile of kittens? A meowntain!',
      'Where do crayons go on vacation? Color-ado!',
      'What did Bacon say to Tomato? Lettuce get together!',
      'What is it called when a cat wins a dog show? A CAT-HAS-TROPHY!',
      'What kind of jokes do you make in the shower? Clean Jokes!',
      'What do you call sad coffee? Depresso.',
      'What is the tallest building in the world? The library! It has the most stories!',
      'What starts with a P, ends with an E, and has million letters in it? Post Office!',
      "Why can't your nose be 12 inches long? Because then it would be a foot!"
    ];
    const randomJokes = jokes[Math.floor(Math.random() * 11)];
    const matchedGreetingArr = commonGreetings.filter((greeting) => {return userMessage.toLowerCase().includes(greeting)});
    const matchedGoodbyeArr = commonGoodbyes.filter((goodbye) => {return userMessage.toLowerCase().includes(goodbye)});
    
    const getBotMessage = (text) => {
      let botMsg = '';
      if (text.toLowerCase() === 'something funny') {
        botMsg = "Do you wanna hear a joke? Tell me 'YES' or 'NO'!";
        initialResponse = true;
      }
      else if (initialResponse === true && userMessage.toLowerCase() === 'yes') {
        botMsg = randomJokes;
        initialResponse = false;
      }
      else if (initialResponse === true && userMessage.toLowerCase() === 'no') {
        botMsg = 'Goodbye!';
        initialResponse = false;
      }
      else if (matchedGreetingArr.length !== 0 && matchedGoodbyeArr.length === 0) {
        botMsg = 'Hello!';
      }
      else if (matchedGoodbyeArr.length !== 0 && matchedGreetingArr.length === 0) {
        botMsg = 'Goodbye!';
      }
      else if (matchedGoodbyeArr.length !== 0 && matchedGreetingArr.length !== 0) {
        botMsg = 'Hello! Goodbye!';
      }
      else {
        botMsg = `Bzzt ${text}`;
      }
      return botMsg;
    }

    const message = { author: 'parrot', text: getBotMessage(userMessage) };
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
