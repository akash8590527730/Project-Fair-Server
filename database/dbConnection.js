const mangoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mangoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas connected successfully with pfServer");
}).catch(err=>{
    console.log("MongoDB Atlas connection failed!!");
    console.log(err);
})