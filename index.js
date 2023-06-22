const express = require("express")
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const dbConfig = require("./src/config/db.config");
const mainRoute = require("./src/routes/routes");

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

mainRoute(app)