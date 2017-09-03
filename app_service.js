var express = require('express');
var app =express();
var info=require('./info.js');
app.get('/update',function(req,res){
	res.status(200);
	var time=req.headers['time'];
	var whereStr='{time:{&gt:'+time+'}';
	var returnStr='{\"items\":[';
	info.find(whereStr,function(err,response){
		if(err)
			console.log(err);
		else{
			response.forEach(function(item){	
			var itemObj='{\"idx\":'+item['idx']+'},';
			returnStr+=itemObj;}
			);
			returnStr=returnStr.substring(0,returnStr.length-1);
			returnStr+=']}';
			console.log(returnStr);
			res.status(200);
			res.send(returnStr);
			}
		});
	});
app.get('/requestFiles',function(req,res){
	var arr=req.headers['items'];
	var returnStr='{\"items\":[';
	var JsonObj=JSON.parse(arr);
	var JsonArr=JsonObj['items'];
	var whereStr='{$or:['
	for(var i=0;i<JsonArr.length;++i){
		var obj=JSON.parse(JsonArr[i]);
		whereStr+='{idx:'+obj['idx']+'},';
		whereStr=whereStr.substring(0,whereStr.length-1);
		whereStr+=']}';
	}
	info.find(whereStr,function(err,response){
		response.forEach(function(item){
		returnStr+=item;
		returnStr+=',';	
		});	
		returnStr=returnStr.substring(0,returnStr.length-1);
		returnStr+=']}';
		console.log(returnStr);
		res.status(200);
		res.send(returnStr);
	});
});

var server=app.listen(80,function(){
	console.log('listening');
});


