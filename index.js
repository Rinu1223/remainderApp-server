const express=require('express'); //import express
const app=express();
const dataservice=require('./services/data.service'); // import data.service
const cors=require('cors'); //import cors
app.use(cors({
  origin:'http://localhost:4200', 
  credentials:true  
}))
const session=require('express-session');//import session
app.use(session({
  secret:'cookie_secret',
  resave : false,
  saveUninitialized: false
}));

const authMiddleware=(req,res,next)=>{
  if(!req.session.currentUser){
    return res.json({
      statusCode:401,
      status:false,
      message:"please login"
    })
  }
  else{
    next();
  }
}
app.use(express.json());
app.listen(3000,()=>{
  console.log("server started....");
})


app.post('/login',(req,res)=>{
  //console.log(req.body);
  dataservice.login(req,req.body.uID,req.body.password)
  .then(result=>{
    res.status(result.statusCode).json(result); 
  })
     
  });
  

  app.post('/createEvent',(req,res)=>{
    dataservice.addEvent(req,req.body.uID,req.body.eDate,req.body.eDetails)
    .then(result=>{
      res.status(result.statusCode).json(result)
    })
  });
    app.post('/showEvent',(req,res)=>{
          dataservice.showEvent(req,req.body.uID)
      .then(result=>{
        res.status(result.statusCode).json(result)
      })
  });

  app.post('/register',(req,res)=>{
    dataservice.register(req.body.uID,req.body.userName,req.body.password)
.then(result=>{
  res.status(result.statusCode).json(result)
})
});
app.post('/deleteEvent',(req,res)=>{
  dataservice.deleteEvent(req.body.eventdet,req.body.uID)
.then(result=>{
res.status(result.statusCode).json(result)
})
});
  
app.post('/displayRemainder',(req,res)=>{
 
  dataservice.displayRemainder(req.body.uID)
.then(result=>{
res.status(result.statusCode).json(result)
})
});
app.post('/updateRainder',(req,res)=>{
  //console.log(req);
  dataservice.updateRainder(req.body.uID,req.body.indexNum,req.body.eDate,req.body.eDetails)
.then(result=>{
res.status(result.statusCode).json(result)
})
});
