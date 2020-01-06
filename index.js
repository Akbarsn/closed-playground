const express = require("express");
const app = express();
const port = 5000;
const users = require("./auth/users");

app.use(express.json());
app.use("/auth", users);

app.listen(port, () => {
    console.log("Listening to " + port);
  });
  