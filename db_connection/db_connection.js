const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/whatsnext").then((res) => {
    console.log("i am connected")
})