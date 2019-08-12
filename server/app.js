const express = require("express");
require("./src/db/mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API RUNNiNG ..."));

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
