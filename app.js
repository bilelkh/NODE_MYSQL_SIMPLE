const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Azerty123#",
    database: "acme",
    port: "3300"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("----DATA BASE CONNECTED SUCCESSFULLY!---");
});






app.post("/users/user", (req, res) => {
    console.log("req.body", req.body);
    const sql = "INSERT INTO users (first_name, last_name, email, location, dept, register_date) values ('" + req.body.first_name + "', '" + req.body.last_name + "', '" + req.body.email + "', '" + req.body.location + "','" + req.body.dept + "', now());";
    db.query(sql, (err, result) => {
        if (err) {
            res.send(err);
            throw err;
        }
        res.send(result);

    });
});





app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) {
            res.send(err);
            throw err;
        }
        res.send(result);

    });
});


app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) {
            res.send(err);
            throw err;
        }
        res.send(result);

    });
});



app.get("/users/user/:id", (req, res) => {
    console.log(req.params.id)
    const query = "SELECT * FROM users WHERE id=" + req.params.id + ";";

    db.query(query, (err, result) => {
        if (err) {
            console.log('err', err)
            res.send(err);
            throw err;
        }
        res.send(result);

    });
});


app.delete("/users/user/:id", (req, res) => {
    const query = "DELETE FROM users WHERE id=" + req.params.id + ";";
    db.query(query, (err, result) => {
        if (err) {
            res.send(err);
            throw err;
        }
        res.send(result);
    });
});


/*
app.put("/users/user/:id", (req, res) => {
    const query = "UPDATE users SET email = '" + req.body.email + "' ,first_name = '" + req.body.first_name + "',last_name = '" + req.body.last_name + "',location = '" + req.body.location + "',dept = '" + req.body.dept + "' WHERE id=" + req.params.id + ";";
    db.query(query, (err, result) => {
        if (err) {
            res.send(err);
            throw err;
        }
        res.send(result);
    });
});
*/




app.listen(5000, () => {
    console.log("----SERVER SARTED ON PORT 5000----");
});