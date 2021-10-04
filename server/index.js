const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

var HTTP_PORT = 9000;

app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

require("./routes")(app);

app.use(function (req, res) {
  res.status(404);
});
