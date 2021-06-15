const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/RemainderApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    })

 const User=   mongoose.model('User',{
   uID:Number,
   userName:String,
   password:String,
   eventDetails:[]
})


 module.exports={
User
 }

