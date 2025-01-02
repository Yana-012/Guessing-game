"use strict";
const express = require("express"),
  app = express();

app.set("port", process.env.PORT || 3000);

let secretNumber = Math.floor(Math.random() * 12) + 1;
let attempts = 0;


app.use(express.static(__dirname + "/public"));

app.get("/guessnum", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.get("/guessnum/guess/:num", (req, res) => {
  const usersGuess = parseInt(req.params.num, 10);
  let message;
  attempts++;

  if (usersGuess === secretNumber) {
    message = `<h1>Congratulations! You guessed the correct number ${secretNumber} in ${attempts} attempts!</h1>`;

    attempts = 0;
    secretNumber = Math.floor(Math.random() * 12) + 1;
  } else if (usersGuess < secretNumber) {
    message = `<h1>You took ${attempts} attempts. Too low! Try again.</h1>`;
  } else {
    message = `<h1>You took ${attempts} attempts. Too high! Try again.</h1>`;
  }

  res.send(
    `${message}<a href='/game'>Play Again</a>`
  );
});

app.listen(app.get("port"), () => {
});
