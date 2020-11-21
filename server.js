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
// This is the message from the server (the cat)
.get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
        res.status(200).json({ status: 200, message });
    }, randomTime);
})

.get("/monkey-message", (req, res) => {
    const ArrayMessages = [
        "Don’t monkey around with me.",
        "If you pay peanuts, you get monkeys.",
        "I fling 💩 at you!",
        "🙊",
        "🙈",
        "🙉",
    ];
    const message = {
        author: "monkey",
        text: ArrayMessages[Math.floor(Math.random() * ArrayMessages.length)],
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
        res.status(200).json({ status: 200, message });
    }, randomTime);
})

.get("/parrot-message", (req, res) => {
    const text = req.query.text;
    const message = { author: "parrot", text: text };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
        res.status(200).json({ status: 200, message });
    }, randomTime);
})

.get("/bot-message", (req, res) => {
    const text = req.query.text;
    const getBotMessage = (text) => {
        const commonGreetings = [/hi/g, /hello/g, /howdy/g, /hey/g, /ciao/g];
        let botMsg = text;
        const result = commonGreetings.map((x) => text.toLowerCase().match(x));
        if (
            result[0] ||
            result[1] ||
            result[2] ||
            result[3] ||
            result[4] === "hi,hello,howdy,hey,TEST"
        ) {
            botMsg = "hello!";
        }
        const commonGoodbyes = [
            /bye/g,
            /goodbye/g,
            /see ya/g,
            /i'm off/g,
            /ciao/g,
        ];
        const result1 = commonGoodbyes.map((x) => text.toLowerCase().match(x));
        let botMsg1 = text;
        if (
            result1[0] ||
            result1[1] ||
            result1[2] ||
            result1[3] ||
            result1[4] === "bye,goodbye,i'm off,see ya,test1"
        ) {
            botMsg1 = "goodbye!";
        }
        return botMsg === "hello!" ?
            "hello!" :
            botMsg1 === "goodbye!" ?
            "goodbye!" :
            text;
    };

    getBotMessage(text);
    const Buzz = "Bzzt";
    const message = { author: "bot", text: `${Buzz} ${getBotMessage(text)}` };
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