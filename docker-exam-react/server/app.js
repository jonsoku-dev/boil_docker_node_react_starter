const express = require("express");
require("./db/mongoose");
const app = express();

app.get("/", (req, res) => res.send("API RUNNING..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
