require("dotenv").config();

const express = require("express");
const cors = require("cors");


const app = express();

const port = process.env.PORT || 3000;

const productOutRoute = require("./routes/product_out");
const auth = require("./middleware/AuthMiddleware");


// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:8080",
//   "http://localhost:8081",
//   "http://localhost",
//   /\.heroku\.com$/,
// ];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//cors
app.use(cors());
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log({ origin, ada: whitelist.indexOf(origin) });
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});


app.use("/api/v1/out", auth, productOutRoute);


app.listen(port, () => console.log("Product Out Listened on port " + port));
