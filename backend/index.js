const express = require("express");
const bodyParser = require("body-parser");
const rootRouter = require("./routes");
const cors = require("cors");

const app = express();
// Middleware for parsing request bodies
app.use(bodyParser.json());

app.use(cors());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
