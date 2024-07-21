const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app1',
    password: 'sejal14'
  });

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password()
  ]
};

app.listen("8080", () => {
  console.log("server is listening to port 8080.");
});

app.get("/", (req,res) => {
    let q = `SELECT COUNT(*) FROM user`;

  try{  
    connection.query(q, (err, result) => {
      if(err) throw err;
      let count = result[0]["COUNT(*)"];
      res.render("home.ejs", {count});
    });
  }catch(err){
      res.send("Some error in DB");
    }
});

app.get("/user", (req,res) => {
  let q = `SELECT * FROM user`;

  try{
    connection.query(q, (err,users) => {
      if(err) throw err;
      res.render("showusers.ejs", {users});
    });
  }catch{
    res.send("Some error in DB.");
  }
});

app.get("/user/:id/edit", (req,res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;

    try{
      connection.query(q, (err,result) => {
        if(err) throw err;
        let user = result[0];
        res.render("edit.ejs", {user});
      });
    }catch{
      res.send("Some error in database.");
    }    
});

app.patch("/user/:id", (req,res) => {
  let {id} = req.params;
  let {password:formPass, username:newUsername} = req.body;

  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try{
    connection.query(q, (err,result) =>{
      if (err) throw err;
      let user = result[0];
      if(formPass != user.password){
        res.send("WRONG PASSWORD");
        
      }else{
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2, (err,result) => {
          if(err) throw err;
          res.redirect("/user");
        })
      }
    });
  }catch(err){
    console.log(err);
    res.send("Some error in database!");
  }
  
});

// let q = "INSERT INTO user(id, username, email, password ) VALUES ?";
// let users = [
//   [1,"sejal","sejal@gmail.com",1],
//   [2,"kriday","kriday@gmail.com",2],
//   [3,"prisha","prisha@gmail.com",3]
// ];

// let data = [];
// for(let i = 1; i <= 100; i++){
//      data.push(getRandomUser());
// }

// try{
//     connection.query(q,[data], (err,result) => {
//         if(err) throw err;
//         console.log(result);
//     });
// } catch(err){
//     console.log(err);
// } 

// connection.end();



// let getRandomUser = () => {
//     return {
//       id: faker.string.uuid(),
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//     };
// }; 



