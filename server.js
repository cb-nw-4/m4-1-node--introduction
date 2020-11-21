'use strict';


// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');
let approval=false;
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

  .get('/cat-message', (req, res)=>{
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status:200, message});
    }, randomTime);
  })

  .get('/monkey-message', (req,res)=>{
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
      "🐵",
      "Gimme your bananas",
      "I'll slap you",
    ];
    const randomMessage=messages[Math.floor(Math.random()*messages.length)]
    const message={ author:'monkey',text:randomMessage}
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status:200, message});
    }, randomTime);
  })

  .get('/parrot-message', (req, res)=>{
    console.log("parrot-message",req.query);
    const message = { author: "parrot", text:req.query.text}
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status:200, message});
    }, randomTime);
  })

  .get('/bot-message', (req, res)=>{
    console.log("bot-message",req.query);
    const getBotMessage = (text) => {
      console.log("text",text);
      const commonGreetings = ["hi", "hello", "howdy", "hey"];
      const joke=[ 
        "One joke, coming up! What is a sea monster’s favorite snack? Ships and dip. 🛳",
        "Alrighty! What did one snowman say to the other? Do you smell carrots?",
        "This might make you laugh. How do robots eat guacamole? With computer chips.",
        "Lets tickle your funny bone. I went shopping for some camouflage pants, but couldn't find any.",
        "Here you go! Why don't ghosts like rain? It dampens their spirit 👻",
        "Okay this is funny. How do you make a squid laugh? With ten-tickles🤣",
        "Ready to laugh? Why can't Dalmatians play hide and seek? Because they are always spotted.😬"
    ];
      let botMsg = "";

      if (commonGreetings.includes(text.toLowerCase())) {
        botMsg = "Bzzt " + "Hello!";
      }
      else if(text.toLowerCase()==="something funny"){
        botMsg="Do you want to hear a joke?";
        approval=true;
      }
      else if(text.toLowerCase()==="yes" && approval){
        approval=false;
          botMsg=joke[Math.floor(Math.random()*joke.length)]; 
      }
      else if(text.toLowerCase()==="no" && approval){
        approval=false;
        botMsg="Fine..we have a lot of happiness around with pandemic and all. Goodbye."
      }
      else{
        botMsg = "Bzzt " + text;
      }
      return botMsg;
    };
    const message = { author: "bot", text:getBotMessage(req.query.text)};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status:200, message});
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
