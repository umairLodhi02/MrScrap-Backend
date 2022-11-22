const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");
const { PORT } = require("./config/config");
const errorHandler = require("./middleware/errorhandler");
const router = require("./routes/routes");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
var corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "Welcome to Mr. Scrap!" });
});
app.use("/api", cors(corsOptions), router);

app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
