"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const randomTime = Math.floor(Math.random() * 3000);
    const randomNumber = Math.floor(Math.random() * 5 + 1);
    const randomMessage = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const message = { author: "monkey", text: randomMessage[randomNumber] };
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    let text = req.query;
    console.log(text);
    text = text.text;

    const message = { author: "parrot", text };
    console.log(message);
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    let text = req.query.text;

    let isTrue = false;

    const getBotMessage = (text) => {
      let botMsg = "";
      const commonGreetings = ["hi", "hello", "howdy"];
    const words = text.toLowerCase().split(' ');
    console.log(words);
      if (words.find((word)=> {
        return commonGreetings.includes(word)

      })) {
        botMsg = "Hello!";
        isTrue = true;
      }
      return botMsg;
    };

    const botMsg = getBotMessage(text);

    text = botMsg === "" ? `Bzzt  ${text}` : botMsg;
    const message = { author: "bot", text };
    console.log(message);
    const randomTime = Math.floor(Math.random() * 3000);
    // setTimeout(() => {
    res.status(200).json({ status: 200, message });
    //   }, randomTime);
    // })
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
