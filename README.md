# 3.1 Node.Js: Introduction

Welcome to your first Node app!!

This is where things start to get a little more complicated, but a heck of a lot more fun!

## Setup

1. Open a terminal window and type `yarn install`
2. Start up the server by typing `yarn dev`

Your node application is now running at http://localhost:8000

**When we type `yarn dev` in the terminal, it will spin up a `node` environment that will render our server-side app to the browser.**

## Deeper Dive into this app

### Required dependencies

If you look in the `package.json` file you will see all of the external dependencies, or modules, that we will need for today's workshop.

| package                                          | Description                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| [express](https://www.npmjs.com/package/express) | Fast, unopinionated web framework for node.                                                                              |
| [nodemon](https://www.npmjs.com/package/nodemon) | nodemon is a tool that helps develop node-based applications by automatically restarting the node application on change. |
| [morgan](https://www.npmjs.com/package/morgan)   | HTTP request logger middleware for node.js                                                                               |
| [moment](https://www.npmjs.com/package/moment)   | A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.                       |

### File Structure

```
├── __lecture
├── __solution
├── node_modules (where all external dependencies are saved)
|   ├── ...
|   └── ...
├── public (folder that serves static files)
|   ├── cat
|   |   ├── index.html
|   |   └── scripts.js
|   ├── css
|   |   ├── _chat-app.css
|   |   ├── _mini-reset.css
|   |   └── cat-page.css
|   └── images
├── .gitignore
├── package.json (where we keep a record of the app setup)
├── README.md (this file)
├── server.js
└── yarn.lock ("locks" the dependency versions)
```

This app contains both a Frontend and a Backend.

#### Backend

- The backend is essentially the `server.js` file. It contains a functional express app to which we will add some functionality in the exercises below.

#### Frontend

- The frontend is the `public/` folder.
- Once the server is running, it will serve up the frontend files as static resources. The line below is responsible for allowing those files to be accessed.

```js
  // Any requests for static files will go into the public folder
  .use(express.static('public'))
```

##### Example

The `public/` folder contains `html`, `css` and `js` files to be rendered in the browser.

1. A user types http://localhost:8000/cat in the browser.
2. The server looks for an `express()` endpoint of `/cat`.
3. It doesn't find one
4. It then looks for static files in the `public` folder.
5. It finds `public/cat/` that contains an `index.html` file.
6. It responds with that file.
7. The browser loads `/cat` for the user.
8. The browser will also follow-up with requests for any other required files. In this case, the `css` and `js` files.

**Every single server call follows this pattern.**

For this workshop, you will work in the `public` folder as well as the `server.js` file.

---

## Exercise 1 - The Cat Chat

Open this exercise file: [exercise-1.md](__workshop/exercise-1.md)

## Exercise 2 - The Monkey Chat

Open this exercise file: [exercise-2.md](__workshop/exercise-2.md)

## Exercise 3 - Parrot Chat

Open this exercise file: [exercise-3.md](__workshop/exercise-3.md)

## Exercise 4 - Bot Chat

Open this exercise file: [exercise-4.md](__workshop/exercise-4.md)

---

<center>🟡 - Minimally complete workshop (75%) - 🟡</center>

---

## Exercise 5 - Bot Chat (Tell me a joke)

Open this exercise file: [exercise-5.md](__workshop/exercise-5.md)

---

<center>🟢 - Complete workshop (100%) - 🟢</center>

---

## Stretch goals

...coming soon...
