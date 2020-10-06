# [4-1]

# Welcome to Node.Js

<img
  src="https://media0.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
  style="min-width: 50%;"
/>

---

## Node.Js

---

### What is Node?

- It's a Javascript run-time environment that helps in the execution of JavaScript code **server-side**.
- It's similar to the JS environment in the browser, but without the DOM (no `window`, no `document.createElement`, etc)

---

Node comes built in with utilities. It can:

- Load files on the local machine
- Resolve paths
- Be an HTTP server (like LiveServer)
- Load large files

---

We'll be using it as a _backend server_.

What are some other languages/frameworks that could be used instead of Node?

---

### Why Node?

---

<img src="./assets/adv_node.png" />

---

#### More advantages

- Ability to write a **complete/full-stack** application in one language (JS)
- The Wealth of _modules_ available to us in development

---

#### Modules? What are modules?

_...before we talk about that, an example._

---

#### Example

It's possible to cook everything from scratch without needing another human being... It involves

- build farm equipment
- grow crops
- self-manufacture cooking equipment
- etc.

---

_Clearly it's best to use things that are already available, that already exist._

---

Enter `node_modules` and [NPM](https://www.npmjs.com/https://www.npmjs.com/) (Node Package Manager)

- npm is a tool that lets you download code written by others.

This can save you a substantial amount of time. You don't _always_ have to reinvent the wheel.

---

#### Example

You want your friend to cook a specific meal. So you send him the recipe.

---

##### What about the ingredients? You can either

- ship him/her all of the ingredients
- give him a list of ingredients and leave it to him/her to get them himself.

---

All Node projects include a `package.json`.

_The package.json is the ingredient list, and the code is the recipe._

---

### package.json

This file is created by `npm`. There is _one_ file per project.

It contains all the names of all the modules needed for the project.

---

```json
{
  "name": "node-wksp-1",
  "version": "0.5.0",
  "description": "This is our first Node Workshop!",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "author": "Scott Morin <scott@journeyedu.co>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "moment": "^2.24.0",
    "morgan": "^1.9.1",
    "nodemon": "^2.0.2"
  }
}
```

---

### But what is a module?

A module, or library, is a set of files, usually written by someone else.

- These reside inside of the `node_modules` folder.
- You can import node modules the `yarn` command.

```bash
// example (this will add the 'moment' module)
yarn add moment
```

In this course, we will be using `yarn` to install npm packages. `yarn` commands are a little simpler, but we could have also chosen `npm`.

---

This will add a module to the `node_modules` folder as well as update the `package.json` file.

---

To install all of a project's dependencies, you type `yarn install`.

All of the dependencies listed in the `package.json` will be installed.

---

### Importing

To use a module, you import it with `require`:

```js
const multiply = require("multiply");

multiply(3, 6);
```
