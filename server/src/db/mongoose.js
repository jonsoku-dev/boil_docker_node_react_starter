const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo/test", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
