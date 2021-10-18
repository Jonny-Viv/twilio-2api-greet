const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const routes = require("./router/routes");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "files", "index.html"));
});

app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "files", "help.html"));
});

app.use("/api", routes);

app.listen(process.env.PORT);
