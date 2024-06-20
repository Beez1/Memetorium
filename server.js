const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://emmabassey50:<Telepizza1>@zbcloud.ya6t6fo.mongodb.net/?retryWrites=true&w=majority&appName=zbcloud";

async function connect() {
    try{
        await mongoose.connect(uri);
        console.log("Connected to mongob");
    } catch (error){
        console.error(error);
    }
}

connect();

app.listen(300, () => {
    console.log("Server started on port 8000");
});