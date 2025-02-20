require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter")
const ProdctRouter = require("./Routes/ProductRouter");
const app = express();

require("./Models/db")
const PORT = process.env.PORT || 8081;  

app.get("/", (req, res) => {
    res.send("its auth and oauth");
});
app.use(bodyParser.json());
app.use(cors());
app.use("/auth",AuthRouter)
app.use("/products",ProdctRouter)

app.listen(PORT, () => {
    console.log(`Listening on port no ${PORT}`);
});
