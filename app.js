const express = require('express');
const app = express();
const path = require("path");
const bodyparser = require("body-parser")
const { dirname } = require('path');
var nodemailer = require("nodemailer");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactflat', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 3000;

// Nodemailer
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: 'cbsepracticalhelper@gmail.com', 
        pass: 'dop.mi7810120200016',
    }
});

// Database 
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,            
    phone: String,
    message: String,
});

var Contact = mongoose.model('Contact', contactSchema);

// Express specific stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// Endpoints
app.get("/", function (req, res) {
    res
        .status(200)
        .sendFile(path.join(__dirname, "index.html"));
})
app.get("/index.html", function (req, res) {
    res
        .status(200)
        .sendFile(path.join(__dirname, "/index.html"));
})
app.get("/team.html", function (req, res) {
    res
        .status(200)
        .sendFile(path.join(__dirname, "team.html"));
})

app.post('/index.html', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("This item has not been saved to the database")
    });

    var mailOptions = { 
        from: 'cbsepracticalhelper@gmail.com',
        to: 'bdbishaldas12@gmail.com',
        subject: 'Request',
        text: `Name:${req.body.name}, Email:(${req.body.email}), Phone no:(${req.body.phone}), Message:${req.body.message}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); res.redirect("/index.html");
})


// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

