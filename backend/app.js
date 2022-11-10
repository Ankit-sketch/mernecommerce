const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
// exports.app = express(); //it means export it as object we will import it as {app}
app.use("/api/v1", product);
app.use("/api/v1", user);
//error handling middleware
app.use(errorHandler);
module.exports = app;
