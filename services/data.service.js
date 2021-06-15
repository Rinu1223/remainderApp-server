const db=require('./db');
let currentUser="";
const login=(req,uID,password)=>{
    
    return db.User.findOne({uID,password})
   .then(user=>
     {
       if(user){
         req.session.currentUser=user.uID
        console.log(req.session.currentUser)
         return{
           statusCode:200,
           status:true,
           name:user.userName,
           uID:user.uID,
           message:"Successfully login"
       } 
       }
       else{
     
         return {
           statusCode:422,
           status:false,
          message:"invalid user id"
         }
       }
     })
   }
   const addEvent=(req,uID,eDate,eDetails)=>{
    //   let uID= req.session.currentUser
    //   console.log(uID);
       return db.User.findOne({uID})
       .then(user=>{
        if(!user){
            return {
              statusCode:422,
              status:false,
              message:"Failed to add"
          }
        }
        else{
            
            user.eventDetails.push({eDate:eDate,eDetails:eDetails})
            user.save();
         return {
            statusCode:200,
            status:false,
            message:`Event added successfully.... `
        }
        }
       })
       

   }
   const showEvent=(req,uID)=>{
    
       return db.User.findOne({uID})
       .then(user=>{
        if(!user){
            return {
              statusCode:422,
              status:false,
              message:"error"
          }
        }
        else{
           
            
         return {
            statusCode:200,
            status:true,
            message:user.eventDetails
        }
        }
       })
       }

       const register=(uID,userName,password)=>{
        return db.User.findOne({uID})
        .then(user=>{
          if(user){
            return {
              statusCode:422,
              status:false,
             message:"user exit... please login"
          }
          }
          else{
            const newUser=new db.User({
              uID,
              userName,
              password
            })
            newUser.save()
            return{
              statusCode:200,
                status:true,
                message:"Successfully Registered"
            }
          }
        })
      }
    

   
   module.exports={
       login,
       addEvent,
       showEvent,
       register
   }
  