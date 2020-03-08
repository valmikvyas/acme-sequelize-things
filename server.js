const express = require("express");
const app = express();
const db = require("./db");
const path = require("path");
const port = process.env.PORT || 3000;
const api = require("./api");
app.use(express.json());

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/api", api);


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

db.sync().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});
