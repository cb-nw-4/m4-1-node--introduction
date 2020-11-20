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
    const getBotMessage = (text) => {
      let botMsg = "";

      const botJokes = [
        "I failed math so many times at school, I can’t even count.",
        "The problem with kleptomaniacs is that they always take things literally.",
        "Never trust atoms; they make up everything.",
      ];
      const theJoke = botJokes[Math.floor(Math.random() * botJokes.length)];

      if (text.toLowerCase().match(/\w*(something funny)/gi)) {
        botMsg = "Would you like to hear a joke ? (Write YES or NO)";
      } else if (text === "YES") {
        botMsg = theJoke;
      } else if (text === "NO") {
        botMsg = "It's okay, fun is not for everyone. ";
      } else if (text.toLowerCase().match(/^hi|hello|howdy/gi)) {
        botMsg = "Hello!";
      } else if (text.toLowerCase().match(/^bye|goodbye|ciao/gi)) {
        botMsg = "Goodbye!";
      } else {
        botMsg = `Bzzt ${text}`;
      }
      return botMsg;
    };

    const message = {
      author: "bot",
      text: ` ${getBotMessage(req.query.message)}`,
    };
    console.log(message);
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
    res.status(200).json({ status: 200, message });
      }, randomTime);

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
