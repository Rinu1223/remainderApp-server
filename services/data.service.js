const db=require('./db');
let currentUser="";
const login=(req,uID,password)=>{
    
    return db.User.findOne({uID,password})
   .then(user=>
     {
       if(user){
         req.session.currentUser=user.uID
        
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
     //let userID= currentUser
      //console.log(userID);
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
          return{
            statusCode:422,
            status:false,
            message:"user exit"
          }
        }
        else{
          const newUser=new db.User({
            uID,
            userName,
            password,
            eventDetails:[]
          })
          newUser.save();
          return{
            statusCode:200,
            status:true,
            message:"successfully registered"
          }
        }
      })
    }
    const deleteEvent=(eventdet,uID)=>{
      
      return db.User.updateOne({"uID":uID},{$pull:{eventDetails:{eDetails:eventdet}}})
           .then(result=>{
          if(!result){
              return {
                statusCode:422,
                status:false,
                message:"Failed to add"
            }
          }
          else{
            
            
           return {
              statusCode:200,
              status:true,
              message:"deleted one row"
          }
          }
         })
    
        }
       
       
        const displayRemainder=(uID)=>{
          
           var datetime = new Date();
           
           var curr_date = datetime.getDate();  
          var curr_month = datetime.getMonth()+1; 
         
        var curr_year = datetime.getFullYear();
         if(curr_month<10){
           curr_month="0"+curr_month
          }
         else{
          curr_month
          }
        var currentDate=`${curr_date}-${curr_month}-${curr_year}`
        //console.log(currentDate);
        let remainderToday=[]
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
            let leng=  user.eventDetails.length
           for(let i=0;i<leng;i++){
             if(user.eventDetails[i]["eDate"]==currentDate){
               remainderToday.push({
                 eventdate:user.eventDetails[i]["eDate"],
                 Event:user.eventDetails[i]["eDetails"]
               })
             }
           }
          return {
             statusCode:200,
             status:true,
             message:remainderToday
         }
         }
        })
          }
   

          
    
           const updateRainder=(uID,indexNum,eDate,eDetails)=>{
      let index=parseInt(indexNum)
          // const result= db.User.findOne({uID})
         // let prevDetails= result.eventDetails
         // console.log(prevDetails);
           //return db.User.updateOne({"uID":uID},{$set:{eventDetails:{eDetails:eDetails}}})
           //return db.User.updateOne({"uID":uID},{$set:{eventDetails[indexNum]["eDetails"]:eDetails}})
// return   db.User.updateOne({"uID":uID,"eventDetails.eDetails": "tax"},{$set:{eventDetails:{eDetails:eDetails}}})
          return  db.User.findOne({uID})
                 .then(user=>{
                if(!user){
                    return {
                      statusCode:422,
                      status:false,
                      message:"Failed to update"
                  }
                }
                else{
                  
                  
                    if(user.eventDetails[index]["eDate"]!=eDetails && eDate!=""){
                   
                     user.eventDetails[index].eDate=eDate;
                     
                   }
                    if(user.eventDetails[index]["eDetails"]!=eDetails && eDetails!="" ){
                     user.eventDetails[index].eDetails=eDetails
                     }
                    user.markModified('eventDetails');
                     user.save();
                return {
                    statusCode:200,
                    status:true,
                    message:"updated ...."
                }
                }
               })
          
              }
             
   module.exports={
       login,
       addEvent,
       showEvent,
       register,
       deleteEvent,
       displayRemainder,
       updateRainder
   }
  