const mongoose = require('mongoose');
const express = require('express');
const bodyparse = require('body-parser');
var db = require('./db/mongoose');
var customer = require('./Model/customer');
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')
var JWT = require('jsonwebtoken');

var  app = express();
const PORT = 3000;

    // var data = new customer({
    //     FirstName : 'Reshma',
    //     LastName : 'Dobariya',
    //     Email : 'dobariyaresh2@gmail.com',
    //     Phone : '7405146151',
    //     Address : 'Motabarachha , surat ,gujrat'
    // })
app.use(bodyParser.json());

app.post('/customer/create',(req,res)=>{
    var data = new customer(req.body);
    data.GenerateJWTToken((result)=>{
        if(result.status == 'Success'){
            res.json(result);
        }
        else{
            res.status(400).send(result.ErrorDetails)
        }
    })
    
})

app.get('/customers',(req,res)=>{

    customer.verifyJWTToken(req.header('X-Auth')).
    then(result =>{
       return customer.find({})
    })
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(err=>{ res.status(400).send(err); });
    
})


app.get('/customer/:id',(req,res)=>{
    customer.verifyJWTToken(req.header('X-Auth')).
    then(result =>{
     return customer.findOne({"ID":req.params.id})
    })
      .then(result=>{
        
          res.status(200).send(result)
      })
      .catch(err=>{
         res.status(400).send(err);
      });
      
  })


  app.patch('/customer/:id',(req,res)=>{
   req.body.update_timestamp = Date.now();
   customer.verifyJWTToken(req.header('X-Auth')).
   then(result =>{
   return customer.findOneAndUpdate({"ID":req.params.id},req.body)
   })
      .then(result=>{
        console.log(result);
          res.send(result)
      })
      .catch(err=>{
         res.status(400).send(err);
      });
      
  })

    // data.save()
    // .then(result=>console.log(result))
    // .catch(err=>console.log(err));


    app.listen(PORT,()=>{


        console.log("Express Listening om the port : "+PORT);
    })