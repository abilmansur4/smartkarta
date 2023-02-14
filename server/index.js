const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const saltRounds = 10;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      key: "usr",
      expires: 60000 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "avtobys_cards",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("userId");
  res.send("user is logged out");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.post("/create", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const patronymic = req.body.patronymic;
  const category = req.body.category;
  const IIN = req.body.IIN;
  const phoneNumber = req.body.phoneNumber;
  const documentNumber = req.body.documentNumber;
  const cardNumber = req.body.cardNumber;
  let catId = 0;
  switch (category) {
    case "Пенсионер":
      catId = 7;
      break;
    case "Инвалид 1 группы":
      catId = 1;
      break;
    case "Инвалид 2 группы":
      catId = 2;
      break;
    case "Инвалид 3 группы":
      catId = 3;
      break;
    case "Инвалид 2 группы по зрению":
      catId = 4;
      break;
    case "Дети инвалиды до 18 лет":
      catId = 5;
      break;
    case "Приравненные ветераны и инвалиды ВОВ":
      catId = 6;
      break;
  }

  db.query(
    "INSERT INTO clients (firstname, lastname, patronymic, category_id, IIN, phone_number, document_number, card_number) VALUES (?,?,?,?,?,?,?,?)",
    [
      firstname,
      lastname,
      patronymic,
      catId,
      IIN,
      phoneNumber,
      documentNumber,
      cardNumber,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("VALUES INSERTED!");
      }
    }
  );
});
//
app.get("/users", (req, res) => {
  db.query("SELECT * FROM clients", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
