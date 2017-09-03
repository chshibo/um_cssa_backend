var mongoose = require('mongoose'),
    DB_URL="mongodb://localhost:27017/umich_db";

mongoose.connect(DB_URL,{useMongoClient:true});

mongoose.connection.on('connected',function(){
	console.log(DB_URL+' connected');
});

mongoose.connection.on('error',function(){
	console.log('Connection failed to establish');
});

mongoose.connection.on('disconnected',function(){
	console.log(DB_URL+' disconnected');
});
module.exports=mongoose;
