const express = require("express");
var bodyParser = require('body-parser');

const app = express();

//define port
const port=3000;

//create mysql connection
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'robotics'
});

//get all robots data example
app.get("/robots", (request, response) => {

    connection.query('SELECT * FROM robots', (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows})
    
    });
});

//search by name 
app.get("/search/:name", (request, response) => {
    const req=request.params.name;
    connection.query('SELECT * FROM robots where name = ?',
        [req], (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows});
    
    });
    
});

//search by id 
app.get("/robots/:id", (request, response) => {
    const req=request.params.id;
    connection.query('SELECT * FROM robots where id = ?',
        [req], (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows});
    
    });
    
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//create robot
app.post("/robots", (request, response) => {
    const query="INSERT INTO robots SET ?";
    const params={"name": request.body.name, "type" :request.body.type, "year": request.body.year};
    connection.query(query,params,(err,result,fields) => {
      if(err) throw err;
    
      response.json({saved:result.affectedRows,inserted_id:result.insertId})
    
    });
    });

//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});