require("dotenv").config();
const express = require("express");
const app = express();
const { dbConnection } = require("./config/connection.config");
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const router = require("./routes/index");
dbConnection();

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/v2", router);

app.listen(port, () => {
  console.log(`server started at port http://localhost:${port}`);
});
