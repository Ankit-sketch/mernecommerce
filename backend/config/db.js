const mongoose = require("mongoose");

const Connectdatabase = () =>
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("Database Connected");
    })

    module.exports = Connectdatabase;