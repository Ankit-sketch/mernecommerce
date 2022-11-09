const app = require("./app");
const dotenv = require("dotenv");
const Connectdatabase = require("./config/db");
// Adding path to .env file
dotenv.config({ path: "backend/config/.env" });

//uncaughtException error
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down due to uncaughtException`);
  process.exit(1);
});

// Connection
Connectdatabase();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${error.message}`);
  console.log(`Server is shutting down due to unhandle promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});