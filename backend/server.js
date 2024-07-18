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
  .catch((err) => console.log(err));

console.log(process.env.NODE_ENV);

const server = app.listen(process.env.PORT, () => {
  //listening for requests to the specified port
  console.log("Listening...");
}); //this returns a server
