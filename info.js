var mongoose=require('./db.js'),
    Schema= mongoose.Schema;

var InfoSchema = new Schema({
	idx: Number,
	content:String,
	header:String,
	author:String,
	time:Number,
	type:String
});

module.exports = mongoose.model('info',InfoSchema);

