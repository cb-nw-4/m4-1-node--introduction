'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');
let tellingJoke = false;

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

  // Cat enpoint
  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow'};
    const randomTime = Math.floor(Math.random() * 3000);
    
    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
  })

  // Monkey endpoint
  .get('/monkey-message', (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const randomMsg = Math.floor(Math.random() * 6);
    const message = { author: 'monkey', text: messages[randomMsg]};
    const randomTime = Math.floor(Math.random() * 3000);

    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
  })

  // Parrot enpoint
  .get('/parrot-message', (req, res) => {
    const message = { author: 'parrot', text: req.query.userMsg};
    const randomTime = Math.floor(Math.random() * 3000);

    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
  })

  // Bot endpoint
  .get('/bot-message', (req, res) => {
    const getBotMessage = (text) => {
      const jokes = [
        { joke: 'How do robots eat guacamole?', punchLine: 'With microchips!'},
        { joke: 'What do robots wear when it snows?', punchLine: 'Roboots!'},
        { joke: 'What android team won the Olympic watersports?', punchLine: 'The rowbots!'},
        { joke: 'What kind of androids do you find in the arctic?', punchLine: 'Snobots!'},
        { joke: 'What did the baby robot call its creator?', punchLine: 'Da-Ta!'},
        { joke: 'What do robots do at lunchtime?', punchLine: 'Have a megabyte!'},
        { joke: 'What happened when they shut down the robot motorway?', punchLine: 'Everyone had to take the R2-Detour!'},
        { joke: 'Did you know RD2D uses foul language?', punchLine: 'They have to bleep out all his words!'}
      ];
      const funnyWords = ['bumfuzzle', 'taradiddle', 'collywobbles', 'Bumbershoot', 'lollygag', 'malarkey', 'snollygoster'];
      const commonGreetings = ['hi', 'hello', 'howdy'];
      const commonGoodbyes = ['goodbye', 'see ya', 'later'];

      if (tellingJoke) {
        if (text.toLowerCase() !== 'yes' && text.toLowerCase() !== 'no') {
          return 'Want to hear a joke? Yes/No';
        } else if (text.toLowerCase() === 'yes') {
          const randomJoke = Math.floor(Math.random() * 8);
          return `${jokes[randomJoke].joke}<br/><br/>${jokes[randomJoke].punchLine}<br/><br/>Haha! 😆😆😆 Bzzt Another?`;
        } else {
          tellingJoke = false;
          return 'Ok 🙁';
        }
      } else {
        let botMsg = `Bzzt "${text}"`;

        // check for funny words
        for (let i = 0; i < funnyWords.length; i++) {
          if (text.toLowerCase().indexOf(funnyWords[i]) !== -1) {
            tellingJoke = true;
            return 'LOL! 😂<br/><br/>Want to hear a joke? Yes/No';
          }
        }

        if (!tellingJoke) {
          // check for greeting words
          for (let i = 0; i < commonGreetings.length; i++) {
            if (text.toLowerCase().indexOf(commonGreetings[i]) !== -1) {
              botMsg = 'Bzzt Hello!';
            }
          }

          // check for goodbye words
          for (let i = 0; i < commonGoodbyes.length; i++) {
            if (text.toLowerCase().indexOf(commonGoodbyes[i]) !== -1) {
              botMsg = 'Bzzt Ciao!';
            }
          }

          return botMsg;
        }
      }
    }

    const message = { author: 'bot', text: getBotMessage(req.query.userMsg) };
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
