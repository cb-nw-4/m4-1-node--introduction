'use strict';

const { text } = require('express');
// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

let isJoke = false;


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
    const randomTime= Math.floor(Math.random() * 3000);
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

    const message= {author:'monkey', text: messages[Math.floor(Math.random() * messages.length)]}

    const randomTime= Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });

    }, randomTime);

    
  })

  .get('/parrot-message', (req, res) => {
    const message = { author: 'parrot', text: req.query.message};
    console.log(req.query)
    
  

    const randomTime= Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });

    }, randomTime);

  })


  .get('/bot-message', (req, res) => {

      const getBotMessage = (text) => {
        const commonGreetings = ["hi", "hello", "howdy"];
        const commonGoodByes = ['bye', 'goodbye', 'bye bye', 'later'];
        const tellJoke =["something funny", 'tell me a joke', 'you have a joke?']

        const cleanJokes = ['What do dentists call their x-rays? Tooth pics!',
          'Do you want to hear a construction joke? Sorry, I’m still working on it.',
          ' Did you hear about the first restaurant to open on the moon? It had great food, but no atmosphere.',
          'Why should you never trust stairs?  They’re always up to something.',
          'Did you hear about the fire at the circus? It was in tents! ',
          'What does a nosey pepper do? It gets jalapeño business'];

        let botMsg = "";

        if(tellJoke.includes(text.toLowerCase())){
          botMsg='Do you want to hear a joke?';
          isJoke = true

        }else if(isJoke){
          if(text.toLowerCase() === 'yes'){
            botMsg = `${cleanJokes[Math.floor(Math.random() * cleanJokes.length)]} 
              'Do you want another joke?`;
          } else if(text.toLowerCase() == 'no'){
            isJoke = false;
            botMsg = "Bye!";
          } else{
          botMsg= 'Do you want another joke??';
          }
        }else if (commonGreetings.includes(text.toLowerCase())) {
          botMsg = "Hello!";
        } else if(commonGoodByes.includes(text.toLowerCase())){
          botMsg = "Bye!";
        } else if(tellJoke.includes(text.toLowerCase())){
          botMsg='Do you want to hear a joke?'
      
        }else{
          botMsg= text;
        }
        return botMsg;
      };
    

      const message = { author: 'bot', text:`${req.query.message}`};
      console.log(req.query);

      message.text =` buzz ${getBotMessage(req.query.message)}`;

        const randomTime= Math.floor(Math.random() * 3000);
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
