const express = require("express");
const app = express.Router();
const db = require("./db");
const path = require("path");
const port = process.env.PORT || 3000;
const api = require("./api");

const { People, Places, Things } = db.models;

app.get("/places", (req, res, next) => {
  Places.findAll()
    .then(places => res.send(places))
    .catch(next);
});

app.get("/people", (req, res, next) => {
  People.findAll()
    .then(companies => res.send(companies))
    .catch(next);
});

app.get("/things", (req, res, next) => {
    Things.findAll()
      .then(things => res.send(things))
      .catch(next);
  });

// app.post("/api/people", (req, res, next) => {
//   Category.create(req.body)
//     .then(category => res.send(category))
//     .catch(next);
// });

// app.delete("/api/companies/:id", async (req, res, next) => {
//   try {
//     await db.destroy(req.params.id);
//     res.sendStatus(204);
//   } catch (ex) {
//     next(ex);
//   }
// });

// app.post("/api/companies/", async (req, res, next) => {
//   console.log(req.body);
//   try {
//     res.send(await db.create(req.body));
//   } catch (ex) {
//     next(ex);
//   }
// });

module.exports = app;

