"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
let jokeMode = false;
let jokeAsked = false;
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
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const message = {
      author: "monkey",
      text: messages[Math.floor(Math.random() * messages.length)],
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    const message = { author: "parrot", text: req.query.text };
    const randomTime = Math.floor(Math.random() * 3000);
    console.log(req.query.text);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    const getBotJoke = () => {
      const commonBotJokes = ["Joke 1", "Joke 2", "Joke 3"];
      let joke =
        commonBotJokes[Math.floor(Math.random() * commonBotJokes.length)];
      return joke;
    };

    const getBotMessage = (text) => {
      const commonGreetings = ["hi", "hello", "howdy"];
      const commonGoodbyes = [
        "bye",
        "au revoir",
        "ciao",
        "seeya",
        "dosvidanie",
      ];
      const commonJokeRequests = ["something funny"];
      let botMsg = `Bzzzt ${req.query.text}`;
      const words = text.toLowerCase().split(' ');
      const greeting = words.find((word) =>commonGreetings.includes(word));
      const farewell =  words.find((word) =>commonGoodbyes.includes(word));
      const jokeRequest = commonJokeRequests.find((jokeRequest) => text.toLowerCase() === jokeRequest);
      const jokeConfirm =
        jokeAsked &&
        (text.toLowerCase().includes("yes") ||
          text.toLowerCase().includes("no"));
      if (jokeConfirm) {
        if (text.toLowerCase().includes("yes")) botMsg = getBotJoke();
        else if (text.toLowerCase().includes("no")) {
          botMsg = "Goodbye";
          jokeAsked = false;
        }
      } else if (jokeRequest || jokeAsked) {
        botMsg = "Do you want to hear a joke?";
        jokeAsked = true;
      } else if (greeting) {
        botMsg = "Hello!";
      } else if (farewell) {
        botMsg = "Bye!";
      }

      return botMsg;
    };

    let msg = getBotMessage(req.query.text);
    const message = { author: "bot", text: msg };
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
