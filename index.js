const express = require("express");
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const register = require("./routes/register")
const login = require("./routes/login")
const profile = require("./routes/profile")
const cards = require("./routes/cards")
const users = require("./routes/users")
const app = express();


const port = process.env.PORT || 3000;

app.use(express.json());

// communication between client in port 3000 and server in port 8000
app.use(cors());

// router to / api / employees
app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/profile", profile)
app.use("/api/cards", cards)
app.use("/api/users", users)


// connection to mongobd
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb connected"))
    .catch(() => console.log("Cannot connect to Mongodb"));


app.listen(port, () => console.log(`Server strated on port ${port}`));
