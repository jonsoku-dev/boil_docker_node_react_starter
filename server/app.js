const express = require("express");
require("./src/db/mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ extends: false }));

app.get("/", (req, res) => res.send("API RUNNiNG ..."));

// @@ Routes
app.use("/users", require("./src/routes/api/users"));
app.use("/auth", require("./src/routes/api/auth"));
app.use("/profile", require("./src/routes/api/profile"));
app.use("/posts", require("./src/routes/api/posts"));

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
