const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const DB = process.env.DB_CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => console.log("SUCCESSFULLY CONNECTED TO DATABASE"))
  .catch((err) => {
    console.error("DATABASE CONNECTION ERROR:", err);
    process.exit(1); //appication halting with an error
  });

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  const server = app.listen(process.env.PORT, () => {
    //listening for requests to the specified port
    console.log("Listening...");
  }); //this returns a server
} else {
  module.exports = (req, res) => {
    // Delegate request handling to the Express app
    app(req, res); // This works because `app` is a function that Express set up to handle requests
  };
}
