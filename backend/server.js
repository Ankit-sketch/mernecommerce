const app = require("./app");
const dotenv = require("dotenv");
const Connectdatabase = require("./config/db");
// Adding path to .env file
dotenv.config({ path: "backend/config/.env" });
const cloudinary = require("cloudinary");
//uncaughtException error
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down due to uncaughtException`);
  process.exit(1);
});

// Connection
Connectdatabase();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down due to unhandle promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
